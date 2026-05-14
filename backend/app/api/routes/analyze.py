from pathlib import Path
import shutil

from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from backend.app.services.inference_service import (
    analyze_scan
)

from backend.app.schemas.response_schema import (
    AnalysisResponse
)


router = APIRouter()


UPLOAD_DIR = Path(
    "storage/uploads"
)

UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)


@router.post(
    "/analyze",
    response_model=AnalysisResponse
)
async def analyze_endpoint(
    file: UploadFile = File(...)
):

    file_path = (
        UPLOAD_DIR / file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = analyze_scan(
        str(file_path)
    )

    return result