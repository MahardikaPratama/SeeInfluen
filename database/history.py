import csv
from datetime import datetime, timedelta

# Fungsi untuk membuat data history influencer selama 30 hari terakhir
def generate_history_data(influencer_id, username, view_count, subscriber_count, video_count, filename):
    today = datetime.today()
    history_data = []
    
    # Menambahkan data untuk 30 hari kebelakang
    for i in range(30):
        date = today - timedelta(days=i)
        formatted_date = date.strftime("%Y-%m-%d")
        
        # Menyimpan data per hari tanpa pengurangan
        history_data.append({
            "influencer_id": influencer_id,
            "date": formatted_date,
            "view_count": view_count,  # Tidak ada perubahan view_count
            "subcriber_count": subscriber_count,  # Tidak ada perubahan subscriber_count
            "video_count": video_count  # Tidak ada perubahan video_count
        })
    
    # Menyimpan data ke dalam file CSV
    with open(filename, mode="a", newline="", encoding="utf-8") as file:
        fieldnames = ["influencer_id", "date", "view_count", "subcriber_count", "video_count"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        
        # Cek apakah file kosong atau tidak (untuk menulis header hanya sekali)
        file.seek(0, 2)  # Pindah ke akhir file
        if file.tell() == 0:
            writer.writeheader()  # Menulis header hanya jika file kosong
        
        # Menambahkan data history influencer
        for data in history_data:
            writer.writerow(data)
    print("Data history berhasil ditambahkan.")

# Main function untuk menambahkan data history selama 30 hari
def main():
    influencer_id = "UCieVKbAWx7R4ZfKNAVg0FYg"
    username = "Atseira !!"
    view_count = 835
    subscriber_count = 50
    video_count = 14
    generate_history_data(influencer_id, username, view_count, subscriber_count, video_count, "history_influencer.csv")

if __name__ == "__main__":
    main()
