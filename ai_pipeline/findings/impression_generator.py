def generate_impression(findings):

    # NORMAL CASE
    if not findings:
        return (
            "Cardiomediastinal silhouette is within normal limits. "
            "No focal air-space consolidation, pleural effusion, or pneumothorax."
        )

    top_finding, top_score = findings[0]

    impressions_map = {

        "Cardiomegaly":
            "Mild enlargement of the cardiac silhouette.",

        "Effusion":
            "Small pleural effusion detected.",

        "Pneumonia":
            "Patchy pulmonary infiltrative opacity detected.",

        "Mass":
            "Suspicious pulmonary mass-like opacity detected.",

        "Nodule":
            "Small pulmonary nodular opacity detected.",

        "Pneumothorax":
            "Findings suspicious for pneumothorax.",

        "Edema":
            "Diffuse pulmonary edema pattern detected.",

        "Fibrosis":
            "Fibrotic changes noted within the lung fields.",

        "Lung Opacity":
            "Focal lung opacity detected.",

        "Atelectasis":
            "Mild subsegmental atelectatic changes detected.",

        "Pleural_Thickening":
            "Pleural thickening noted.",

        "Infiltration":
            "Patchy pulmonary infiltrative changes detected.",

        "Emphysema":
            "Hyperinflation and emphysematous changes noted."
    }

    return impressions_map.get(
        top_finding,
        f"{top_finding} detected."
    )