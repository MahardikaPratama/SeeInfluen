import csv
import pymongo
from datetime import datetime

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['seeInfluen_db']

# Helper function to convert date strings to datetime objects
def convert_date(date_str):
    return date_str

# Function to migrate influencers data
def migrate_influencers():
    influencers = []
    with open('influencers.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            influencer = {
                'influencer_id': row['influencer_id'],
                'username': row['username'],
                'created_at': convert_date(row['created_at']),
                'country_id': row['country_id'],
                'history_metrics': []  # Placeholder for embedded data from history_metrics
            }
            influencers.append(influencer)
    
    db.influencers.insert_many(influencers)

# Function to migrate history metrics data and embed it into influencers
def migrate_history_metrics():
    with open('history_metrics.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            metric = {
                'date': convert_date(row['date']),
                'view_count': int(row['view_count']),
                'subscriber_count': int(row['subcriber_count']),
                'video_count': int(row['video_count'])
            }

            # Update influencer with embedded history metrics
            db.influencers.update_one(
                {'influencer_id': row['influencer_id']},
                {'$push': {'history_metrics': metric}}
            )

# Function to migrate countries data
def migrate_countries():
    countries = []
    with open('countries.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            countries.append({
                'country_id': row['country_id'],
                'country_name': row['country_name']
            })
    
    db.countries.insert_many(countries)

# Function to migrate categories data
def migrate_categories():
    categories = []
    with open('categories.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            categories.append({
                'category_id': int(row['category_id']),
                'category_name': row['category_name']
            })
    
    db.categories.insert_many(categories)

# Function to migrate videos data
def migrate_videos():
    videos = []
    with open('videos.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            video = {
                'video_id': row['video_id'],
                'video_title': row['video_title'],
                'video_view_count': int(row['video_view_count']),
                'video_like_count': int(row['video_like_count']),
                'comment_count': int(row['comment_count']),
                'tags': row['tags'].split(','),  # Convert tags to list
                'published_at': convert_date(row['published_at']),
                'influencer_id': row['influencer_id'],
                'category_id': int(row['category_id']),
                'duration': row['duration'],
                'embed_link': row['embed_link'],
                'thumbnail_url': row['thumbnail_url']
            }
            videos.append(video)
    
    db.videos.insert_many(videos)

# Function to migrate comments data
def migrate_comments():
    comments = []
    with open('comments.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            comments.append({
                'video_id': row['video_id'],
                'comment_id': row['comment_id'],
                'comment_text': row['comment_text']
            })
    
    db.comments.insert_many(comments)

# Run all migration functions
def run_migration():
    migrate_influencers()
    migrate_history_metrics()
    migrate_countries()
    migrate_categories()
    migrate_videos()
    migrate_comments()

if __name__ == "__main__":
    run_migration()
