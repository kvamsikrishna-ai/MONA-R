from pathlib import Path

import cv2
import numpy as np

from ai_pipeline.preprocessing.png_loader import (
    load_png_image
)

from ai_pipeline.adapters.dicom_adapter import (
    load_dicom_image
)

from ai_pipeline.metadata.extract_metadata import (
    extract_dicom_metadata
)

from ai_pipeline.preprocessing.preprocess import (
    preprocess_image
)

from ai_pipeline.models.load_model import (
    load_xray_model
)

from ai_pipeline.inference.run_inference import (
    run_inference
)

from ai_pipeline.findings.generate_findings import (
    generate_findings
)

from ai_pipeline.findings.report_generator import (
    generate_structured_report
)

from ai_pipeline.segmentation.gradcam import (
    GradCAM,
    save_heatmap
)

# ==========================================
# SUPPORTED FORMATS
# ==========================================

SUPPORTED_IMAGE_FORMATS = [
    ".png",
    ".jpg",
    ".jpeg"
]

SUPPORTED_DICOM_FORMATS = [
    ".dcm"
]

# ==========================================
# NORMALIZE IMAGE
# ==========================================

def normalize_for_png(image):

    image = image.astype(np.float32)

    normalized = cv2.normalize(

        image,

        None,

        0,

        255,

        cv2.NORM_MINMAX
    )

    normalized = normalized.astype(
        np.uint8
    )

    return normalized

# ==========================================
# MAIN PIPELINE
# ==========================================

def run_unified_pipeline(file_path):

    file_path = Path(file_path)

    extension = file_path.suffix.lower()

    metadata = {}

    # ======================================
    # LOAD IMAGE
    # ======================================

    print("\n[1] Detecting input format...\n")

    if extension in SUPPORTED_DICOM_FORMATS:

        print("Detected DICOM input.")

        metadata = extract_dicom_metadata(
            str(file_path)
        )

        image = load_dicom_image(
            str(file_path)
        )

    elif extension in SUPPORTED_IMAGE_FORMATS:

        print("Detected image input.")

        image = load_png_image(
            str(file_path)
        )

    else:

        raise ValueError(
            f"Unsupported file format: {extension}"
        )

    # ======================================
    # NORMALIZE ORIGINAL IMAGE
    # ======================================

    normalized_image = normalize_for_png(
        image
    )

    # ======================================
    # PREPROCESS
    # ======================================

    print("\n[2] Preprocessing image...\n")

    processed_image = preprocess_image(
        normalized_image
    )

    # ======================================
    # LOAD MODEL
    # ======================================

    print(
        "[3] Loading TorchXRayVision model...\n"
    )

    model = load_xray_model()

    # ======================================
    # RUN INFERENCE
    # ======================================

    print("[4] Running inference...\n")

    predictions, image_tensor = run_inference(

        model,

        processed_image
    )

    # ======================================
    # GENERATE FINDINGS
    # ======================================

    print(
        "[5] Generating primary findings...\n"
    )

    findings = generate_findings(
        predictions
    )

    # ======================================
    # GENERATE HEATMAP
    # ======================================

    heatmap_filename = (
        file_path.stem
        + "_heatmap.png"
    )

    heatmap_output_path = (

        "frontend/public/scans/heatmaps/"
        + heatmap_filename
    )

    frontend_heatmap_path = (

        "/scans/heatmaps/"
        + heatmap_filename
    )

    if findings:

        print(
            "[6] Generating GradCAM heatmap...\n"
        )

        top_finding = findings[0][0]

        class_index = model.pathologies.index(
            top_finding
        )

        target_layer = model.features[-1]

        gradcam = GradCAM(
            model,
            target_layer
        )

        cam = gradcam.generate(
            image_tensor,
            class_index
        )

        save_heatmap(

            normalized_image,

            cam,

            heatmap_output_path
        )

        print(
            f"Heatmap saved to: {heatmap_output_path}"
        )

    # ======================================
    # SAVE ORIGINAL PNG
    # ======================================

    original_png_filename = (
        file_path.stem
        + ".png"
    )

    original_png_output_path = (

        "frontend/public/scans/original/"
        + original_png_filename
    )

    frontend_original_path = (

        "/scans/original/"
        + original_png_filename
    )

    cv2.imwrite(

        original_png_output_path,

        normalized_image
    )

    print(
        f"Original PNG saved to: {original_png_output_path}"
    )

    # ======================================
    # GENERATE REPORT
    # ======================================

    print(
        "\n[7] Generating structured report...\n"
    )

    report = generate_structured_report(
        findings
    )

    # ======================================
    # DISPLAY METADATA
    # ======================================

    if metadata:

        print(
            "\n========== DICOM METADATA ==========\n"
        )

        for key, value in metadata.items():

            print(f"{key}: {value}")

    # ======================================
    # DISPLAY FINDINGS
    # ======================================

    print(
        "\n========== STRUCTURED FINDINGS ==========\n"
    )

    for finding in report["findings"]:

        print(f"- {finding}")

    print(
        "\n========== IMPRESSION ==========\n"
    )

    print(report["impression"])

    print(
        "\n========================================\n"
    )

    # ======================================
    # RETURN RESULTS
    # ======================================

    return {

        "metadata":
        metadata,

        "raw_predictions":
        predictions,

        "primary_findings":
        findings,

        "structured_report":
        report,

        "original_image":
        frontend_original_path,

        "heatmap_path":
        frontend_heatmap_path
    }