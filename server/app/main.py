from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.llm import generate_response
from app.parser import validate_response
from app.schemas import ShapesResponse

# Initialize app
app = FastAPI()

# CORS (allow frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your Vercel URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class Query(BaseModel):
    query: str

# ✅ Health check route (IMPORTANT)
@app.get("/")
def home():
    return {"message": "Backend is running"}

# ✅ Main API endpoint
@app.post("/userquery", response_model=ShapesResponse)
def process_query(data: Query):
    try:
        # Generate shapes from query
        result = generate_response(data.query)

        # Validate response structure
        validated = validate_response(result)

        return validated

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))