from fastapi import APIRouter, HTTPException, Query
from app.services.adsense_service import get_adsense_data

router = APIRouter()

@router.get("/", tags=["Adsense"])
async def get_adsense(
    date_start: str = Query(..., description="Start date for the adsense data"),
    date_end: str = Query(..., description="End date for the adsense data")
):
    try:
        adsense_data = get_adsense_data(date_start, date_end)
        return adsense_data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
