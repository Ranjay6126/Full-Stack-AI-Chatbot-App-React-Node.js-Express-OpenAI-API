require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
app.use(express.json());
app.use(cors());

const openaiKey = process.env.OPENAI_API_KEY;
if (!openaiKey) {
  console.warn('Warning: Missing OPENAI_API_KEY in environment variables. API calls will fail.');
}

const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

app.use(express.static(path.join(__dirname, 'client')));

app.post('/api/chat', async (req, res) => {
  if (!openai) {
    return res.status(500).json({ error: 'OpenAI API key is missing. Please set it in the .env file.' });
  }
  try {
    const { message, history } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const conversation = [
      { role: 'system', content: 'You are a helpful AI chatbot.' },
      ...(Array.isArray(history) ? history : []),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversation,
      max_tokens: 300,
      temperature: 0.7
    });

    const botReply = completion.choices[0]?.message?.content?.trim();
    if (!botReply) {
      return res.status(500).json({ error: 'OpenAI returned an empty response.' });
    }

    const updatedHistory = [...(Array.isArray(history) ? history : []),
      { role: 'user', content: message },
      { role: 'assistant', content: botReply }
    ];

    return res.json({ reply: botReply, history: updatedHistory });
  } catch (err) {
    console.error('OpenAI request failed:', err);

    if (err instanceof Error && err.message) {
      return res.status(500).json({ error: `AI request failed: ${err.message}` });
    }

    return res.status(500).json({ error: 'AI request failed.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
  console.log(`Accessible at http://localhost:${port} or your network IP`);
});
