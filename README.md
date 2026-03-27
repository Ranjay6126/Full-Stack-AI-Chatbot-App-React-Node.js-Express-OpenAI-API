# 🤖 Full-Stack AI Chatbot Web App

A modern Full-Stack AI Chatbot application built using a simple frontend + Node.js + Express backend. This project integrates the OpenAI API to provide intelligent conversational responses.

---

## 🚀 Features

- Real-time AI chat responses
- Clean responsive UI
- REST API built with Node.js and Express
- Secure API key handling on server-side
- Conversation history maintained during session

---

## 🛠 Tech Stack

- Node.js
- Express
- OpenAI API
- Vanilla HTML/CSS/JavaScript frontend

---

## 📦 Files

- `server.js`: Express web server and OpenAI API handler
- `client/index.html`: simple chat UI
- `client/script.js`: frontend fetch + render logic
- `.env.example`: configure your OpenAI API key
- `package.json`: dependencies + scripts

---

## 🚀 Setup

1. Copy `.env.example` to `.env`.
2. Set `OPENAI_API_KEY` with your OpenAI API key.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000` or your network IP address.

The server binds to 0.0.0.0, so it's accessible from other devices on your network at `http://<your-ip>:3000`.

## 🌐 API Access

The API endpoint `/api/chat` is accessible from anywhere due to CORS configuration. You can make POST requests to `http://<your-server-ip>:3000/api/chat` with JSON body `{"message": "your message"}`.

For public internet access, deploy to a cloud platform like Heroku, Vercel, or Railway.

---

## ⚙️ Run development

- `npm run dev` (with nodemon auto-restart)

---

## 💡 Notes

- Replace the model in `server.js` with `gpt-4o` / `gpt-4.1` if your account has access.
- Keep `.env` secret and out of source control.
 
