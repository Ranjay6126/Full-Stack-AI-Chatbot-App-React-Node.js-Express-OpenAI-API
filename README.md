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
2. Set `OPENAI_API_KEY`.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000`.

---

## ⚙️ Run development

- `npm run dev` (with nodemon auto-restart)

---

## 💡 Notes

- Replace the model in `server.js` with `gpt-4o` / `gpt-4.1` if your account has access.
- Keep `.env` secret and out of source control.
 
