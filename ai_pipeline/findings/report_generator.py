def generate_structured_report(findings):

    if not findings:
        return {
            "findings": [
                "Cardiomediastinal silhouette is within normal limits.",
                "No focal air-space consolidation.",
                "No pleural effusion or pneumothorax."
            ],
            "impression":
                "No acute cardiopulmonary abnormality."
        }

    findings_text = []

    impression_text = []

    findings_map = {

        "Cardiomegaly":
            "Mild enlargement of the cardiac silhouette noted.",

        "Effusion":
            "Small pleural effusion detected.",

        "Pneumonia":
            "Patchy pulmonary infiltrative opacity identified.",

        "Mass":
            "Suspicious pulmonary mass-like opacity identified.",

        "Nodule":
            "Small pulmonary nodular opacity detected.",

        "Pneumothorax":
            "Findings suspicious for pneumothorax.",

        "Edema":
            "Diffuse pulmonary edema pattern noted.",

        "Fibrosis":
            "Fibrotic changes noted within bilateral lung fields.",

        "Lung Opacity":
            "Focal lung opacity identified.",

        "Atelectasis":
            "Mild subsegmental atelectatic changes noted.",

        "Pleural_Thickening":
            "Pleural thickening identified.",

        "Infiltration":
            "Patchy pulmonary infiltrative changes detected.",

        "Emphysema":
            "Hyperinflation and emphysematous changes noted."
    }

    for pathology, score in findings:

        sentence = findings_map.get(
            pathology,
            f"{pathology} detected."
        )

        findings_text.append(sentence)

    top_pathology = findings[0][0]

    impression_map = {

        "Cardiomegaly":
            "Mild cardiomegaly.",

        "Effusion":
            "Small pleural effusion.",

        "Pneumonia":
            "Pulmonary infiltrative opacity suspicious for pneumonia.",

        "Mass":
            "Suspicious pulmonary mass-like lesion.",

        "Nodule":
            "Small pulmonary nodular opacity.",

        "Pneumothorax":
            "Findings suspicious for pneumothorax.",

        "Edema":
            "Pulmonary edema pattern.",

        "Fibrosis":
            "Chronic fibrotic pulmonary changes.",

        "Lung Opacity":
            "Focal pulmonary opacity.",

        "Atelectasis":
            "Mild subsegmental atelectatic changes."
    }

    impression_text.append(
        impression_map.get(
            top_pathology,
            f"{top_pathology} detected."
        )
    )

    return {
        "findings": findings_text,
        "impression": " ".join(impression_text)
    }