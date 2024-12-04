import csv
from pymongo import MongoClient
from datetime import datetime

# Koneksi ke MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["seeInfluen"]

# Koleksi MongoDB
influencers_col = db["influencers"]
videos_col = db["videos"]
comments_col = db["comments"]
countries_col = db["countries"]
categories_col = db["categories"]

def parse_date(date_str):
    """Fungsi untuk parsing tanggal dari string ke datetime."""
    try:
        return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
    except ValueError:
        return datetime.strptime(date_str, "%Y-%m-%d")

def load_csv_to_mongodb(file_path, collection, transform_func=None):
    """
    Membaca file CSV dan memasukkan data ke koleksi MongoDB.
    Args:
        file_path (str): Path ke file CSV.
        collection: Koleksi MongoDB.
        transform_func (function): Fungsi opsional untuk memodifikasi data sebelum disimpan.
    """
    with open(file_path, "r", encoding="utf-8") as file:  # Tambahkan encoding="utf-8"
        reader = csv.DictReader(file)
        data = []
        for row in reader:
            if transform_func:
                row = transform_func(row)
            data.append(row)
        if data:
            collection.insert_many(data)
            print(f"Inserted {len(data)} records into {collection.name}.")


# Transformasi data untuk influencer dengan history di-embed
def transform_influencer(row, history_data):
    influencer_id = row["influencer_id"]
    # Embed history data ke influencer
    row["history"] = [
        {
            "date": parse_date(history["date"]),
            "view_count": int(history["view_count"]),
            "subscriber_count": int(history["subcriber_count"]),
            "video_count": int(history["video_count"])
        }
        for history in history_data if history["influencer_id"] == influencer_id
    ]
    row["created_at"] = parse_date(row["created_at"])
    return row

# Fungsi utama untuk menjalankan seeder
def main():
    # Bersihkan koleksi lama
    influencers_col.delete_many({})
    videos_col.delete_many({})
    comments_col.delete_many({})
    countries_col.delete_many({})
    categories_col.delete_many({})
    print("Database collections cleared.")

    # Load countries
    load_csv_to_mongodb("countries.csv", countries_col)

    # Load categories
    load_csv_to_mongodb("categories.csv", categories_col)

    # Load history_influencer
    with open("history_influencer.csv", "r") as file:
        history_reader = csv.DictReader(file)
        history_data = [row for row in history_reader]

    # Load influencers dengan history di-embed
    with open("influencer.csv", "r") as file:
        influencer_reader = csv.DictReader(file)
        influencers = [
            transform_influencer(row, history_data)
            for row in influencer_reader
        ]
        influencers_col.insert_many(influencers)
        print(f"Inserted {len(influencers)} influencers with embedded history.")

    # Load videos
    load_csv_to_mongodb("videos.csv", videos_col, transform_func=lambda row: {
        **row,
        "published_at": parse_date(row["published_at"]),
        "video_view_count": int(row["video_view_count"]),
        "video_like_count": int(row["video_like_count"]),
        "comment_count": int(row["comment_count"]),
        "duration": row["duration"]  # Jika ada kebutuhan parsing durasi, tambahkan di sini
    })

    # Load comments
    load_csv_to_mongodb("comments.csv", comments_col)

    print("Data seeding complete.")

if __name__ == "__main__":
    main()
