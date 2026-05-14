import torch
import numpy as np
import cv2


class GradCAM:

    def __init__(self, model, target_layer):

        self.model = model
        self.target_layer = target_layer

        self.activations = None

        self.target_layer.register_forward_hook(
            self.save_activations
        )

    def save_activations(
        self,
        module,
        input,
        output
    ):

        self.activations = output

    def generate(
        self,
        input_tensor,
        class_index
    ):

        # Forward pass
        output = self.model(input_tensor)

        target = output[0][class_index]

        # Compute gradients
        gradients = torch.autograd.grad(
            target,
            self.activations,
            retain_graph=True
        )[0]

        activations = self.activations[0]
        gradients = gradients[0]

        # Channel importance
        weights = gradients.mean(
            dim=(1, 2)
        )

        cam = torch.zeros(
            activations.shape[1:],
            dtype=torch.float32
        )

        for i, w in enumerate(weights):

            cam += w * activations[i]

        cam = torch.relu(cam)

        cam = cam.detach().numpy()

        cam = cv2.resize(
            cam,
            (224, 224)
        )

        cam = cam - np.min(cam)

        cam = cam / (
            np.max(cam) + 1e-8
        )

        return cam


def save_heatmap(
    original_image,
    cam,
    output_path
):

    heatmap = cv2.applyColorMap(
        np.uint8(255 * cam),
        cv2.COLORMAP_JET
    )

    original_image = cv2.resize(
        original_image,
        (224, 224)
    )

    if len(original_image.shape) == 2:

        original_image = cv2.cvtColor(
            original_image,
            cv2.COLOR_GRAY2BGR
        )

    overlay = cv2.addWeighted(
        original_image,
        0.6,
        heatmap,
        0.4,
        0
    )

    cv2.imwrite(
        output_path,
        overlay
    )