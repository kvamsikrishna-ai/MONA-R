import cv2
import numpy as np
import torchxrayvision as xrv


def preprocess_image(image):

    # Resize
    image = cv2.resize(image, (224, 224))

    # Convert to float
    image = image.astype(np.float32)

    # Normalize using TorchXRayVision utility
    image = xrv.datasets.normalize(image, 255)

    return image