let questions=[{'role': 'system', 'content': 'Current model: gpt-3.5-turbo-1106\n\nyou are a Chinese assistant, you should speak chinese.'},]

function sendMessage() {
  var userInput = document.getElementById('user-input').value;
  if (userInput.trim() === '') {
    return;
  }
  var chatBox = document.getElementById('chat-box');
  var message = document.createElement('div');
  message.className = 'message sent';
  message.textContent = userInput;
  console.log(userInput)
  chatBox.appendChild(message);
  questions.push({'role': 'user', 'content': userInput})
  ask(questions).then(data => get_retuen(data))
  console.log(questions)


}

document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function put_message(mes) {
  var reply = document.createElement('div');
  var chatBox = document.getElementById('chat-box');
  reply.className = 'message received';
  reply.textContent = mes;
  chatBox.appendChild(reply);

  document.getElementById('user-input').value = '';
}

async function ask(message) {
  try {
    const response = await fetch('https://api.chatanywhere.tech/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-4IgcGKxdHFHWUBc8rayvmQbH6WVZz3YgvZax324kGIh5asAq',
      },
      body: JSON.stringify({
        'messages': message,
        'model': 'gpt-3.5-turbo-1106',
        'temperature': 0.01,
        'top_p': 1,
      }),
    });
    const data = await response.json();
    return data["choices"][0]["message"];
  } catch (error) {
    console.error('Error:', error);
  }
}

function get_retuen(data){
  questions.push(data);
  put_message(data["content"])
}