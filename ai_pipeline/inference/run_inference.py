import torch
import numpy as np


def run_inference(model, image):

    image = np.expand_dims(image, axis=0)
    image = np.expand_dims(image, axis=0)

    image_tensor = torch.from_numpy(image).float()

    # IMPORTANT:
    # GradCAM requires gradients
    image_tensor.requires_grad = True

    outputs = model(image_tensor)

    predictions = {}

    for pathology, score in zip(
        model.pathologies,
        outputs.detach().numpy()[0]
    ):
        predictions[pathology] = float(score)

    return predictions, image_tensor