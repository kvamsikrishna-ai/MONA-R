import pydicom


def extract_dicom_metadata(dicom_path):

    dicom = pydicom.dcmread(
        dicom_path
    )

    metadata = {

        "PatientName":

            str(
                dicom.get(
                    "PatientName",
                    "Unknown"
                )
            ),

        "PatientID":

            str(
                dicom.get(
                    "PatientID",
                    "Unknown"
                )
            ),

        "PatientAge":

            str(
                dicom.get(
                    "PatientAge",
                    "Unknown"
                )
            ),

        "PatientSex":

            str(
                dicom.get(
                    "PatientSex",
                    "Unknown"
                )
            ),

        "StudyDate":

            str(
                dicom.get(
                    "StudyDate",
                    "Unknown"
                )
            ),

        "ViewPosition":

            str(
                dicom.get(
                    "ViewPosition",
                    "Unknown"
                )
            ),

        "Modality":

            str(
                dicom.get(
                    "Modality",
                    "Unknown"
                )
            ),

        "Rows":

            int(
                dicom.get(
                    "Rows",
                    0
                )
            ),

        "Columns":

            int(
                dicom.get(
                    "Columns",
                    0
                )
            ),
    }

    return metadata