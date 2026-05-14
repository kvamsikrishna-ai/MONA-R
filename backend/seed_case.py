from backend.app.services.case_service import (
    insert_case
)

sample_case = {

    "patient_name":
    "K. Verma",

    "age": 52,

    "sex": "F",

    "modality":
    "Chest X-Ray",

    "priority":
    "HIGH",

    "finding":
    "Pneumonia",

    "confidence": 91,

    "status":
    "PENDING",

    "original_image":
    "/scans/original/sample1.png",

    "heatmap_image":
    "/scans/heatmaps/sample1_heatmap.png",
}

response = insert_case(
    sample_case
)

print(response)