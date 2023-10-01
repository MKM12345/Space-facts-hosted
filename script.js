const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="chatlog"></div></body></html>');

global.window = dom.window;
global.document = dom.window.document;

const apiKey = process.env.OPENAI_API_KEY;
const chatlog = document.getElementById('chatlog');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
    const userQuestion = userInput.value;
    const formattedQuestion = `Astrophysics Question/Space Question: ${userQuestion}`; // Format the question
    appendUserQuestion(formattedQuestion); // Append the formatted question
    fetchAnswer(formattedQuestion); // Send the formatted question to ChatGPT
    userInput.value = '';
});

function appendUserQuestion(question) {
    appendMessage('You', question); // Append the formatted question to the chat log
}
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatlog.appendChild(messageElement);
}

function appendBotResponse(response) {
    const responseElement = document.createElement('div');
    responseElement.classList.add('typing'); // Add typing animation class
    responseElement.textContent = `ChatGPT: ${response}`;
    chatlog.appendChild(responseElement);
    scrollToBottom(); // Scroll to the bottom of the chatlog
}

function scrollToBottom() {
    chatlog.scrollTop = chatlog.scrollHeight;
}

async function fetchAnswer(question) {
    appendBotResponse('Thinking...'); // Display typing animation
    try {
        const response = await getChatGPTResponse(question);
        replaceTypingWithResponse(response);
    } catch (error) {
        console.error(error);
        replaceTypingWithResponse('Sorry, there was an error. Please try again.');
    }
}

async function getChatGPTResponse(question) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: `In astrophysics, ${question}`,
            max_tokens: 50, // Adjust the token limit as needed
        }),
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}

function replaceTypingWithResponse(response) {
    // Remove the typing animation class and replace text content
    const typingElements = document.querySelectorAll('.typing');
    const lastTypingElement = typingElements[typingElements.length - 1];
    lastTypingElement.classList.remove('typing');
    lastTypingElement.textContent = `ChatGPT: ${response}`;
    scrollToBottom(); // Scroll to the bottom to show the response
}
const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark"
};

const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);
}

document.getElementById('themeButton').onclick = toggleTheme;
