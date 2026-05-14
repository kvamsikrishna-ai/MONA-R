from pathlib import Path

from backend.app.services.case_service import (
    insert_case
)

from ai_pipeline.pipelines.unified_pipeline import (
    run_unified_pipeline
)

# ==========================================
# INPUT DIRECTORY
# ==========================================

DICOM_DIR = Path(
    "storage/dicom"
)

# ==========================================
# VERIFY DIRECTORY
# ==========================================

if not DICOM_DIR.exists():

    raise FileNotFoundError(

        f"{DICOM_DIR} does not exist"
    )

# ==========================================
# FETCH ALL DICOM FILES
# ==========================================

dicom_files = list(

    DICOM_DIR.glob("*.dcm")
)

# ==========================================
# EMPTY CHECK
# ==========================================

if len(dicom_files) == 0:

    print(
        "\nNo DICOM files found.\n"
    )

# ==========================================
# PROCESS EACH DICOM
# ==========================================

for dicom_file in dicom_files:

    print("\n================================")
    print(f"Processing: {dicom_file.name}")
    print("================================")

    try:

        # ==================================
        # RUN UNIFIED PIPELINE
        # ==================================

        result = run_unified_pipeline(
            str(dicom_file)
        )

        # ==================================
        # EXTRACT RESULTS
        # ==================================

        metadata = result.get(
            "metadata",
            {}
        )

        structured_report = result.get(
            "structured_report",
            {}
        )

        impression = structured_report.get(
            "impression",
            "No Impression"
        )

        # ==================================
        # PRIORITY LOGIC
        # ==================================

        high_priority_keywords = [

            "pneumonia",
            "effusion",
            "opacity",
            "mass",
            "edema",
            "infiltrate",
            "cardiomegaly",
        ]

        priority = "LOW"

        for keyword in high_priority_keywords:

            if keyword.lower() in impression.lower():

                priority = "HIGH"

                break

        # ==================================
        # SAFE AGE PARSING
        # ==================================

        raw_age = str(

            metadata.get(
                "PatientAge",
                "0"
            )

        ).replace("Y", "")

        try:

            age = int(raw_age)

        except:

            age = 0

        # ==================================
        # DEBUG OUTPUT
        # ==================================

        print("\nORIGINAL IMAGE:")
        print(
            result.get(
                "original_image",
                ""
            )
        )

        print("\nHEATMAP IMAGE:")
        print(
            result.get(
                "heatmap_path",
                ""
            )
        )

        # ==================================
        # BUILD DATABASE OBJECT
        # ==================================

        case_data = {

            "patient_name":

            str(

                metadata.get(
                    "PatientName",
                    "Unknown"
                )
            ),

            "age":
            age,

            "sex":

            metadata.get(
                "PatientSex",
                "Unknown"
            ),

            "modality":

            metadata.get(
                "Modality",
                "CR"
            ),

            "priority":
            priority,

            "finding":
            impression,

            "confidence":
            90,

            "status":
            "PENDING",

            # ==============================
            # IMPORTANT FIX
            # ==============================

            "original_image":

            result.get(
                "original_image",
                ""
            ),

            "heatmap_image":

            result.get(
                "heatmap_path",
                ""
            ),
        }

        # ==================================
        # INSERT INTO DATABASE
        # ==================================

        response = insert_case(
            case_data
        )

        print("\nInserted Into DB:")
        print(response)

    except Exception as error:

        print("\nFAILED:")
        print(dicom_file.name)

        print("\nERROR:")
        print(error)