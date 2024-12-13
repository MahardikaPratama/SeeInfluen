from pydantic import BaseModel
from typing import List, Optional

class VideoData(BaseModel):
    video_id: str
    video_title: str
    video_view_count: int
    video_like_count: int
    comment_count: int
    duration: str
    embed_link: str
    thumbnail_url: str

class InfluencerMetrics(BaseModel):
    influencer_id: str
    username: str
    latest_subscriber_count: int
    previous_subscriber_count: int
    latest_view_count: int
    previous_view_count: int
    latest_video_count: int
    previous_video_count: int
    growth_rate_subscribers: float
    growth_rate_views: float
    growth_rate_videos: float
    videos: List[VideoData]
