from datetime import datetime
from typing import List, Dict, Optional
from app.models.database import db
from fastapi import HTTPException
from app.services.adsense_service import get_adsense_data
import re

def get_benchmarking_data(username1: Optional[str], username2: Optional[str], username3: Optional[str]) -> Dict:
    influencers = db["influencers"]
    countries = db["countries"]

    # Kumpulkan username yang tidak None atau kosong
    valid_usernames = [u for u in [username1, username2, username3] if u]

    # Validasi jumlah username (minimal 2, maksimal 3)
    if len(valid_usernames) < 2:
        raise ValueError("Minimal dua username harus diisi.")
    
    if len(valid_usernames) > 3:
        raise ValueError("Maksimal tiga username yang diperbolehkan.")
    
    # Validasi username apakah ada di database
    influencer_data = []
    for username in valid_usernames:
        influencer = influencers.find_one({"username": {"$regex": re.compile(username, re.IGNORECASE)}})
        if not influencer:
            raise HTTPException(status_code=404, detail=f"Username '{username}' not found")
        
        # Ambil history metrics dari setiap influencer
        history_metrics = influencer.get("history_metrics", [])
        if not history_metrics:
            raise HTTPException(status_code=404, detail=f"No history metrics available for username '{username}'")
        
        # Filter history metrics berdasarkan rentang tanggal
        start_date = datetime.strptime("2024-11-14", "%Y-%m-%d")
        end_date = datetime.strptime("2024-12-13", "%Y-%m-%d")
        
        filtered_metrics = [
            metric for metric in history_metrics
            if start_date <= datetime.strptime(metric["date"], "%Y-%m-%d") <= end_date
        ]
        
        if not filtered_metrics:
            raise HTTPException(status_code=404, detail=f"No history metrics found in the specified date range for username '{username}'")
        
        # Sort filtered metrics berdasarkan tanggal (ascending)
        filtered_metrics.sort(key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"))
        
        # Mendapatkan data Adsense untuk influencer tersebut
        adsense_data = get_adsense_data(influencer["influencer_id"], "2024-11-14", "2024-12-13")

        # Check if the data is available
        if not adsense_data:
            raise HTTPException(status_code=404, detail=f"No Adsense data available for username '{username}'")

        # Extract data from the Adsense response
        daily_avg = adsense_data["daily_avg"]
        weekly_avg = adsense_data["weekly_avg"]
        monthly_avg = adsense_data["monthly_avg"]

        # Ambil view_count terakhir dari history metrics
        latest_metrics = filtered_metrics[-1]
        latest_views = latest_metrics.get("view_count", 0)
                
        # Format created_at menjadi DD-MM-YYYY (mengabaikan waktu dan zona waktu)
        created_at = influencer.get("created_at", "N/A")
        if created_at != "N/A":
            # Menghapus bagian waktu dan zona waktu (T15:29:09Z)
            created_at = re.sub(r"T.*", "", created_at)
            created_at = datetime.strptime(created_at, "%Y-%m-%d").strftime("%d-%m-%Y")
        
        country_id = influencer.get("country_id", None)
        if country_id:
            country = countries.find_one({"country_id": country_id})
            country_name = country.get("country_name", "Unknown") if country else "Unknown"
        else:
            country_name = "Unknown"
                
        influencer_data.append({
            "username": username,
            "country": country_name,
            "views": latest_views,  # Use the latest view_count from history metrics
            "ranking": influencer.get("ranking", "N/A"),
            "created_at": created_at,
            "history_metrics": filtered_metrics,
            "daily_avg": daily_avg,
            "weekly_avg": weekly_avg,
            "monthly_avg": monthly_avg
        })
    
    # Return data
    return {
        "influencers": influencer_data
    }
