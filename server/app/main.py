from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.llm import generate_response
from app.parser import validate_response
from app.schemas import ShapesResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: str

@app.post("/userquery", response_model=ShapesResponse)
def process_query(data: Query):
    try:
        result = generate_response(data.query)
        validated = validate_response(result)
        return validated
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))