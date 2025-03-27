const messages = {
    "Happy": [
        { text: "You're radiating positivity! 🌞", bg: "images/happy1.jpg", music: "music/happy1.mp3" },
        { text: "Enjoy every moment! 🎉", bg: "images/happy2.jpg", music: "music/happy2.mp3" },
        { text: "Keep smiling, it suits you! 😊", bg: "images/happy3.jpg", music: "music/happy3.mp3" }
    ],
    "Sad": [
        { text: "It's okay to feel sad, take your time. 💙", bg: "images/sad1.jpg", music: "music/sad1.mp3" },
        { text: "You're not alone, keep going. 🌟", bg: "images/sad2.jpg", music: "music/sad2.mp3" },
        { text: "Better days are ahead! 🌈", bg: "images/sad3.jpg", music: "music/sad3.mp3" }
    ],
    "Stressed": [
        { text: "Take a deep breath, you got this! 🌿", bg: "images/stressed1.jpg", music: "music/stressed1.mp3" },
        { text: "Relax, one step at a time. ✨", bg: "images/stressed2.jpg", music: "music/stressed2.mp3" },
        { text: "You are strong and capable! 💪", bg: "images/stressed3.jpg", music: "music/stressed3.mp3" }
    ],
    "Excited": [
        { text: "Your energy is contagious! 🎆", bg: "images/excited1.jpg", music: "music/excited1.mp3" },
        { text: "Let your enthusiasm shine! 🔥", bg: "images/excited2.jpg", music: "music/excited2.mp3" },
        { text: "Enjoy the adventure ahead! 🌍", bg: "images/excited3.jpg", music: "music/excited3.mp3" }
    ],
    "Tired": [
        { text: "Rest is important, take a break. 💤", bg: "images/tired1.jpg", music: "music/tired1.mp3" },
        { text: "Recharge and come back stronger! ⚡", bg: "images/tired2.jpg", music: "music/tired2.mp3" },
        { text: "You've done great, now relax! 🌸", bg: "images/tired3.jpg", music: "music/tired3.mp3" }
    ]
};

let currentAudio = new Audio();

function generateMessage() {
    let mood = document.getElementById("mood-select").value;
    let messageBox = document.getElementById("message-box");
    let background = document.getElementById("background");

    if (mood) {
        let randomIndex = Math.floor(Math.random() * messages[mood].length);
        let selectedMessage = messages[mood][randomIndex];
        
        messageBox.textContent = selectedMessage.text;
        messageBox.style.opacity = "1";
        background.style.background = `url('${selectedMessage.bg}') no-repeat center center/cover`;
        
        changeMusic(selectedMessage.music);
    } else {
        stopMusic();
        messageBox.style.opacity = "0";
    }
}

function changeMusic(musicFile) {
    currentAudio.pause();
    currentAudio.src = musicFile;
    currentAudio.volume = 0.6;
    currentAudio.loop = true;
    currentAudio.play();
}

function stopMusic() {
    currentAudio.pause();
    currentAudio.currentTime = 0;
}

document.getElementById("theme-toggle").addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
});