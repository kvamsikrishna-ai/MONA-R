from PIL import Image
import numpy as np


def load_png_image(image_path):
    image = Image.open(image_path).convert("L")
    image = np.array(image)

    return image