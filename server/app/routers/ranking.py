from fastapi import APIRouter, HTTPException, Query
from app.services.ranking_service import (
    calculate_ranking_and_update,
    get_ranking_data,
    filter_by_country,
    search_by_username,
    get_countries as fetch_countries,
)

router = APIRouter()

@router.get("/", tags=["Ranking"])
async def get_ranking(
    limit: int = Query(10, description="Number of influencers to return"),
    offset: int = Query(0, description="Offset for pagination")
):
    try:
        calculate_ranking_and_update()
        ranking_data = get_ranking_data(limit, offset)
        return ranking_data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/filter", tags=["Ranking"])
async def filter_ranking(
    limit: int = Query(10, description="Number of influencers to return"),
    country_id: str = Query(..., description="ID of the country to filter by"),
    offset: int = Query(0, description="Offset for pagination")
):
    try:
        ranking_data = filter_by_country(limit, country_id, offset)
        return ranking_data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/search", tags=["Ranking"])
async def search_ranking(
    username: str = Query(..., description="Username to search for"),
    limit: int = Query(10, description="Number of influencers to return"),
    offset: int = Query(0, description="Offset for pagination")
):
    try:
        ranking_data = search_by_username(username, limit, offset)
        return ranking_data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/countries", tags=["Ranking"])
async def list_countries():
    try:
        countries = fetch_countries()
        return countries
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")