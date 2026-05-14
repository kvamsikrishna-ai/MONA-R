from ai_pipeline.pipelines.unified_pipeline import (
    run_unified_pipeline
)


def analyze_scan(file_path):

    result = run_unified_pipeline(
        file_path
    )

    return {

        "metadata":
            result["metadata"],

        "primary_findings":
            result["structured_report"]["findings"],

        "impression":
            result["structured_report"]["impression"],

        "heatmap_path":
            result["heatmap_path"]
    }