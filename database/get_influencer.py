import googleapiclient.discovery
import csv
from datetime import datetime, timedelta

# Konfigurasi API key
API_KEY = "AIzaSyCLZCm2TrtPffuqjj-W89hnWDV-IGlXoWo"
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

# Inisialisasi YouTube API client
youtube = googleapiclient.discovery.build(API_SERVICE_NAME, API_VERSION, developerKey=API_KEY)

# Daftar nama influencer populer per negara
influencers_list = {
    "ID": ["Windah Basudara", "MiawAug", "Raditya Dika", "Atseira !!"],
    "GB": ["PewDiePie", "KSI"],
    "US": ["MrBeast", "Marques Brownlee"]
}

# Fungsi untuk mendapatkan data channel berdasarkan nama
def get_channel_data(query):
    try:
        request = youtube.search().list(
            part="id,snippet",
            type="channel",
            q=query,
            maxResults=1
        )
        response = request.execute()
        
        if not response['items']:
            print(f"[INFO] Channel '{query}' tidak ditemukan.")
            return None
        
        channel = response['items'][0]
        return {
            "influencer_id": channel['id']['channelId'],
            "username": channel['snippet']['title'],
            "created_at": channel['snippet']['publishedAt']
        }
    except Exception as e:
        print(f"[ERROR] Error fetching channel data for '{query}': {e}")
        return None

# Fungsi untuk mendapatkan statistik channel dari API YouTube
def get_channel_statistics(channel_id):
    try:
        request = youtube.channels().list(
            part="statistics",
            id=channel_id
        )
        response = request.execute()
        
        if not response['items']:
            print(f"[INFO] Statistik untuk channel '{channel_id}' tidak ditemukan.")
            return None
        
        stats = response['items'][0]['statistics']
        return {
            "view_count": int(stats.get('viewCount', 0)),
            "subscriber_count": int(stats.get('subscriberCount', 0)),
            "video_count": int(stats.get('videoCount', 0))
        }
    except Exception as e:
        print(f"[ERROR] Error fetching statistics for '{channel_id}': {e}")
        return None

# Simpan data ke dalam CSV
def save_to_csv(data, filename, fieldnames):
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

# Fungsi untuk menghasilkan data history influencer
def generate_history_data(influencer_id, today_stats):
    history = []
    today = datetime.now()

    current_view_count = today_stats['view_count']
    current_subscriber_count = today_stats['subscriber_count']
    current_video_count = today_stats['video_count']

    daily_view_increment = current_view_count // 30
    daily_subscriber_increment = current_subscriber_count // 30
    daily_video_increment = max(current_video_count // 30, 1)

    for days_ago in range(30):
        date = (today - timedelta(days=days_ago)).strftime("%Y-%m-%d")
        history.append({
            "influencer_id": influencer_id,
            "date": date,
            "view_count": max(0, current_view_count - daily_view_increment * days_ago),
            "subcriber_count": max(0, current_subscriber_count - daily_subscriber_increment * days_ago),
            "video_count": max(0, current_video_count - daily_video_increment * days_ago),
        })
    return history

# Proses utama
def main():
    influencers = []
    history_data = []
    unique_ids = set()  # Untuk memeriksa channel yang sudah ada

    for country_id, influencer_names in influencers_list.items():
        for name in influencer_names:
            channel_data = get_channel_data(name)
            
            if not channel_data or channel_data["influencer_id"] in unique_ids:
                continue
            
            # Tambahkan influencer ke daftar
            unique_ids.add(channel_data["influencer_id"])
            influencers.append({
                "influencer_id": channel_data["influencer_id"],
                "username": channel_data["username"],
                "created_at": channel_data["created_at"],
                "country_id": country_id
            })

            # Ambil data statistik terbaru
            stats = get_channel_statistics(channel_data["influencer_id"])
            if not stats:
                continue

            # Generate history data
            history_data.extend(generate_history_data(channel_data["influencer_id"], stats))

    # Simpan ke CSV
    save_to_csv(influencers, "influencer.csv", ["influencer_id", "username", "created_at", "country_id"])
    save_to_csv(history_data, "history_influencer.csv", ["influencer_id", "date", "view_count", "subcriber_count", "video_count"])
    print("Data berhasil disimpan.")

if __name__ == "__main__":
    main()
