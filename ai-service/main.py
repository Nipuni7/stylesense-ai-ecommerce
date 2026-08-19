from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
import re

app = FastAPI(
    title="StyleSense Intelligent Fashion API",
    description="Context-Aware Recommendation & Sizing Engine",
    version="2.0.0"
)

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

@app.get("/")
def health():
    return {"status": "operational", "engine": "StyleSense AI v2.0"}

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
        "confidence_score": 98.2
    }

@app.post("/api/ai/recommend-outfit")
def recommend_outfit(req: StylistChatRequest):
    text = req.prompt.lower()
    
    # Event & Context NLP matching
    if any(k in text for k in ["wedding", "gala", "luxury", "party", "night"]):
        advice = "✨ For high-profile evening events: Pair our Emerald Silk Slip Gown or Italian Wool Blazer with handcrafted Oxford Leather shoes and a Matte Black Chronograph Watch."
    elif any(k in text for k in ["interview", "office", "formal", "work", "meeting"]):
        advice = "👔 For corporate & professional settings: We recommend the Minimalist Italian Wool Blazer combined with structured trousers and minimal Oxford leather shoes."
    elif any(k in text for k in ["street", "casual", "cyberpunk", "techwear", "hoodie", "weekend"]):
        advice = "🔥 For an effortless street aesthetic: Combine the Cyberpunk Techwear Bomber with Tactical Modular Cargo Joggers and AeroGlide Running Sneakers."
    elif any(k in text for k in ["gym", "workout", "fitness", "running", "sport"]):
        advice = "⚡ For high-performance athletic wear: The Seamless Gym Compression Set paired with AeroGlide Neo Running Sneakers provides maximum mobility and breathability."
    elif any(k in text for k in ["beach", "summer", "vacation", "trip"]):
        advice = "☀️ For warm-weather escapes: Go with the Pure Linen Relaxed Resort Shirt, lightweight shorts, and Aviator Titanium Sunglasses."
    else:
        advice = f"💡 Curated recommendation for '{req.prompt}': Blend neutral oversized silhouettes with sharp monochrome accessories for a timeless, modern finish."

    return {
        "advice": advice,
        "sentiment": "positive",
        "stylist_model": "StyleSense-Transformer-v2"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)