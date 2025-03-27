// Elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const playMusicBtn = document.getElementById('play-music-btn');
const meditationMusic = document.getElementById('meditation-music');
const notificationSound = document.getElementById('notification-sound');

let timerInterval;
let totalTime = 0;
let isPlaying = false;

// Update Timer Display
function updateDisplay(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Validate Input
function validateInput(input) {
    return Math.max(0, parseInt(input) || 0);
}

// Start Timer
startBtn.addEventListener('click', () => {
    if (timerInterval) return;

    let minutes = validateInput(minutesInput.value);
    let seconds = validateInput(secondsInput.value);
    totalTime = minutes * 60 + seconds;

    if (totalTime <= 0) {
        alert('⏳ Please enter a valid time.');
        return;
    }

    minutesInput.disabled = true;
    secondsInput.disabled = true;
    startBtn.disabled = true;

    timerInterval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            triggerEndSound();
            resetTimer();
        } else {
            totalTime--;
            updateDisplay(totalTime);
        }
    }, 1000);
});

// Play Notification Sound When Timer Ends
function triggerEndSound() {
    notificationSound.play();
}

// Reset Timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startBtn.disabled = false;
    updateDisplay(0);
    stopMusic();
    playMusicBtn.textContent = "🎶 Play Music";
    isPlaying = false;
}

// Reset Button
resetBtn.addEventListener('click', resetTimer);

// Play/Pause Music
playMusicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        playMusic();
        playMusicBtn.textContent = "⏸️ Pause Music";
    } else {
        stopMusic();
        playMusicBtn.textContent = "🎶 Play Music";
    }
    isPlaying = !isPlaying;
});

// Play Music Function
function playMusic() {
    meditationMusic.play();
}

// Stop Music Function
function stopMusic() {
    meditationMusic.pause();
    meditationMusic.currentTime = 0;
}

// Initialize Display
updateDisplay(0);
