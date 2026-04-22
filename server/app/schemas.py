from pydantic import BaseModel
from typing import List, Optional, Union

class Triangle(BaseModel):
    type: str = "triangle"
    triangle_type: str
    points: List[List[float]]

class Circle(BaseModel):
    type: str = "circle"
    center: List[float]
    radius: float
    touches: Optional[str] = None

class ShapesResponse(BaseModel):
    shapes: List[Union[Triangle, Circle]]