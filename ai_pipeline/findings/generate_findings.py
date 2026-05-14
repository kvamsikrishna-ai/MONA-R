def generate_findings(
    predictions,
    threshold=0.56,
    max_findings=2
):

    filtered = {
        pathology: score
        for pathology, score in predictions.items()
        if score >= threshold
    }

    sorted_findings = sorted(
        filtered.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return sorted_findings[:max_findings]