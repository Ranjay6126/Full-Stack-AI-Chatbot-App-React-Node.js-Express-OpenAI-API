const chatEl = document.getElementById('chat');
const msgEl = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, role) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${role}`;
  msgDiv.textContent = text;
  chatEl.appendChild(msgDiv);
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function sendMessage() {
  const message = msgEl.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  msgEl.value = '';
  sendBtn.disabled = true;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      addMessage('Error from server. Please try again.', 'bot');
    } else {
      const data = await response.json();
      addMessage(data.reply || 'No response.', 'bot');
    }
  } catch (err) {
    addMessage('Network error, please check your connection.', 'bot');
    console.error(err);
  } finally {
    sendBtn.disabled = false;
    msgEl.focus();
  }
}

sendBtn.addEventListener('click', sendMessage);
msgEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});
