# 💖 MY_PERSONAL_AI – AI Companion

Welcome to **MY_PERSONAL_AI**, your playful, romantic AI chat app inspired by Candy.ai. Luna, your virtual girlfriend, is powered by OpenAI’s GPT, designed to respond with warmth, sass, charm, and a hint of mystery.

---

## 🌟 Features

- 💬 Real-time flirty chat with emotional depth
- 🧠 OpenAI GPT integration for lifelike responses
- 🖼️ Custom character avatar with animated typing effects
- 🎤 (Optional) Voice input/output support
- 🌙 Beautiful dark mode UI with modern design
- 🔒 Secure `.env`-based API key management

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Python + Flask
- **AI:** OpenAI GPT API (Luna’s brain)

---

## 🗂️ Folder Structure

MY_PERSONAL_AI/ ├── backend/ │ ├── app.py │ ├── routes/ │ ├── .env # ← contains your API key (not committed) │ └── requirements.txt ├── frontend/ │ ├── public/ │ ├── src/ │ └── vite.config.js ├── README.md └── .gitignore

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/abinashrout548/MY_PERSONAL_AI.git
cd MY_PERSONAL_AI
2. Backend Setup (Flask)
bash
Copy
Edit
cd backend
python -m venv venv
venv\Scripts\activate         # On Windows
pip install -r requirements.txt
Create .env in backend/

ini
Copy
Edit
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
Run the server:

bash
Copy
Edit
python app.py
3. Frontend Setup (React)
bash
Copy
Edit
cd frontend
npm install
npm run dev
Access the app: http://localhost:3000

📦 Deployment Ready
You can deploy the frontend separately on platforms like Vercel, Netlify, and the backend on Render, Railway, or Heroku.

⚠️ GitHub Push Notes
Don’t commit your .env file

If a secret gets exposed:

Remove the file

Regenerate your API key on OpenAI

Clean the commit history:
git rebase -i HEAD~n + git push --force

🧠 Powered By
OpenAI
React.js
Flask
Vite
Tailwind CSS

🧑‍💻 Author
Made with ❤️ by Abinash Rout

