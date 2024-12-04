import googleapiclient.discovery
import csv
import isodate  # Untuk parsing durasi ISO 8601
from datetime import timedelta

# Konfigurasi API key
API_KEY = "AIzaSyCndbg6Hu8UsyiNAcj9l11fT_JZIPjiWbU"
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

# Inisialisasi YouTube API client
youtube = googleapiclient.discovery.build(API_SERVICE_NAME, API_VERSION, developerKey=API_KEY)

# Fungsi untuk membaca influencer_id dari file CSV
def get_influencer_ids_from_csv(filename="influencer.csv"):
    influencer_ids = []
    try:
        with open(filename, mode="r", newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                influencer_ids.append(row["influencer_id"])  # Ambil influencer_id dari kolom
    except Exception as e:
        print(f"Error saat membaca file CSV: {e}")
    return influencer_ids

# Fungsi untuk mendapatkan 20 video terbaru berdasarkan influencer_id
def get_videos_by_influencer(influencer_id):
    try:
        videos = []
        next_page_token = None

        while True:
            request = youtube.search().list(
                part="snippet",
                channelId=influencer_id,
                order="date",
                maxResults=50,
                pageToken=next_page_token
            )
            response = request.execute()

            if "items" not in response:
                print(f"Tidak ada video ditemukan untuk influencer_id {influencer_id}.")
                break

            for item in response.get("items", []):
                if item["id"]["kind"] == "youtube#video":
                    video_id = item["id"]["videoId"]
                    video_details = get_video_details(video_id)
                    if video_details:
                        videos.append(video_details)

            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break

        return videos
    except Exception as e:
        print(f"Error saat mengambil video untuk influencer_id {influencer_id}: {e}")
        return []

# Fungsi untuk mengubah durasi dari format ISO 8601 ke HH:MM:SS
def convert_duration_to_hhmmss(duration_iso):
    try:
        duration = isodate.parse_duration(duration_iso)
        total_seconds = int(duration.total_seconds())
        return str(timedelta(seconds=total_seconds))
    except Exception as e:
        print(f"Error saat mengonversi durasi: {e}")
        return "00:00:00"

# Fungsi untuk mendapatkan detail video, termasuk durasi, embed link, dan thumbnail
def get_video_details(video_id):
    try:
        request = youtube.videos().list(
            part="snippet,statistics,contentDetails",
            id=video_id
        )
        response = request.execute()

        if "items" not in response or not response["items"]:
            print(f"Video ID '{video_id}' tidak ditemukan.")
            return None

        video = response["items"][0]
        duration_iso = video["contentDetails"]["duration"]
        duration_hhmmss = convert_duration_to_hhmmss(duration_iso)

        return {
            "video_id": video["id"],
            "video_title": video["snippet"]["title"],
            "video_view_count": video["statistics"].get("viewCount", "0"),
            "video_like_count": video["statistics"].get("likeCount", "0"),
            "comment_count": video["statistics"].get("commentCount", "0"),
            "tags": ", ".join(video["snippet"].get("tags", [])),
            "published_at": video["snippet"]["publishedAt"],
            "influencer_id": video["snippet"]["channelId"],
            "category_id": video["snippet"].get("categoryId", "N/A"),
            "duration": duration_hhmmss,
            "embed_link": f"https://www.youtube.com/embed/{video['id']}",
            "thumbnail_url": video["snippet"]["thumbnails"]["high"]["url"]  # Thumbnail kualitas tinggi
        }
    except Exception as e:
        print(f"Error saat mengambil detail untuk video ID {video_id}: {e}")
        return None

# Fungsi untuk menulis data ke file CSV
def write_to_csv(data, filename="videos.csv"):
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=[
            "video_id", "video_title", "video_view_count", "video_like_count", 
            "comment_count", "tags", "published_at", "influencer_id", 
            "category_id", "duration", "embed_link", "thumbnail_url"
        ])
        writer.writeheader()
        writer.writerows(data)

# Proses utama untuk mengumpulkan data video
def main():
    influencer_ids = get_influencer_ids_from_csv()
    all_videos = []
    for influencer_id in influencer_ids:
        print(f"Mengambil data video untuk influencer_id {influencer_id}...")
        videos = get_videos_by_influencer(influencer_id)
        all_videos.extend(videos)

    write_to_csv(all_videos)
    print("Data berhasil disimpan ke 'videos.csv'.")

# Jalankan proses
if __name__ == "__main__":
    main()
