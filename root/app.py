import os
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Define the URL of the ChatGPT API
API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions"

# Function to make a request to ChatGPT
def request_chatgpt(prompt):
    api_key = os.environ.get("OPENAI_API_KEY")
    headers = {
        "Authorization": f"Bearer {api_key}",
    }
    data = {
        "prompt": f"In astrophysics, {prompt}",  # Add "In astrophysics" prefix
        "max_tokens": 50,  # Adjust as needed
    }

    response = requests.post(API_URL, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()["choices"][0]["text"]
    else:
        return "Error communicating with ChatGPT."

@app.route("/ask", methods=["POST"])
def ask():
    if request.method == "POST":
        data = request.json
        user_input = data.get("input")
        if user_input:
            response = request_chatgpt(user_input)
            return jsonify({"response": response})

if __name__ == "__main__":
    app.run()
