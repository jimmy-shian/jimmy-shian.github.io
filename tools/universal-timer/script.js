// Timer modes
const modes = {
    STOPWATCH: 'stopwatch',
    TIMER: 'timer',
    COUNTDOWN: 'countdown'
};

// Current mode
let currentMode = modes.TIMER;

// Timer instances
const timers = {
    [modes.STOPWATCH]: null,
    [modes.TIMER]: null,
    [modes.COUNTDOWN]: null
};

// DOM Elements
const stopwatchDisplay = document.getElementById('stopwatch-display');
const timerDisplay = document.getElementById('timer-display');
const countdownDisplay = document.getElementById('countdown-display');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const lapsList = document.getElementById('laps-list');
let lapCount = 0;
let lastLapTime = 0;

// Timer mode switching
const timerModes = document.querySelectorAll('.timer-mode');
timerModes.forEach(button => {
    button.addEventListener('click', () => {
        const mode = button.dataset.mode;
        switchMode(mode);
    });
});

function switchMode(mode) {
    // Only stop the timer if we're switching to a different mode
    if (mode !== currentMode) {
        stopTimer();
    }

    // Update UI
    timerModes.forEach(button => {
        if (button.dataset.mode === mode) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Show/hide sections
    document.querySelectorAll('.timer-section').forEach(section => {
        if (section.classList.contains(`${mode}-section`)) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    currentMode = mode;
}

// Stopwatch functionality
let stopwatchTime = 0;
let stopwatchInterval;
let laps = [];

function startStopwatch() {
    if (timers[modes.STOPWATCH]) return;

    stopwatchInterval = setInterval(() => {
        stopwatchTime += 10;
        updateStopwatchDisplay();
    }, 10);

    timers[modes.STOPWATCH] = stopwatchInterval;
    updateStopwatchButtons();
}

function pauseStopwatch() {
    if (!timers[modes.STOPWATCH]) return;

    clearInterval(stopwatchInterval);
    timers[modes.STOPWATCH] = null;
    updateStopwatchButtons();
}

function resetStopwatch() {
    stopTimer();
    stopwatchTime = 0;
    lastLapTime = 0;
    lapCount = 0;
    laps = [];
    updateStopwatchDisplay();
    updateStopwatchButtons();
    updateLapsList();
}

function updateStopwatchDisplay() {
    const milliseconds = stopwatchTime % 1000;
    const seconds = Math.floor(stopwatchTime / 1000) % 60;
    const minutes = Math.floor(stopwatchTime / 60000) % 60;
    const hours = Math.floor(stopwatchTime / 3600000);

    stopwatchDisplay.textContent = 
        padZero(hours) + ':' + 
        padZero(minutes) + ':' + 
        padZero(seconds) + '.' + 
        padZero(Math.floor(milliseconds / 10));
}

// Timer functionality
let timerTime = 0;
let timerInterval;

function startTimer() {
    if (timers[modes.TIMER]) return;

    timerInterval = setInterval(() => {
        timerTime += 1000;
        updateTimerDisplay();
    }, 1000);

    timers[modes.TIMER] = timerInterval;
    updateTimerButtons();
}

function pauseTimer() {
    if (!timers[modes.TIMER]) return;

    clearInterval(timerInterval);
    timers[modes.TIMER] = null;
    updateTimerButtons();
}

function resetTimer() {
    stopTimer();
    timerTime = 0;
    updateTimerDisplay();
    updateTimerButtons();
}

function updateTimerDisplay() {
    const seconds = Math.floor(timerTime / 1000) % 60;
    const minutes = Math.floor(timerTime / 60000) % 60;
    const hours = Math.floor(timerTime / 3600000);

    timerDisplay.textContent = 
        padZero(hours) + ':' + 
        padZero(minutes) + ':' + 
        padZero(seconds);
}

// Countdown functionality
let countdownTime;
let countdownInterval;

function startCountdown() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    // 如果所有輸入都為空，使用當前顯示的值
    if (hours === 0 && minutes === 0 && seconds === 0) {
        if (countdownTime && countdownTime > 0) {
            // 如果已經有倒數時間，則繼續倒數
            countdownInterval = setInterval(updateCountdown, 1000);
            timers[modes.COUNTDOWN] = countdownInterval;
            updateCountdownButtons();
            return;
        }
        return; // 如果沒有設定時間，則不執行任何操作
    }

    countdownTime = hours * 3600 + minutes * 60 + seconds;
    updateCountdownDisplay();
    
    // 如果已經有一個計時器在運行，先清除它
    if (timers[modes.COUNTDOWN]) {
        clearInterval(timers[modes.COUNTDOWN]);
    }
    
    countdownInterval = setInterval(() => {
        if (isNaN(countdownTime) || countdownTime <= 0) {
            stopTimer();
            if (countdownTime <= 0) {
                alert('時間到！');
            }
            return;
        }
        
        countdownTime--;
        updateCountdownDisplay();
    }, 1000);

    timers[modes.COUNTDOWN] = countdownInterval;
    updateCountdownButtons();
}

function pauseCountdown() {
    if (!timers[modes.COUNTDOWN]) return;

    clearInterval(countdownInterval);
    timers[modes.COUNTDOWN] = null;
    updateCountdownButtons();
}

function resetCountdown() {
    stopTimer();
    countdownTime = 0;
    updateCountdownDisplay();
    updateCountdownButtons();
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

function updateCountdownDisplay() {
    if (isNaN(countdownTime)) {
        countdownTime = 0;
    }
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    countdownDisplay.textContent = 
        padZero(hours) + ':' + 
        padZero(minutes) + ':' + 
        padZero(seconds);
}

// Quick add buttons
const quickAddButtons = document.querySelectorAll('.quick-add');
quickAddButtons.forEach(button => {
    button.addEventListener('click', () => {
        const type = button.dataset.type;
        const value = type === 'hour' ? 3600 : type === 'minute' ? 600 : 30;
        
        if (countdownTime) {
            countdownTime += value;
            updateCountdownDisplay();
        } else {
            const input = type === 'hour' ? hoursInput :
                         type === 'minute' ? minutesInput :
                         secondsInput;
            const currentValue = parseInt(input.value) || 0;
            input.value = currentValue + (type === 'hour' ? 1 : 
                                       type === 'minute' ? 10 : 
                                       30);
        }
    });
});

// Helper functions
function padZero(num) {
    return num.toString().padStart(2, '0');
}

function stopTimer() {
    // Only stop the current mode's timer
    if (timers[currentMode]) {
        clearInterval(timers[currentMode]);
        timers[currentMode] = null;
        
        // Update buttons for the current mode
        switch(currentMode) {
            case modes.STOPWATCH:
                updateStopwatchButtons();
                break;
            case modes.TIMER:
                updateTimerButtons();
                break;
            case modes.COUNTDOWN:
                updateCountdownButtons();
                break;
        }
    }
}

function updateStopwatchButtons() {
    const isRunning = timers[modes.STOPWATCH] !== null;
    document.getElementById('start-stopwatch').disabled = isRunning;
    document.getElementById('pause-stopwatch').disabled = !isRunning;
    document.getElementById('lap-stopwatch').disabled = !isRunning;
    document.getElementById('reset-stopwatch').disabled = !isRunning && stopwatchTime === 0;
}

function updateTimerButtons() {
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const resetBtn = document.getElementById('reset-timer');

    startBtn.disabled = !!timers[modes.TIMER];
    pauseBtn.disabled = !timers[modes.TIMER];
    resetBtn.disabled = !timerTime;
}

function updateCountdownButtons() {
    const startBtn = document.getElementById('start-countdown');
    const pauseBtn = document.getElementById('pause-countdown');
    const resetBtn = document.getElementById('reset-countdown');

    startBtn.disabled = !!timers[modes.COUNTDOWN];
    pauseBtn.disabled = !timers[modes.COUNTDOWN];
    resetBtn.disabled = !countdownTime;
}

// Lap functions
function addLap() {
    lapCount++;
    const lapTime = stopwatchTime - lastLapTime;
    lastLapTime = stopwatchTime;
    
    const lap = {
        number: lapCount,
        time: lapTime,
        totalTime: stopwatchTime
    };
    
    laps.unshift(lap);
    updateLapsList();
}

function updateLapsList() {
    lapsList.innerHTML = '';
    
    if (laps.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = '點擊「記錄圈數」按鈕來記錄圈數';
        lapsList.appendChild(emptyMessage);
        return;
    }
    
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        
        const lapInfo = document.createElement('div');
        lapInfo.className = 'lap-info';
        
        const lapNumber = document.createElement('span');
        lapNumber.className = 'lap-number';
        lapNumber.textContent = `圈數 ${lap.number}`;
        
        const lapTime = document.createElement('span');
        lapTime.className = 'lap-time';
        lapTime.textContent = formatLapTime(lap.time);
        
        const lapTotal = document.createElement('span');
        lapTotal.className = 'lap-total';
        lapTotal.textContent = `總時間: ${formatLapTime(lap.totalTime)}`;
        
        lapInfo.appendChild(lapNumber);
        lapInfo.appendChild(lapTime);
        lapInfo.appendChild(lapTotal);
        
        const lapActions = document.createElement('div');
        lapActions.className = 'lap-actions';
        
        const copyButton = document.createElement('button');
        copyButton.className = 'lap-button copy';
        copyButton.textContent = '複製';
        copyButton.title = '複製時間';
        copyButton.onclick = () => copyToClipboard(formatLapTime(lap.time));
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'lap-button delete';
        deleteButton.textContent = '刪除';
        deleteButton.title = '刪除記錄';
        deleteButton.onclick = () => deleteLap(index);
        
        lapActions.appendChild(copyButton);
        lapActions.appendChild(deleteButton);
        
        lapItem.appendChild(lapInfo);
        lapItem.appendChild(lapActions);
        
        lapsList.appendChild(lapItem);
    });
}

function formatLapTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000) % 60;
    const hours = Math.floor(time / 3600000);
    
    if (hours > 0) {
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(Math.floor(milliseconds / 10), 2)}`;
    } else {
        return `${padZero(minutes)}:${padZero(seconds)}.${padZero(Math.floor(milliseconds / 10), 2)}`;
    }
}

function deleteLap(index) {
    laps.splice(index, 1);
    updateLapsList();
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        // 可以添加一個短暫的提示，表示已複製
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = '已複製到剪貼簿';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        }, 10);
    } catch (err) {
        console.error('複製失敗:', err);
    }
}

// Event Listeners
document.getElementById('start-stopwatch').addEventListener('click', startStopwatch);
document.getElementById('pause-stopwatch').addEventListener('click', pauseStopwatch);
document.getElementById('lap-stopwatch').addEventListener('click', addLap);
document.getElementById('reset-stopwatch').addEventListener('click', resetStopwatch);

document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('pause-timer').addEventListener('click', pauseTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);

document.getElementById('start-countdown').addEventListener('click', startCountdown);
document.getElementById('pause-countdown').addEventListener('click', pauseCountdown);
document.getElementById('reset-countdown').addEventListener('click', resetCountdown);

// Initialize
updateStopwatchDisplay();
updateTimerDisplay();
updateCountdownDisplay();
updateStopwatchButtons();
updateTimerButtons();
updateCountdownButtons();
