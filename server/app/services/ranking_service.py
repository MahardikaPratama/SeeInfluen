from datetime import datetime, timedelta
from app.models.database import db
from fastapi import HTTPException

def calculate_ranking_and_update():
    influencers_collection = db["influencers"]
    countries_collection = db["countries"]
    result = []

    # Ambil semua data influencer
    influencers = list(influencers_collection.find())
    if not influencers:
        raise HTTPException(status_code=404, detail="Tidak terdapat data influencer.")

    for influencer in influencers:
        history_metrics = influencer.get("history_metrics", [])
        
        if not history_metrics:
            continue

        # Urutkan history_metrics berdasarkan tanggal (format tanggal diasumsikan "YYYY-MM-DD")
        history_metrics.sort(key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"), reverse=True)

        # Ambil data terbaru dan data 30 hari lalu
        latest_metrics = history_metrics[0]  # Data terbaru
        previous_metrics = history_metrics[29] if len(history_metrics) >= 30 else None  # Data 30 hari lalu

        if latest_metrics and previous_metrics:
            # Hitung Growth Rate Subscribers
            subscriber_count_now = latest_metrics["subscriber_count"]
            subscriber_count_30_days_ago = previous_metrics["subscriber_count"]
            
            # Jika subscriber_count_30_days_ago adalah 0, set growth rate menjadi 100%
            if subscriber_count_30_days_ago != 0:
                growth_rate_subscribers = round(
                    ((subscriber_count_now - subscriber_count_30_days_ago) / subscriber_count_30_days_ago) * 100, 2
                )
            else:
                # Jika sebelumnya 0, anggap kenaikan 100%
                growth_rate_subscribers = 100

            # Hitung Growth Rate Views
            view_count_now = latest_metrics["view_count"]
            view_count_30_days_ago = previous_metrics["view_count"]
            
            if view_count_30_days_ago != 0:
                growth_rate_views = round(
                    ((view_count_now - view_count_30_days_ago) / view_count_30_days_ago) * 100, 2
                )
            else:
                # Jika sebelumnya 0, anggap kenaikan 100%
                growth_rate_views = 100

            # Hitung skor berdasarkan bobot
            score = round((0.6 * growth_rate_subscribers) + (0.4 * growth_rate_views), 2)

            # Ambil nama negara dari koleksi countries
            country_name = countries_collection.find_one(
                {"country_id": influencer["country_id"]}
            )["country_name"]

            result.append({
                "influencer_id": influencer["influencer_id"],
                "username": influencer["username"],
                "score": score,
                "country_name": country_name,
            })

    # Urutkan berdasarkan skor (descending) dan berikan ranking
    result.sort(key=lambda x: x["score"], reverse=True)
    for i, influencer in enumerate(result):
        influencer["ranking"] = i + 1

        # Update skor dan ranking ke database
        influencers_collection.update_one(
            {"influencer_id": influencer["influencer_id"]},
            {"$set": {"score": influencer["score"], "ranking": influencer["ranking"]}}
        )

    return result


def get_ranking_data(limit: int, offset: int):
    total = db["influencers"].count_documents({})
    influencers = db["influencers"].find(
        {}, {"_id": 0, "influencer_id": 1, "username": 1, "ranking": 1, "score": 1, "country_id": 1}
    ).sort("ranking", 1).skip(offset).limit(limit)

    countries = {c["country_id"]: c["country_name"] for c in db["countries"].find()}
    result = []
    for influencer in influencers:
        result.append({
            "influencer_id": influencer["influencer_id"],
            "username": influencer["username"],
            "ranking": influencer["ranking"],
            "score": influencer["score"],
            "country_name": countries.get(influencer["country_id"], "Unknown"),
        })

    return {"total": total, "data": result}

def filter_by_country(limit: int, country_id: str, offset: int):
    total = db["influencers"].count_documents({"country_id": country_id})
    influencers = db["influencers"].find(
        {"country_id": country_id},
        {"_id": 0, "influencer_id": 1, "username": 1, "ranking": 1, "score": 1, "country_id": 1}
    ).sort("ranking", 1).skip(offset).limit(limit)

    countries = {c["country_id"]: c["country_name"] for c in db["countries"].find()}
    result = []
    for influencer in influencers:
        result.append({
            "influencer_id": influencer["influencer_id"],
            "username": influencer["username"],
            "ranking": influencer["ranking"],
            "score": influencer["score"],
            "country_name": countries.get(influencer["country_id"], "Unknown"),
        })

    return {"total": total, "data": result}

def search_by_username(username: str, limit: int, offset: int):
    total = db["influencers"].count_documents({"username": {"$regex": username, "$options": "i"}})
    influencers = db["influencers"].find(
        {"username": {"$regex": username, "$options": "i"}},
        {"_id": 0, "influencer_id": 1, "username": 1, "ranking": 1, "score": 1, "country_id": 1}
    ).skip(offset).limit(limit)
    
    influencers = list(influencers)
    
    if not influencers:
        raise HTTPException(status_code=404, detail="Tidak ada influencer yang ditemukan.")
    
    countries = {c["country_id"]: c["country_name"] for c in db["countries"].find()}
    result = []
    for influencer in influencers:
        result.append({
            "influencer_id": influencer["influencer_id"],
            "username": influencer["username"],
            "ranking": influencer["ranking"],
            "score": influencer["score"],
            "country_name": countries.get(influencer["country_id"], "Unknown"),
        })
    
    return {"total": total, "data": result}

    
def get_countries():
    # Ambil daftar negara
    countries = db["countries"].find({}, {"_id": 0, "country_id": 1, "country_name": 1})
    return list(countries)