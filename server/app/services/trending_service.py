import os
import redis
import hdbscan
import numpy as np
import torch
from transformers import BertTokenizer, BertModel
from googleapiclient.discovery import build
from fastapi import HTTPException
from collections import Counter
from datetime import datetime
import logging
from app.config import REDIS_HOST, REDIS_PORT, REDIS_DB

# Setup logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Setup koneksi Redis menggunakan konfigurasi dari .env
redis_client = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)

# Setup IndoBERT Model for Bahasa Indonesia
tokenizer = BertTokenizer.from_pretrained('indolem/indobert-base-uncased')
model = BertModel.from_pretrained('indolem/indobert-base-uncased')

# YouTube API key
YOUTUBE_API_KEY = "AIzaSyB13bZ-Ydw__76mOUYF9iap8ZPxz3yDssg"

def get_trending_data(limit: int = 10, offset: int = 0):
    logger.info("Fetching trending data...")
    try:
        # Cek apakah ada data yang tersimpan di Redis
        cached_data = get_cached_trending_data()
        if cached_data:
            logger.info("Data found in cache, returning cached data.")
            formatted_data = format_frequencies(cached_data)  # Format the cached data
        else:
            # Jika tidak ada data di cache, ambil data baru
            logger.info("No cached data found. Fetching new data from YouTube.")
            trending_data = fetch_youtube_trending_data()
            formatted_data = format_frequencies(trending_data)  # Format the fetched data

        # Urutkan data berdasarkan frekuensi terbesar
        sorted_data = sorted(formatted_data, key=lambda x: x["Frequency"], reverse=True)

        # Hitung total jumlah topik
        total = len(sorted_data)

        # Terapkan limit dan offset pada hasil data yang sudah diurutkan
        limited_data = sorted_data[offset:offset + limit]

        logger.info(f"Returning {len(limited_data)} results with limit={limit}, offset={offset}, total={total}.")
        return {"data": limited_data, "total": total}
    except Exception as e:
        logger.error(f"Error fetching trending data: {e}.")
        raise HTTPException(status_code=500, detail="Internal Server Error: " + str(e))


def format_frequencies(frequencies):
    # Format the data to display Topic, Frequency
    formatted_data = [{"Topic": topic, "Frequency": frequency} for topic, frequency in frequencies.items()]
    return formatted_data


def fetch_youtube_trending_data():
    logger.info("Connecting to YouTube API...")
    try:
        all_tags = []  # Menyimpan semua tag dari video trending
        next_page_token = None

        while True:
            # Menghubungkan ke YouTube API
            youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
            request = youtube.videos().list(
                part="snippet",
                chart="mostPopular",
                regionCode="ID",
                maxResults=50,
                pageToken=next_page_token
            )
            response = request.execute()

            if not response.get("items"):
                logger.error("No trending videos found on YouTube.")
                raise HTTPException(status_code=404, detail="Tidak ada video yang sedang tren saat ini.")

            logger.info(f"Found {len(response['items'])} trending videos.")
            
            # Ekstrak tags dari video yang diterima
            for item in response["items"]:
                all_tags.extend(item["snippet"].get("tags", []))  # Menyimpan semua tag

            logger.info(f"Extracted {len(all_tags)} tags from trending videos.")

            # Periksa apakah ada halaman berikutnya
            next_page_token = response.get('nextPageToken')
            if not next_page_token:
                break  # Keluar dari loop jika tidak ada halaman berikutnya

        # Proses tags dengan IndoBERT untuk mendapatkan representasi vektor
        tag_embeddings = process_tags_with_indobert(all_tags)

        # Kelompokkan tags menggunakan HDBSCAN
        clusters = cluster_tags_with_hdbscan(tag_embeddings)

        # Hitung frekuensi setiap tag dalam klaster
        tag_frequencies = calculate_tag_frequencies(clusters, all_tags)

        # Simpan hasil di Redis dengan key yang unik berdasarkan waktu
        trending_key = f"trending_topics:{datetime.now().strftime('%H:%M')}"
        redis_client.set(trending_key, str(tag_frequencies), ex=21600)  # TTL 6 jam
        logger.info(f"Trending data cached with key {trending_key}.")

        return tag_frequencies  # Mengembalikan hasil setelah semua halaman diproses

    except Exception as e:
        logger.error(f"Error fetching YouTube trending data: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error: " + str(e))


def process_tags_with_indobert(tags):
    logger.info("Processing tags with IndoBERT...")
    embeddings = []
    for tag in tags:
        try:
            # Tokenisasi dan representasi vektor IndoBERT untuk setiap tag
            inputs = tokenizer(tag, return_tensors='pt', padding=True, truncation=True, max_length=50)
            with torch.no_grad():
                outputs = model(**inputs)
            # Ambil embedding dari output model IndoBERT
            embedding = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
            embeddings.append(embedding)
        except Exception as e:
            logger.error(f"Error processing tag '{tag}' with IndoBERT: {e}")
            raise HTTPException(status_code=500, detail="Error processing tags with IndoBERT.")
    
    logger.info(f"Generated embeddings for {len(tags)} tags.")
    return np.array(embeddings)

def cluster_tags_with_hdbscan(embeddings):
    logger.info("Clustering tags with HDBSCAN...")
    try:
        # Gunakan HDBSCAN untuk mengelompokkan vektor tag
        clusterer = hdbscan.HDBSCAN(min_cluster_size=5)
        clusterer.fit(embeddings)
        logger.info(f"Clustering complete. Found {len(set(clusterer.labels_))} clusters.")
        return clusterer.labels_
    except Exception as e:
        logger.error(f"Error clustering tags with HDBSCAN: {e}")
        raise HTTPException(status_code=500, detail="Error clustering tags with HDBSCAN.")

def calculate_tag_frequencies(clusters, tags):
    logger.info("Calculating tag frequencies...")
    try:
        # Hitung frekuensi masing-masing tag di dalam klaster
        cluster_counts = Counter(clusters)
        frequencies = {}

        # Iterasi untuk mendapatkan nama topic berdasarkan tag yang paling sering muncul dalam klaster
        for cluster_id, count in cluster_counts.items():
            if cluster_id == -1:  # Exclude noise points (-1)
                continue

            # Ambil tag yang berada di cluster ini
            cluster_tags = [tags[i] for i in range(len(clusters)) if clusters[i] == cluster_id]

            # Tentukan tag yang paling sering muncul dalam cluster
            most_common_tag = Counter(cluster_tags).most_common(1)[0][0]
            frequencies[most_common_tag] = count

        logger.info(f"Calculated frequencies for {len(frequencies)} topics.")
        return frequencies
    except Exception as e:
        logger.error(f"Error calculating tag frequencies: {e}")
        raise HTTPException(status_code=500, detail="Error calculating tag frequencies.")




def get_cached_trending_data():
    logger.info("Fetching cached trending data from Redis...")
    try:
        # Ambil data trending dari Redis jika ada
        trending_data_keys = redis_client.keys("trending_topics:*")
        if trending_data_keys:
            trending_data_key = trending_data_keys[-1]  # Ambil data terbaru
            cached_data = eval(redis_client.get(trending_data_key))
            logger.info(f"Retrieved cached trending data with key {trending_data_key}.")
            return cached_data
        else:
            logger.warning("No cached trending data found.")
            return None
    except redis.ConnectionError as e:
        # Redis connection error, log the error and proceed with fresh data
        logger.error(f"Error connecting to Redis: {e}")
        return None
    except Exception as e:
        # General exception handling
        logger.error(f"Error retrieving cached trending data from Redis: {e}")
        return None