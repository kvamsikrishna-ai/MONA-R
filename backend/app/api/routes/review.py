from fastapi import APIRouter

router = APIRouter()


@router.post(
    "/cases/{case_id}/approve"
)
def approve_case(case_id: str):

    return {
        "message":
            f"Case {case_id} approved"
    }


@router.post(
    "/cases/{case_id}/reject"
)
def reject_case(case_id: str):

    return {
        "message":
            f"Case {case_id} rejected"
    }