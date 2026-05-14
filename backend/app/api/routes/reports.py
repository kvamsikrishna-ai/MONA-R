from fastapi import APIRouter

from backend.app.db.database import (
    supabase
)

router = APIRouter()

# ==========================================
# GET REPORTS
# ==========================================

@router.get("/reports")

def get_reports():

    response = supabase.table(
        "reports"
    ).select("*").execute()

    return response.data