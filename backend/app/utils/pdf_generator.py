from pathlib import Path

from reportlab.platypus import (

    SimpleDocTemplate,

    Spacer,

    Paragraph,

    Image,

    Table,

    TableStyle
)

from reportlab.lib import colors

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from reportlab.lib.pagesizes import letter

# ==========================================
# REPORT STORAGE
# ==========================================

REPORT_DIR = Path(
    "storage/reports"
)

REPORT_DIR.mkdir(

    parents=True,

    exist_ok=True
)

# ==========================================
# PDF GENERATOR
# ==========================================

def generate_pdf_report(

    case_data
):

    print("\n================================")
    print("PDF GENERATOR STARTED")
    print("================================\n")

    # ======================================
    # REPORT FILE
    # ======================================

    report_filename = (

        f"{case_data['id']}.pdf"
    )

    report_path = (
        REPORT_DIR / report_filename
    )

    print("\nREPORT PATH:\n")

    print(report_path)

    # ======================================
    # PDF DOCUMENT
    # ======================================

    doc = SimpleDocTemplate(

        str(report_path),

        pagesize=letter,

        rightMargin=30,

        leftMargin=30,

        topMargin=30,

        bottomMargin=20,
    )

    styles = getSampleStyleSheet()

    elements = []

    # ======================================
    # TITLE
    # ======================================

    title = Paragraph(

        "<b>MONA Radiology Report</b>",

        styles["Title"]
    )

    elements.append(title)

    elements.append(
        Spacer(1, 18)
    )

    # ======================================
    # SAFE FIELDS
    # ======================================

    patient_name = str(

        case_data.get(
            "patient_name"
        )

        or

        "Unknown"
    )

    age = str(

        case_data.get(
            "age"
        )

        or

        "-"
    )

    sex = str(

        case_data.get(
            "sex"
        )

        or

        "-"
    )

    modality = str(

        case_data.get(
            "modality"
        )

        or

        "-"
    )

    priority = str(

        case_data.get(
            "priority"
        )

        or

        "-"
    )

    status = str(

        case_data.get(
            "status"
        )

        or

        "-"
    )

    confidence = str(

        case_data.get(
            "confidence"
        )

        or

        "-"
    )

    findings_text = str(

        case_data.get(
            "edited_findings"
        )

        or

        case_data.get(
            "finding"
        )

        or

        "No findings available"
    )

    impression_text = str(

        case_data.get(
            "edited_impression"
        )

        or

        case_data.get(
            "finding"
        )

        or

        "No impression available"
    )

    # ======================================
    # PATIENT TABLE
    # ======================================

    patient_table_data = [

        [

            "Patient",

            patient_name,

            "Modality",

            modality,
        ],

        [

            "Age / Sex",

            f"{age} / {sex}",

            "Priority",

            priority,
        ],

        [

            "Status",

            status,

            "Confidence",

            f"{confidence}%"
        ],
    ]

    patient_table = Table(

        patient_table_data,

        colWidths=[100, 150, 100, 150]
    )

    patient_table.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.lightgrey
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                1,
                colors.black
            ),

            (
                "FONTNAME",
                (0, 0),
                (-1, -1),
                "Helvetica-Bold"
            ),
        ])
    )

    elements.append(
        patient_table
    )

    elements.append(
        Spacer(1, 25)
    )

    # ======================================
    # IMAGE PATHS
    # ======================================

    original_image = str(

        case_data.get(
            "original_image"
        )

        or
        ""
    )

    heatmap_image = str(

        case_data.get(
            "heatmap_image"
        )

        or
        ""
    )

    original_image = original_image.lstrip("/")
    heatmap_image = heatmap_image.lstrip("/")

    original_image_path = (
        Path("frontend/public")
        / original_image
    )

    heatmap_image_path = (
        Path("frontend/public")
        / heatmap_image
    )

    print("\nORIGINAL IMAGE PATH:\n")
    print(original_image_path)

    print("\nHEATMAP IMAGE PATH:\n")
    print(heatmap_image_path)

    # ======================================
    # IMAGE TABLE
    # ======================================

    if (

        original_image_path.exists()

        and

        heatmap_image_path.exists()
    ):

        try:

            original_img = Image(

                str(original_image_path),

                width=240,

                height=240
            )

            heatmap_img = Image(

                str(heatmap_image_path),

                width=240,

                height=240
            )

            image_table = Table([

                [
                    original_img,
                    heatmap_img
                ],

                [
                    "Original Scan",
                    "AI Attention Map"
                ]
            ])

            image_table.setStyle(

                TableStyle([

                    (
                        "ALIGN",
                        (0, 0),
                        (-1, -1),
                        "CENTER"
                    ),

                    (
                        "BOTTOMPADDING",
                        (0, 0),
                        (-1, -1),
                        12
                    ),
                ])
            )

            elements.append(
                image_table
            )

            elements.append(
                Spacer(1, 20)
            )

            print("\nIMAGES ADDED SUCCESSFULLY\n")

        except Exception as error:

            print(
                "\nIMAGE LOAD FAILED:\n"
            )

            print(error)

    else:

        print("\nIMAGE FILES NOT FOUND\n")

    # ======================================
    # FINDINGS
    # ======================================

    findings_heading = Paragraph(

        "<b>Findings</b>",

        styles["Heading2"]
    )

    findings_body = Paragraph(

        findings_text,

        styles["BodyText"]
    )

    elements.append(
        findings_heading
    )

    elements.append(
        Spacer(1, 8)
    )

    elements.append(
        findings_body
    )

    elements.append(
        Spacer(1, 20)
    )

    # ======================================
    # IMPRESSION
    # ======================================

    impression_heading = Paragraph(

        "<b>Impression</b>",

        styles["Heading2"]
    )

    impression_body = Paragraph(

        impression_text,

        styles["BodyText"]
    )

    elements.append(
        impression_heading
    )

    elements.append(
        Spacer(1, 8)
    )

    elements.append(
        impression_body
    )

    elements.append(
        Spacer(1, 40)
    )

    # ======================================
    # SIGNATURE
    # ======================================

    signature = Paragraph(

        "AI-assisted draft reviewed "
        "and finalized by radiologist.",

        styles["Italic"]
    )

    elements.append(
        signature
    )

    # ======================================
    # BUILD PDF
    # ======================================

    doc.build(elements)

    print(
        f"\nPDF GENERATED SUCCESSFULLY:\n{report_path}\n"
    )

    # IMPORTANT:
    # RETURN ONLY FILENAME SAFE PATH

    return report_filename