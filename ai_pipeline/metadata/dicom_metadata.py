import pydicom


def extract_dicom_metadata(dicom_path):

    dicom = pydicom.dcmread(dicom_path)

    metadata = {

        "PatientAge":
            str(dicom.get("PatientAge", "Unknown")),

        "PatientSex":
            str(dicom.get("PatientSex", "Unknown")),

        "ViewPosition":
            str(dicom.get("ViewPosition", "Unknown")),

        "Modality":
            str(dicom.get("Modality", "Unknown"))
    }

    return metadata