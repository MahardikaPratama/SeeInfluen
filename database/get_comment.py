import googleapiclient.discovery
import googleapiclient.errors
import csv

# Konfigurasi API key
API_KEY = "AIzaSyCndbg6Hu8UsyiNAcj9l11fT_JZIPjiWbU"
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

# Inisialisasi YouTube API client
youtube = googleapiclient.discovery.build(API_SERVICE_NAME, API_VERSION, developerKey=API_KEY)

# Fungsi untuk mendapatkan reply dari komentar utama
def get_comment_replies(parent_id):
    replies = []
    next_page_token = None

    while True:
        try:
            request = youtube.comments().list(
                part="id,snippet",
                parentId=parent_id,
                textFormat="plainText",
                pageToken=next_page_token
            )
            response = request.execute()

            for item in response['items']:
                reply_data = {
                    "comment_id": parent_id,
                    "reply_id": item['id'],
                    "reply_text": item['snippet']['textDisplay'],
                }
                replies.append(reply_data)

            next_page_token = response.get('nextPageToken')
            if not next_page_token:
                break  # Hentikan jika tidak ada halaman berikutnya

        except googleapiclient.errors.HttpError as e:
            print(f"Terjadi error saat memproses reply untuk comment ID {parent_id}: {e}")
            break

    return replies

# Fungsi untuk mendapatkan semua komentar dari video, termasuk reply
def get_video_comments(video_id):
    comments = []
    next_page_token = None

    while len(comments) < 100:  # Batasi jumlah komentar hingga 100
        try:
            request = youtube.commentThreads().list(
                part="id,snippet",
                videoId=video_id,
                textFormat="plainText",
                pageToken=next_page_token
            )
            response = request.execute()

            for item in response['items']:
                if len(comments) >= 25:
                    break  # Hentikan jika sudah mencapai 25 komentar
                top_comment = {
                    "video_id": video_id,
                    "comment_id": item['id'],
                    "comment_text": item['snippet']['topLevelComment']['snippet']['textDisplay'],
                }
                comments.append(top_comment)

                # Ambil reply dari komentar utama
                reply_id = item['id']
                replies = get_comment_replies(reply_id)
                for reply in replies:
                    comments.append({
                        "video_id": video_id,
                        "comment_id": reply['reply_id'],
                        "comment_text": reply['reply_text'],
                    })

            next_page_token = response.get('nextPageToken')
            if not next_page_token or len(comments) >= 25:
                break  # Hentikan jika tidak ada halaman berikutnya atau sudah cukup 25 komentar

        except googleapiclient.errors.HttpError as e:
            if "commentsDisabled" in str(e):
                print(f"Komentar dinonaktifkan untuk video ID: {video_id}")
            else:
                print(f"Terjadi error lain untuk video ID {video_id}: {e}")
            break

    return comments

# Fungsi untuk menyimpan komentar ke file CSV
def save_comments_to_csv(comments, output_filename="comments_with_replies.csv"):
    try:
        with open(output_filename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=["video_id", "comment_id", "comment_text"])
            writer.writeheader()  # Tulis header di CSV
            writer.writerows(comments)  # Tulis data komentar
        print(f"Komentar berhasil disimpan ke {output_filename}.")
    except Exception as e:
        print(f"Terjadi kesalahan saat menyimpan komentar ke CSV: {e}")

# Fungsi untuk memproses video dan menyimpan komentar ke CSV
def process_and_save_video_comments(input_filename="videos.csv", output_filename="comments_with_replies.csv"):
    all_comments = []
    
    # Membaca video ID dari file CSV
    with open(input_filename, mode="r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            video_id = row['video_id']
            print(f"Memproses komentar untuk video ID: {video_id}")
            comments = get_video_comments(video_id)
            all_comments.extend(comments)
    
    # Simpan semua komentar ke file CSV
    save_comments_to_csv(all_comments, output_filename)

# Jalankan proses
if __name__ == "__main__":
    process_and_save_video_comments()
