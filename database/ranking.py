import csv

# Membaca data influencer dari influencer.csv
def read_influencer_data(filename):
    influencers = {}
    with open(filename, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            influencers[row["influencer_id"]] = {
                "username": row["username"],
                "country_id": row["country_id"]
            }
    return influencers

# Membaca data history influencer dari history_influencer.csv
def read_history_data(filename):
    history_data = {}
    with open(filename, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            influencer_id = row["influencer_id"]
            date = row["date"]
            if influencer_id not in history_data:
                history_data[influencer_id] = []
            history_data[influencer_id].append({
                "date": date,
                "view_count": int(row["view_count"]),
                "subcriber_count": int(row["subcriber_count"]),
                "video_count": int(row["video_count"])
            })
    return history_data

# Menghitung growth rate subscriber dan view berdasarkan data 30 hari
def calculate_growth_rate(current_value, past_value):
    if past_value == 0:
        return 0  # Untuk menghindari pembagian dengan 0
    return ((current_value - past_value) / past_value) * 100

# Menghitung skor peringkat untuk influencer
def calculate_score(subscriber_growth, views_growth):
    return (0.60 * subscriber_growth) + (0.40 * views_growth)

# Menghasilkan tabel ranking
def generate_ranking(influencers, history_data):
    rankings = []
    
    for influencer_id, data in history_data.items():
        if len(data) < 2:
            continue  # Skip influencer dengan data yang kurang dari 2 hari
        
        # Mengambil data 30 hari terakhir dan 30 hari yang lalu
        latest_data = data[0]
        past_data = data[29] if len(data) > 29 else data[-1]  # Ambil data 30 hari lalu
        
        # Mengambil subscriber dan view count
        latest_subscriber_count = latest_data["subcriber_count"]
        past_subscriber_count = past_data["subcriber_count"]
        latest_view_count = latest_data["view_count"]
        past_view_count = past_data["view_count"]
        
        # Menghitung growth rate
        subscriber_growth = calculate_growth_rate(latest_subscriber_count, past_subscriber_count)
        views_growth = calculate_growth_rate(latest_view_count, past_view_count)
        
        # Menghitung skor
        score = calculate_score(subscriber_growth, views_growth)
        
        # Menyimpan data ranking influencer
        rankings.append({
            "score": score,
            "influencer_id": influencer_id,
            "subscriber_growth": subscriber_growth,
            "views_growth": views_growth
        })
    
    # Mengurutkan influencer berdasarkan skor dari tertinggi ke terendah
    rankings.sort(key=lambda x: x["score"], reverse=True)
    
    # Menyusun output ranking
    ranked_influencers = []
    for rank, influencer in enumerate(rankings, start=1):
        influencer_data = influencers[influencer["influencer_id"]]
        ranked_influencers.append({
            "No.": rank,
            "username": influencer_data["username"],
            "country_name": influencer_data["country_id"],
            "score": round(influencer["score"], 2)  # Menambahkan kolom score dan membulatkan ke dua desimal
        })
    
    return ranked_influencers

# Menyimpan hasil ranking ke dalam CSV
def save_ranking_to_csv(ranked_influencers, filename):
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        fieldnames = ["No.", "username", "country_name", "score"]  # Menambahkan 'score' ke dalam header CSV
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        for row in ranked_influencers:
            writer.writerow(row)

# Main function untuk menjalankan proses
def main():
    influencers = read_influencer_data("influencer.csv")
    history_data = read_history_data("history_influencer.csv")
    ranked_influencers = generate_ranking(influencers, history_data)
    save_ranking_to_csv(ranked_influencers, "ranking.csv")
    print("Ranking berhasil disimpan di 'ranking.csv'.")

if __name__ == "__main__":
    main()
