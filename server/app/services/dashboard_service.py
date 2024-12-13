# dashboard_service.py
from datetime import datetime, timedelta
from app.models.database import db
from fastapi import HTTPException

def get_dashboard_data(influencer_id: str):
    influencers = db["influencers"]
    result = []

    influencer = influencers.find_one({"influencer_id": influencer_id})
    
    if not influencer:
        raise HTTPException(status_code=404, detail="Influencer not found")

    history_metrics = influencer.get("history_metrics", [])
    
    if not history_metrics:
        print("No history metrics available")
        return []

    # Sort history_metrics by date (assuming date is in "YYYY-MM-DD" format)
    history_metrics.sort(key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"), reverse=True)

    latest_metrics = history_metrics[0]  # Get the most recent metrics

    # Find the metrics from 7 days ago (if available)
    previous_metrics = history_metrics[6]

    # If we have both metrics, calculate the growth rates
    if latest_metrics and previous_metrics:
        growth_rate_subscribers = round(
            ((latest_metrics["subscriber_count"] - previous_metrics["subscriber_count"]) / 
            previous_metrics["subscriber_count"]) * 100, 2
        )
        growth_rate_views = round(
            ((latest_metrics["view_count"] - previous_metrics["view_count"]) / 
            previous_metrics["view_count"]) * 100, 2
        )
        growth_rate_videos = round(
            ((latest_metrics["video_count"] - previous_metrics["video_count"]) / 
            previous_metrics["video_count"]) * 100, 2
        )

        # Add data to the result
        result.append({
            "influencer_id": influencer["influencer_id"],
            "username": influencer["username"],
            "latest_subscriber_count": latest_metrics["subscriber_count"],
            "previous_subscriber_count": previous_metrics["subscriber_count"],
            "latest_view_count": latest_metrics["view_count"],
            "previous_view_count": previous_metrics["view_count"],
            "latest_video_count": latest_metrics["video_count"],
            "previous_video_count": previous_metrics["video_count"],
            "growth_rate_subscribers": growth_rate_subscribers,
            "growth_rate_views": growth_rate_views,
            "growth_rate_videos": growth_rate_videos,
        })
    
    # ammbil data statistik 3 video terbaru berdasarkan published_at
    videos = db["videos"]
    latest_videos = videos.find({"influencer_id": influencer_id}).sort("published_at", -1).limit(3)
    video_data = []
    
    for video in latest_videos:
        video_data.append({
            "video_id": video["video_id"],
            "video_title": video["video_title"],
            "video_view_count": video["video_view_count"],
            "video_like_count": video["video_like_count"],
            "comment_count": video["comment_count"],
            "duration": video["duration"],
            "embed_link": video["embed_link"],
            "thumbnail_url": video["thumbnail_url"]
        })
        
    result[0]["videos"] = video_data
    
    return result
