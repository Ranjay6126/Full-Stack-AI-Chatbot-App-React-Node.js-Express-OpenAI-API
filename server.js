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
  console.error('Missing OPENAI_API_KEY in environment variables.');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: openaiKey });

app.use(express.static(path.join(__dirname, 'client')));

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful AI chatbot.' },
        { role: 'user', content: message }
      ],
      max_tokens: 250,
      temperature: 0.7
    });

    const botReply = completion.choices[0]?.message?.content?.trim();
    return res.json({ reply: botReply || 'Sorry, I could not generate a response.' });
  } catch (err) {
    console.error('OpenAI request failed:', err);
    return res.status(500).json({ error: 'AI request failed.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
