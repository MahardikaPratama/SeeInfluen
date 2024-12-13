# dashboard.py
from fastapi import APIRouter, HTTPException, Query
from app.services.dashboard_service import get_dashboard_data

router = APIRouter()

@router.get("/", tags=["Dashboard"])
async def get_dashboard(influencer_id: str = Query(..., description="ID of the influencer")):
    try:
        dashboard_data = get_dashboard_data(influencer_id)
        return dashboard_data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
