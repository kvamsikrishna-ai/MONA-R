from pathlib import Path

import cv2

from ai_pipeline.adapters.dicom_adapter import (
    load_dicom_image
)

from ai_pipeline.metadata.dicom_metadata import (
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
# DICOM FILE PATH
# ==========================================

dicom_path = Path(
    "ai_pipeline/test_samples/dicom/00b4e593-fcf8-488c-ae55-751034e26f16.dcm"
)

# ==========================================
# EXTRACT METADATA
# ==========================================

print("\n========== DICOM METADATA ==========\n")

metadata = extract_dicom_metadata(
    str(dicom_path)
)

for key, value in metadata.items():
    print(f"{key}: {value}")

print("\n====================================\n")

# ==========================================
# LOAD DICOM IMAGE
# ==========================================

print("[1] Loading DICOM image...")

image = load_dicom_image(
    str(dicom_path)
)

# ==========================================
# PREPROCESS IMAGE
# ==========================================

print("[2] Preprocessing image...")

processed_image = preprocess_image(image)

# ==========================================
# LOAD MODEL
# ==========================================

print("[3] Loading TorchXRayVision model...")

model = load_xray_model()

# ==========================================
# RUN INFERENCE
# ==========================================

print("[4] Running inference...")

predictions, image_tensor = run_inference(
    model,
    processed_image
)

# ==========================================
# GENERATE PRIMARY FINDINGS
# ==========================================

print("[5] Generating primary findings...")

findings = generate_findings(predictions)

# ==========================================
# GENERATE GRADCAM HEATMAP
# ==========================================

print("[6] Generating evidence localization heatmap...")

if findings:

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

    patient_id = metadata["PatientID"]

    study_date = metadata["StudyDate"]

    heatmap_filename = (
        f"{patient_id}_{study_date}_heatmap.png"
    )

    heatmap_path = (
        "ai_pipeline/outputs/heatmaps/"
        + heatmap_filename
    )

    save_heatmap(
        image,
        cam,
        heatmap_path
    )

    print(
        f"Heatmap saved to: {heatmap_path}"
    )

# ==========================================
# GENERATE STRUCTURED REPORT
# ==========================================

print("[7] Generating structured report...")

report = generate_structured_report(
    findings
)

# ==========================================
# DISPLAY REPORT
# ==========================================

print("\n========== STRUCTURED FINDINGS ==========\n")

for finding in report["findings"]:
    print(f"- {finding}")

print("\n========== IMPRESSION ==========\n")

print(report["impression"])

print("\n========================================\n")