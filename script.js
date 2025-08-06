let timer;
let isRunning = false;
let timeLeft = 5;
let soundLoaded = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const xpProgressBar = document.getElementById('xp-progress');
const xpDisplay = document.getElementById('xp');
const levelDisplay = document.getElementById('level');

let xp = parseInt(localStorage.getItem('xp')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;
const xpPerPomodoro = 20;

// Load Sound
const dingSound = new Audio('sounds/ding.mp3');
dingSound.load();

startBtn.addEventListener('click', () => {
    if (!soundLoaded) {
        // Unlock Audio Playback on First User Interaction
        dingSound.play().then(() => {
            dingSound.pause();
            dingSound.currentTime = 0;
            soundLoaded = true;
        }).catch(() => {
            console.log("Sound unlock failed. Will retry on next click.");
        });
    }

    if (!isRunning) {
        timer = setInterval(countdown, 1000);
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
});

pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;

        if (soundLoaded) {
            dingSound.play();
        }

        alert("Pomodoro Completed! 🎉");
        awardXP();
    } else {
        timeLeft--;
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    minutesDisplay.textContent = mins.toString().padStart(2, '0');
    secondsDisplay.textContent = secs.toString().padStart(2, '0');
}

function awardXP() {
    xp += xpPerPomodoro;

    if (xp >= 100) {
        xp -= 100;
        level++;
        levelDisplay.classList.add('pulse');
        setTimeout(() => levelDisplay.classList.remove('pulse'), 1000);
        alert(`Level Up! You're now Level ${level} 🎉`);
    }

    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    updateXPDisplay();
}

function updateXPDisplay() {
    xpDisplay.textContent = xp;
    levelDisplay.textContent = level;
    xpProgressBar.style.width = xp + "%";
}

// Initial Display
updateTimerDisplay();
updateXPDisplay();