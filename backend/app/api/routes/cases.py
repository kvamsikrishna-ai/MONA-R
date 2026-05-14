from fastapi import APIRouter

from backend.app.db.database import (
    supabase
)

from backend.app.utils.pdf_generator import (
    generate_pdf_report
)

# ==========================================
# ROUTER
# ==========================================

router = APIRouter()

# ==========================================
# GET ALL CASES
# ==========================================

@router.get("/cases")

def get_cases():

    response = supabase.table(
        "cases"
    ).select("*").execute()

    return response.data

# ==========================================
# GET SINGLE CASE
# ==========================================

@router.get("/cases/{case_id}")

def get_case(case_id: str):

    response = supabase.table(
        "cases"
    ).select("*").eq(

        "id",
        case_id

    ).execute()

    if len(response.data) == 0:

        return {

            "error":
            "Case not found"
        }

    return response.data[0]

# ==========================================
# APPROVE CASE
# ==========================================

@router.post(
    "/cases/{case_id}/approve"
)

def approve_case(case_id: str):

    print("\n================================")
    print("APPROVE ROUTE HIT")
    print("================================\n")

    # ======================================
    # FETCH CASE
    # ======================================

    case_response = supabase.table(
        "cases"
    ).select("*").eq(

        "id",
        case_id

    ).execute()

    print("\nSTEP 1: CASE FETCHED\n")

    print(case_response.data)

    # ======================================
    # CASE NOT FOUND
    # ======================================

    if len(case_response.data) == 0:

        return {

            "error":
            "Case not found"
        }

    case_data = case_response.data[0]

    print("\nSTEP 2: CASE DATA\n")

    print(case_data)

    # ======================================
    # GENERATE PDF
    # ======================================

    print("\nSTEP 3: GENERATING PDF\n")

    pdf_path = generate_pdf_report(
        case_data
    )
    pdf_filename = pdf_path.split(
        "\\"
    )[-1]

    pdf_url = (

        f"/reports_storage/{pdf_filename}"
    )

    print("\nSTEP 4: PDF GENERATED\n")

    print(pdf_path)

    # ======================================
    # INSERT REPORT
    # ======================================

    print("\nSTEP 5: INSERTING REPORT\n")

    report_response = supabase.table(
        "reports"
    ).insert({

        "case_id":
        case_id,

        "impression":

        case_data.get(
            "edited_impression"
        )

        or

        case_data.get(
            "finding",
            ""
        ),

        "pdf_path":
        pdf_url,

        "approved_by":
        "Radiologist"

    }).execute()

    print("\nSTEP 6: REPORT INSERTED\n")

    print(report_response.data)

    # ======================================
    # UPDATE STATUS
    # ======================================

    print("\nSTEP 7: UPDATING STATUS\n")

    update_response = supabase.table(
        "cases"
    ).update({

        "status":
        "APPROVED"

    }).eq(

        "id",
        case_id

    ).execute()

    print("\nSTEP 8: STATUS UPDATED\n")

    print(update_response.data)

    return {

        "message":
        "Case approved",

        "pdf_path":
        pdf_url,

        "data":
        update_response.data
    }

# ==========================================
# REJECT CASE
# ==========================================

@router.post(
    "/cases/{case_id}/reject"
)

def reject_case(case_id: str):

    response = supabase.table(
        "cases"
    ).update({

        "status":
        "REJECTED"

    }).eq(

        "id",
        case_id

    ).execute()

    return response.data