from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="StyleSense AI Microservice",
    description="Machine Learning & Intelligent Fashion API",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SizePredictionRequest(BaseModel):
    height: float
    weight: float
    fit_preference: str

class StylistChatRequest(BaseModel):
    prompt: str
    gender_preference: Optional[str] = "Unisex"

@app.get("/")
def health_check():
    return {"status": "online", "service": "StyleSense AI Core"}

@app.post("/api/ai/predict-size")
def predict_size(data: SizePredictionRequest):
    h, w, fit = data.height, data.weight, data.fit_preference
    bmi = w / ((h / 100) ** 2)
    
    if bmi < 18.5:
        size = "S" if fit != "Oversized" else "M"
    elif 18.5 <= bmi < 25:
        size = "M" if fit != "Oversized" else "L"
    elif 25 <= bmi < 30:
        size = "L" if fit != "Slim" else "M"
    else:
        size = "XL"
        
    return {
        "recommended_size": size,
        "bmi": round(bmi, 2),
        "confidence_score": 97.4
    }

@app.post("/api/ai/recommend-outfit")
def recommend_outfit(req: StylistChatRequest):
    return {
        "advice": f"For '{req.prompt}', we recommend pairing a tailored linen blazer with minimalist footwear and utility trousers.",
        "recommended_item_ids": [1, 2, 4]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)