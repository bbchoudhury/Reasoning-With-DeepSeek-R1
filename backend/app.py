from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import query_deepseek_r1

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReasoningRequest(BaseModel):
    prompt: str

@app.post("/reason")
async def get_reasoning_response(request: ReasoningRequest):
    """
    API endpoint to get a reasoning response from DeepSeek R1.
    """
    result = query_deepseek_r1(request.prompt)
    return {"response": result}
