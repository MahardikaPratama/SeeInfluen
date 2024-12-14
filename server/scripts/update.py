from pymongo import MongoClient
from datetime import datetime, timedelta

# Koneksi MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["seeInfluen_db"]  # Ganti nama database jika berbeda
collection = db["influencers"]

# Username untuk mencari influencer
username = "Atseira !!"

# Data history_metrics baru yang akan ditambahkan (view_count, subscriber_count, video_count sama)
new_history_metric_data = {
    "view_count": 835,
    "subscriber_count": 50,
    "video_count": 14
}

# Rentang tanggal dari 2024-12-04 sampai 2024-12-13
start_date = datetime(2024, 12, 4)
end_date = datetime(2024, 12, 13)

# Loop untuk menambahkan data untuk setiap tanggal dalam rentang
current_date = start_date
while current_date <= end_date:
    # Format tanggal menjadi string (YYYY-MM-DD)
    date_str = current_date.strftime("%Y-%m-%d")
    
    # Menyiapkan data untuk tanggal tertentu
    new_history_metric = {
        "date": date_str,
        **new_history_metric_data  # Menggunakan data view_count, subscriber_count, video_count yang sama
    }
    
    # Menambahkan data ke array history_metrics
    result = collection.update_one(
        {"username": username},  # Filter berdasarkan username
        {"$push": {"history_metrics": new_history_metric}}  # Menambahkan ke array
    )
    
    # Cek hasil update
    if result.modified_count > 0:
        print(f"Data berhasil ditambahkan untuk tanggal {date_str}!")
    else:
        print(f"Data untuk {date_str} tidak ditemukan atau tidak diperbarui.")
    
    # Increment ke tanggal berikutnya
    current_date += timedelta(days=1)
