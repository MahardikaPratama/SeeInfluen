from fastapi import APIRouter, HTTPException, Query
from app.services.trending_service import get_trending_data

router = APIRouter()

@router.get("/", tags=["Trending"])
async def get_trending(
    limit: int = Query(10, ge=1, le=100, description="Number of results to return (1-100)"),
    offset: int = Query(0, ge=0, description="Number of results to skip")
):
    try:
        trending_data = get_trending_data(limit=limit, offset=offset)
        return trending_data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
