from pydantic import BaseModel
from typing import Dict, List, Optional


class AnalysisResponse(BaseModel):

    metadata: Dict

    primary_findings: List

    impression: str

    heatmap_path: Optional[str]