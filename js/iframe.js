window.onload = () => {
  const form = document.getElementById('chat-form');
  const message = document.getElementById('message');
  const sendBtn = document.getElementsByClassName('btn');

  setTimeout(() => {
    parent.postMessage(
      `[system] - ${window.name} joined the conversation.`,
      '*'
    );
  }, 225);

  // sending message to parent 
  form.addEventListener('submit', event => {
    event.preventDefault();
    // don't send empty messages
    if (message.value !== '') {
      const name = window.name;
      parent.postMessage(`${name}: ${message.value}`, '*');
      message.value = '';
      // Disable button again after submit
      sendBtn.classList.remove('ready');
    }
  });

  // Array of messages from everyone sent back down here from parent window
  window.addEventListener(
    'message',
    event => {
      const output = document.getElementById('output');
      output.innerHTML = event.data.join('<br>');
    },
    false
  );
}
