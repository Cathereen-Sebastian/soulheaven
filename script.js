const API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API Key

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatbox = document.getElementById("chatbox");

    // Add user message to chatbox
    const userMessage = `<div class="user-message">${userInput}</div>`;
    chatbox.innerHTML += userMessage;

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: userInput,
                temperature: 0.7,
                max_tokens: 100
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();

        // Add bot response
        chatbox.innerHTML += `<div class="bot-message">${botMessage}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll

        // Speak bot response
        speak(botMessage);
    } catch (error) {
        console.error("Error:", error);
        chatbox.innerHTML += `<div class="bot-message">Sorry, I can't respond right now.</div>`;
    }

    document.getElementById("user-input").value = ""; // Clear input
}

// Voice Output (Bot Speaking)
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// Voice Input (User Speaking)
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
        document.getElementById("user-input").value = event.results[0][0].transcript;
    };

    recognition.start();
}

// Dark Mode Toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Music Toggle
const music = document.getElementById("bg-music");
document.getElementById("music-toggle").addEventListener("click", () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});
