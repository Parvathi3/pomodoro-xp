// Timer logic will be added here tomorrow.
console.log("Pomodoro XP Loaded");
const modeBadge = 
document.getElementById('modeBadge');
const sound = new Audio('sounds/ding-101492.mp3.')
let mode = 'focus';
let pomodoroCount = 0;
let xp = 0;
let level = 1;
const xpPerPomodoro = 20; // XP awarded per completed Pomodoro
const xpProgressBar = document.getElementById('xp-progress');
const xpDisplay = document.getElementById('xp');
const levelDisplay = document.getElementById('level');
let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Start Button Click
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(countdown, 1000);
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
});

// Pause Button Click
pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

// Reset Button Click
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    timeLeft = (mode === 'focus')? 25 * 60 :5 * 60;
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

// Countdown Logic
function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;

        sound.play();//play sound alert

        if (mode === 'focus') {
            pomodoroCount++;
            awardXP();

            if (pomodoroCount % 4 === 0) {
                startBreak(15 * 60); // Long Break - 15 minutes
                updateModeBadge('Long Break','#00b894');
            } else {
                startBreak(5 * 60);  // Short Break - 5 minutes
                updateModeBadge('Short Break','#00b894');
            }
          } else {
            startFocus();
           updateModeBadge('Focus Mode','#6c5ce7');
        }
    } else {
        timeLeft--;
        updateTimerDisplay();
    }
 }


// Update Timer Display
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
        levelDisplay.textContent = level;
        alert(`Congratulations! You've reached Level ${level} 🎉`);
    }

    // Update XP Bar & Display
    xpProgressBar.style.width = xp + "%";
    xpDisplay.textContent = xp;
}

// Initialize Display
updateTimerDisplay();
xpDisplay.textContent = xp;
levelDisplay.textContent = level;

function startFocus(){
    mode = 'focus';
    timeLeft = 25 * 60 ;
    updateTimerDisplay();
}
function startBreak(duration){
    mode = 'break';
    timeLeft = duration;
    updateTimerDisplay();
}
function updateModeBadge(text, color){
    modeBadge.textContent = text;
    modeBadge.style.background = color;
}
