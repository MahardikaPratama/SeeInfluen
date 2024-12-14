from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from app.services.benchmarking_service import get_benchmarking_data

router = APIRouter()

@router.get("/", tags=["Benchmarking"])
async def get_benchmarking(
    username1: Optional[str] = Query(None, description="Username 1 (required)"),
    username2: Optional[str] = Query(None, description="Username 2 (optional)"),
    username3: Optional[str] = Query(None, description="Username 3 (optional)")
):
    try:
        # Validasi jumlah username (minimal 2 username harus ada)
        valid_usernames = [u for u in [username1, username2, username3] if u]
        if len(valid_usernames) < 2:
            raise HTTPException(status_code=400, detail="Minimal dua username harus diisi.")

        # Panggil service untuk mendapatkan data benchmarking
        benchmarking_data = get_benchmarking_data(username1, username2, username3)
        return benchmarking_data

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
