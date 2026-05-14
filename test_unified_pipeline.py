from ai_pipeline.pipelines.unified_pipeline import (
    run_unified_pipeline
)


# ==========================================
# TEST INPUT
# ==========================================

file_path = (
    "ai_pipeline/test_samples/dicom/00dddf53-486f-4098-9a5e-b7d0b8ee2b8f.dcm"
)

# PNG example:
# file_path = (
#     "ai_pipeline/test_samples/image.png"
# )

result = run_unified_pipeline(
    file_path
)