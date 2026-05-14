import pydicom
import numpy as np


def load_dicom_image(dicom_path):

    dicom = pydicom.dcmread(dicom_path)

    image = dicom.pixel_array.astype(np.float32)

    # Normalize to 0-255
    image = image - np.min(image)

    image = image / (np.max(image) + 1e-8)

    image = image * 255.0

    return image.astype(np.uint8)