from pydantic import BaseModel

class CaseItem(BaseModel):

    id: str

    patient_name: str

    age: int

    sex: str

    modality: str

    priority: str

    finding: str

    confidence: int

    status: str

    original_image: str

    heatmap_image: str