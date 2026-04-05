const chatEl = document.getElementById('chat');
const msgEl = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const statusEl = document.getElementById('status');

let chatHistory = [];

function setStatus(text) {
  statusEl.textContent = text;
}

function addMessage(text, role) {
  if (chatEl.querySelector('.empty')) {
    chatEl.innerHTML = '';
  }

  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${role}`;
  
  if (role === 'bot') {
    // Use marked for bot responses (Markdown support)
    msgDiv.innerHTML = marked.parse(text);
  } else {
    // Use textContent for user messages for safety
    msgDiv.textContent = text;
  }
  
  chatEl.appendChild(msgDiv);
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function sendMessage() {
  const message = msgEl.value.trim();
  if (!message) {
    setStatus('Type something first 😎');
    return;
  }

  addMessage(message, 'user');
  chatHistory.push({ role: 'user', content: message });
  msgEl.value = '';
  sendBtn.disabled = true;
  setStatus('Thinking ...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: chatHistory.slice(0, -1) }) // history without current message
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const errorMsg = data.error || `Server error: ${response.status}`;
      addMessage(`Error: ${errorMsg}`, 'bot');
      setStatus('Error occurred.');
      return;
    }

    const data = await response.json();
    if (data.error) {
      addMessage(`Error: ${data.error}`, 'bot');
      setStatus('AI error');
      return;
    }

    addMessage(data.reply || 'No response returned.', 'bot');
    if (Array.isArray(data.history)) {
      chatHistory = data.history;
    } else {
      chatHistory.push({ role: 'assistant', content: data.reply || '...' });
    }

    setStatus('Ready');
  } catch (err) {
    addMessage('Network error, please check your connection.', 'bot');
    console.error(err);
    setStatus('Offline / request failed');
  } finally {
    sendBtn.disabled = false;
    msgEl.focus();
  }
}

function clearChat() {
  chatEl.innerHTML = '<div class="empty">Type a message below to start the conversation.</div>';
  chatHistory = [];
  setStatus('Chat cleared');
  setTimeout(() => setStatus('Ready'), 2000);
}

sendBtn.addEventListener('click', sendMessage);
clearBtn.addEventListener('click', clearChat);
msgEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

