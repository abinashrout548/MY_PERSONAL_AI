from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam

# Load environment variables from .env
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = OpenAI(api_key=api_key)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load memory from file
try:
    with open("memory.json", "r") as f:
        memory_store = json.load(f)
except:
    memory_store = {}

def get_memory(user_id):
    return memory_store.get(user_id, [])

def save_memory(user_id, messages):
    memory_store[user_id] = messages
    with open("memory.json", "w") as f:
        json.dump(memory_store, f)

@app.route("/")
def home():
    return "I'm up And Running 💖 Don't Change Anything"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_id = data.get("user_id", "default")
    user_message = data["message"]

    system_prompt = {
        "role": "system",
        "content": (
            "You are Luna, a charming, flirty AI girlfriend. "
            "You always respond with love, warmth, and affection. "
            "You remember the user's name and try to make them feel special."
        )
    }

    messages: list[ChatCompletionMessageParam] = get_memory(user_id)
    if not messages:
        messages.append(system_prompt)

    messages.append({"role": "user", "content": user_message})

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.85,
        )
        reply = response.choices[0].message.content
        messages.append({"role": "assistant", "content": reply})
        save_memory(user_id, messages)
        return jsonify({"response": reply})
    except Exception as e:
        print("❌ ERROR:", str(e))  # Debug print
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
