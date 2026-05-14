from backend.app.db.database import (
    supabase
)

# ==========================================
# FETCH CASES
# ==========================================

def fetch_cases():

    response = supabase.table(
        "cases"
    ).select("*").execute()

    return response.data

# ==========================================
# INSERT CASE
# ==========================================

def insert_case(case_data: dict):

    response = supabase.table(
        "cases"
    ).insert(case_data).execute()

    return response.data

# ==========================================
# APPROVE CASE
# ==========================================

def approve_case(case_id: str):

    response = supabase.table(
        "cases"
    ).update({

        "status": "APPROVED"

    }).eq(

        "id",
        case_id

    ).execute()

    return response.data

# ==========================================
# REJECT CASE
# ==========================================

def reject_case(case_id: str):

    response = supabase.table(
        "cases"
    ).update({

        "status": "REJECTED"

    }).eq(

        "id",
        case_id

    ).execute()

    return response.data