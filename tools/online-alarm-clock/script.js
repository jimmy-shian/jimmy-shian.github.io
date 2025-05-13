// Online Alarm Clock
// 模擬鬧鐘功能，適合用於提醒和計時。
// TODO: 實作鬧鐘設定、啟動、停止功能

document.addEventListener('DOMContentLoaded', () => {
    console.log('Online Alarm Clock script loaded');
    
    // 獲取 DOM 元素
    const currentTimeDisplay = document.getElementById('current-time-display');
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const secondInput = document.getElementById('second');
    const alarmTimeDisplay = document.getElementById('alarm-time-display');
    const setAlarmBtn = document.getElementById('set-alarm');
    const stopAlarmBtn = document.getElementById('stop-alarm');
    const quickAddBtns = document.querySelectorAll('.quick-add');
    const alarmsContainer = document.getElementById('alarms-container');

    let alarmInterval = null;
    let alarms = [];
    const alarmAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'); // 使用在線音效

    // 更新當前時間
    function updateCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        
        // 如果時間輸入框為空，則設置為當前時間
        if (!hourInput.value) {
            hourInput.value = hours;
            minuteInput.value = minutes;
            secondInput.value = seconds;
        }
        
        // 檢查是否有鬧鐘觸發
        checkAlarms(now);
    }

    // 檢查鬧鐘
    function checkAlarms(now) {
        alarms.forEach((alarm, index) => {
            if (now >= alarm.time && !alarm.triggered) {
                triggerAlarm(alarm, index);
            }
        });
    }
    
    // 觸發鬧鐘
    function triggerAlarm(alarm, index) {
        alarms[index].triggered = true;
        alarmAudio.loop = true;
        alarmAudio.play();
        
        // 顯示通知
        showNotification('時間到！', 'alarm');
        
        // 啟用停止按鈕
        stopAlarmBtn.disabled = false;
        
        // 更新鬧鐘列表
        updateAlarmsList();
    }
    
    // 停止鬧鐘
    function stopAlarm() {
        // 停止音效
        if (!alarmAudio.paused) {
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
        }
        
        // 過濾掉已觸發的鬧鐘（即刪除它們）
        alarms = alarms.filter(alarm => !alarm.triggered);
        
        // 更新UI
        updateAlarmsList();
        
        // 禁用停止按鈕
        stopAlarmBtn.disabled = true;
        
        // 顯示通知
        showNotification('鬧鐘已刪除', 'info');
    }

    // 格式化時間
    function formatTime(hours, minutes, seconds) {
        return [
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0')
        ].join(':');
    }

    // 設置鬧鐘
    function setAlarm() {
        const hour = parseInt(hourInput.value) || 0;
        const minute = parseInt(minuteInput.value) || 0;
        const second = parseInt(secondInput.value) || 0;

        if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
            showNotification('請輸入有效的時間！', 'error');
            return;
        }

        const now = new Date();
        const alarmTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            minute,
            second
        );

        // 如果設定的時間已經過去了，就設定為明天
        if (alarmTime <= now) {
            alarmTime.setDate(alarmTime.getDate() + 1);
        }


        const alarm = {
            id: Date.now(),
            time: alarmTime,
            timeString: formatTime(hour, minute, second),
            triggered: false
        };

        alarms.push(alarm);
        updateAlarmsList();
        showNotification(`鬧鐘已設置為: ${alarmTime.toLocaleTimeString()}`, 'success');
        
        // 如果定時器未啟動，則啟動定時器
        if (!alarmInterval) {
            alarmInterval = setInterval(() => {
                updateCurrentTime();
            }, 1000);
        }
    }

    // 顯示通知
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // 添加顯示動畫
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 3秒後自動移除
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // 更新鬧鐘列表
    function updateAlarmsList() {
        if (alarms.length === 0) {
            alarmsContainer.innerHTML = '<div class="empty-message">尚未設定任何鬧鐘</div>';
            return;
        }
        
        // 按時間排序
        alarms.sort((a, b) => a.time - b.time);
        
        const alarmsHtml = alarms.map(alarm => `
            <div class="alarm-item ${alarm.triggered ? 'ringing' : ''}" data-id="${alarm.id}">
                <div class="time">${alarm.time.toLocaleTimeString()}</div>
                <div class="alarm-actions">
                    <button class="delete-alarm" data-id="${alarm.id}" title="刪除鬧鐘">
                        <span>🗑️</span>
                    </button>
                </div>
            </div>
        `).join('');
        
        alarmsContainer.innerHTML = alarmsHtml;
        
        // 添加刪除按鈕事件監聽器
        document.querySelectorAll('.delete-alarm').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                alarms = alarms.filter(alarm => alarm.id !== id);
                updateAlarmsList();
                e.stopPropagation();
            });
        });
    }

    function addTime(type) {
        const now = new Date();
        let hours = parseInt(hourInput.value) || now.getHours();
        let minutes = parseInt(minuteInput.value) || now.getMinutes();
        let seconds = parseInt(secondInput.value) || now.getSeconds();

        switch(type) {
            case 'hour':
                hours = (hours + 1) % 24;
                break;
            case 'minute':
                minutes = (minutes + 10) % 60;
                if (minutes < 10) hours = (hours + 1) % 24;
                break;
            case 'second':
                seconds = (seconds + 30) % 60;
                if (seconds < 30) minutes = (minutes + 1) % 60;
                break;
        }

        hourInput.value = hours.toString().padStart(2, '0');
        minuteInput.value = minutes.toString().padStart(2, '0');
        secondInput.value = seconds.toString().padStart(2, '0');
    }

    // 初始化
    updateCurrentTime();
    updateAlarmsList();
    
    // 啟動定時器
    alarmInterval = setInterval(() => {
        updateCurrentTime();
    }, 1000);

    // 事件監聽器
    setAlarmBtn.addEventListener('click', setAlarm);
    stopAlarmBtn.addEventListener('click', stopAlarm);
    
    // 快速添加按鈕事件
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', () => addTime(btn.dataset.type));
    });
});