from datetime import datetime, timedelta
from app.models.database import db
from fastapi import HTTPException
from typing import Dict

def get_adsense_data(influencer_id: str, date_start: str, date_end: str) -> Dict:
    influencers = db["influencers"]
    
    influencer = influencers.find_one({"influencer_id": influencer_id})

    if not influencer:
        raise HTTPException(status_code=404, detail="Influencer not found")

    # Ambil history metrics dari influencer
    history_metrics = influencer.get("history_metrics", [])

    if not history_metrics:
        print("No history metrics available")
        return []

    # Parse date_start dan date_end ke objek datetime
    start_date = datetime.strptime(date_start, "%Y-%m-%d")
    end_date = datetime.strptime(date_end, "%Y-%m-%d")
    
    # Filter history metrics berdasarkan rentang tanggal
    filtered_metrics = [
        metric for metric in history_metrics
        if start_date <= datetime.strptime(metric["date"], "%Y-%m-%d") <= end_date
    ]
    
    if not filtered_metrics:
        print("No history metrics found in the specified date range")
        return []

    # Sort filtered metrics berdasarkan tanggal (ascending)
    filtered_metrics.sort(key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"), reverse=False)

    # Menyiapkan daftar hasil per hari
    daily_results = []
    
    # Tentukan CPM (dalam dollar) dan kurs konversi ke IDR
    cpm_min = 0.25
    cpm_max = 4
    usd_to_idr = 16032  # Kurs 1 USD = 16,032 IDR
    
    # Total views dan pendapatan untuk perhitungan rata-rata, mingguan, dan bulanan
    total_views = 0
    total_revenue_min = 0
    total_revenue_max = 0
    
    weekly_results = {}
    monthly_results = {}
    
    # Iterasi dari start_date hingga end_date
    current_date = start_date
    while current_date <= end_date:
        # Mencari data views untuk tanggal tersebut
        metric_for_day = next((metric for metric in filtered_metrics if datetime.strptime(metric["date"], "%Y-%m-%d") == current_date), None)
        
        if metric_for_day:
            view_count = metric_for_day["view_count"]
            
            # Hitung estimasi pendapatan per hari dalam USD
            estimated_min_revenue_usd = (view_count / 1000) * cpm_min
            estimated_max_revenue_usd = (view_count / 1000) * cpm_max
            
            # Konversi estimasi pendapatan ke IDR
            estimated_min_revenue_idr = estimated_min_revenue_usd * usd_to_idr
            estimated_max_revenue_idr = estimated_max_revenue_usd * usd_to_idr
        else:
            # Jika tidak ada data untuk tanggal tersebut, estimasi 0 views dan 0 pendapatan
            view_count = 0
            estimated_min_revenue_idr = 0
            estimated_max_revenue_idr = 0
        
        # Menyimpan hasil untuk tanggal tersebut
        daily_results.append({
            "date": current_date.strftime("%d/%m/%Y"),
            "video_views": view_count,
            "estimated_min_revenue": f"Rp. {estimated_min_revenue_idr:,.0f}",
            "estimated_max_revenue": f"Rp. {estimated_max_revenue_idr:,.0f}"
        })
        
        # Menambahkan total views dan pendapatan untuk perhitungan
        total_views += view_count
        total_revenue_min += estimated_min_revenue_idr
        total_revenue_max += estimated_max_revenue_idr
        
        # Hitung hasil mingguan
        week_start = current_date - timedelta(days=current_date.weekday())  # Mulai minggu
        week_key = week_start.strftime("%d/%m/%Y")
        
        if week_key not in weekly_results:
            weekly_results[week_key] = {
                "views": 0,
                "revenue_min": 0,
                "revenue_max": 0
            }
        
        weekly_results[week_key]["views"] += view_count
        weekly_results[week_key]["revenue_min"] += estimated_min_revenue_idr
        weekly_results[week_key]["revenue_max"] += estimated_max_revenue_idr
        
        # Hitung hasil bulanan
        month_key = current_date.strftime("%m/%Y")
        
        if month_key not in monthly_results:
            monthly_results[month_key] = {
                "views": 0,
                "revenue_min": 0,
                "revenue_max": 0
            }
        
        monthly_results[month_key]["views"] += view_count
        monthly_results[month_key]["revenue_min"] += estimated_min_revenue_idr
        monthly_results[month_key]["revenue_max"] += estimated_max_revenue_idr
        
        # Beralih ke tanggal berikutnya
        current_date += timedelta(days=1)
    
    # Hitung Daily Average
    days_count = (end_date - start_date).days + 1
    daily_avg_views = total_views / days_count if days_count > 0 else 0
    daily_avg_revenue_min = total_revenue_min / days_count if days_count > 0 else 0
    daily_avg_revenue_max = total_revenue_max / days_count if days_count > 0 else 0
    
    # Calculate weekly and monthly averages
    weekly_avg_views = sum(week["views"] for week in weekly_results.values()) / len(weekly_results) if weekly_results else 0
    weekly_avg_revenue_min = sum(week["revenue_min"] for week in weekly_results.values()) / len(weekly_results) if weekly_results else 0
    weekly_avg_revenue_max = sum(week["revenue_max"] for week in weekly_results.values()) / len(weekly_results) if weekly_results else 0

    monthly_avg_views = sum(month["views"] for month in monthly_results.values()) / len(monthly_results) if monthly_results else 0
    monthly_avg_revenue_min = sum(month["revenue_min"] for month in monthly_results.values()) / len(monthly_results) if monthly_results else 0
    monthly_avg_revenue_max = sum(month["revenue_max"] for month in monthly_results.values()) / len(monthly_results) if monthly_results else 0

    # Menyusun hasil akhir
    result = {
        "date_start": date_start,
        "date_end": date_end,
        "daily_results": daily_results,
        "daily_avg": {
            "views": round(daily_avg_views, 2),
            "estimated_min_revenue": f"Rp. {daily_avg_revenue_min:,.2f}",
            "estimated_max_revenue": f"Rp. {daily_avg_revenue_max:,.2f}"
        },
        "weekly_avg": {
            "views": round(weekly_avg_views, 2),
            "estimated_min_revenue": f"Rp. {weekly_avg_revenue_min:,.2f}",
            "estimated_max_revenue": f"Rp. {weekly_avg_revenue_max:,.2f}"
        },
        "monthly_avg": {
            "views": round(monthly_avg_views, 2),
            "estimated_min_revenue": f"Rp. {monthly_avg_revenue_min:,.2f}",
            "estimated_max_revenue": f"Rp. {monthly_avg_revenue_max:,.2f}"
        }
    }
    
    return result
