# Miran World AI / ML API Task

## 🚀 Overview
This project converts natural language drawing instructions into structured JSON and visualizes them.

## 🧠 Features
- FastAPI backend
- LLM abstraction layer (mocked)
- Geometry logic (incircle calculation)
- React + Tailwind frontend
- Dynamic SVG rendering

## 📌 API Endpoint
POST /userquery

### Sample Request
{
  "query": "Draw right angle triangle and circle touching all sides"
}

### Sample Response
{
  "shapes": [...]
}

## 🛠 Tech Stack
- Python (FastAPI)
- React (Vite)
- Tailwind CSS

## ▶️ How to Run

### Backend
cd server
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## 💡 Notes
- LLM is mocked for cost efficiency
- Easily replaceable with OpenAI API
- Includes fallback + validation logic