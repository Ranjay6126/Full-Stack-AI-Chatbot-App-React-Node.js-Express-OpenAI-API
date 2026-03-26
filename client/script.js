const chatEl = document.getElementById('chat');
const msgEl = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const statusEl = document.getElementById('status');

function setStatus(text) {
  statusEl.textContent = text;
}

function addMessage(text, role) {
  if (chatEl.querySelector('.empty')) {
    chatEl.innerHTML = '';
  }

  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${role}`;
  msgDiv.textContent = text;
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
  msgEl.value = '';
  sendBtn.disabled = true;
  setStatus('Thinking ...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const errorText = await response.text();
      addMessage(`Server error: ${errorText || 'Unknown error'}`, 'bot');
      setStatus('Error occurred. Try again.');
    } else {
      const data = await response.json();
      addMessage(data.reply || 'No response returned.', 'bot');
      setStatus('Ready');
    }
  } catch (err) {
    addMessage('Network error, please check your connection.', 'bot');
    console.error(err);
    setStatus('Offline / request failed');
  } finally {
    sendBtn.disabled = false;
    msgEl.focus();
  }
}

sendBtn.addEventListener('click', sendMessage);
msgEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

