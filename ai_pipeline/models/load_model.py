import torchxrayvision as xrv


def load_xray_model():

    model = xrv.models.DenseNet(
        weights="densenet121-res224-all"
    )

    model.eval()

    return model