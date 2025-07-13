from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import get_bot_response
from sentiment import get_sentiment
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # untuk dev, bisa dibatasi nanti
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str

@app.post("/chat")
def chat(message: Message):
    user_input = message.text
    bot_reply = get_bot_response(user_input)
    sentiment = get_sentiment(user_input)
    return {
        "reply": bot_reply,
        "sentiment": sentiment
    }
