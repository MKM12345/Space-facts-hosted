function askQuestion() {
            const userInput = document.getElementById("user-input").value;
            const chatlog = document.getElementById("chatlog");

            // Display the user's input in the chatlog
            chatlog.innerHTML += `<p>User: ${userInput}</p>`;
            chatlog.scrollTop = chatlog.scrollHeight;

            fetch('https://replit.com/@arekhonshadow/InternationalFumblingSampler#main.py', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: userInput }),
            })
            .then(response => response.json())
            .then(data => {
                const responseText = data.response;
                // Display the chatbot's response in the chatlog
                chatlog.innerHTML += `<p>Chatbot: ${responseText}</p>`;
                chatlog.scrollTop = chatlog.scrollHeight;
            })
            .catch(error => {
                console.error('Error:', error);
                chatlog.innerHTML += '<p>An error occurred.</p>';
                chatlog.scrollTop = chatlog.scrollHeight;
            });
        }

        document.getElementById("submit-button").addEventListener("click", askQuestion)
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
