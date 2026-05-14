import cv2

from ai_pipeline.segmentation.gradcam import (
    GradCAM,
    save_heatmap
)
from ai_pipeline.preprocessing.png_loader import load_png_image
from ai_pipeline.preprocessing.preprocess import preprocess_image

from ai_pipeline.models.load_model import load_xray_model
from ai_pipeline.inference.run_inference import run_inference

from ai_pipeline.findings.generate_findings import generate_findings
from ai_pipeline.findings.report_generator import generate_structured_report


def run_pipeline(image_path):

    print("\n==============================")
    print(" MONA-R CHEST X-RAY PIPELINE ")
    print("==============================\n")

    # STEP 1 — Load Image
    print("[1] Loading image...")
    image = load_png_image(image_path)

    # STEP 2 — Preprocess Image
    print("[2] Preprocessing image...")
    processed_image = preprocess_image(image)

    # STEP 3 — Load AI Model
    print("[3] Loading TorchXRayVision model...")
    model = load_xray_model()

    # STEP 4 — Run Inference
    print("[4] Running inference...")
    predictions, image_tensor = run_inference(
        model,
        processed_image
    )

    # STEP 5 — Generate Primary Findings
    print("[5] Generating primary findings...")
    findings = generate_findings(predictions)
    # STEP 6 — Generate GradCAM Heatmap
    print("[6] Generating evidence localization heatmap...")

    top_finding = findings[0][0]

    class_index = model.pathologies.index(top_finding)

    target_layer = model.features[-1]

    gradcam = GradCAM(model, target_layer)

    cam = gradcam.generate(
        image_tensor,
        class_index
    )

    original_image = cv2.imread(
        image_path,
        cv2.IMREAD_GRAYSCALE
    )

    heatmap_path = (
        "ai_pipeline/outputs/heatmaps/"
        "heatmap.png"
    )

    save_heatmap(
        original_image,
        cam,
        heatmap_path
    )

    # STEP 6 — Generate Structured Report
    print("[7] Generating structured report...")
    report = generate_structured_report(findings)

    # FINAL OUTPUT
    print("\n========== STRUCTURED FINDINGS ==========\n")

    for finding in report["findings"]:
        print(f"- {finding}")

    print("\n========== IMPRESSION ==========\n")

    print(report["impression"])

    print("\n======================================\n")

    return {
        "raw_predictions": predictions,
        "primary_findings": findings,
        "structured_report": report
    }