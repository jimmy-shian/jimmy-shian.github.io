// document.addEventListener('DOMContentLoaded', function() {
    // 初始化變數
    let wheelChart = null;
    let prizes = [];
    let participants = [];
    let winners = [];
    let isSpinning = false;
    let initialPrizes = [];
    let initialParticipants = [];
    let allowRepeatWinner = false;
    
    // DOM 元素
    const prizeInputs = document.getElementById('prize-inputs');
    const addPrizeBtn = document.getElementById('add-prize');
    const participantsTextarea = document.getElementById('participants');
    const startDrawBtn = document.getElementById('start-draw');
    const winnersContainer = document.getElementById('winners');
    const resetDrawBtn = document.getElementById('reset-draw');
    const allowRepeatWinnerCheckbox = document.getElementById('allow-repeat-winner');
    
    // 參與者類型切換
    const participantTypeRadios = document.querySelectorAll('input[name="participant-type"]');
    const manualParticipantsDiv = document.getElementById('manual-participants');
    const autoParticipantsDiv = document.getElementById('auto-participants');
    
    // 自動生成序號的輸入欄位
    const startNumberInput = document.getElementById('start-number');
    const participantCountInput = document.getElementById('participant-count');
    const prefixInput = document.getElementById('prefix');
    
    // 色系設定
    const colorSchemes = {
        default: [
            '#FF9A9E', '#FAD0C4', '#FFD1FF', '#A8E6CF',
            '#D4EDF7', '#F0F4C3', '#FFD3B6', '#FFAAA5'
        ],
        cool: [
            '#A1C4FD', '#C2E9FB', '#E0C3FC', '#B5EAD7',
            '#C7CEEA', '#B5EAD7', '#E2F0CB', '#FFDAC1'
        ],
        pastel: [
            '#D4FC79', '#96E6A1', '#84FAB0', '#8FD3F4',
            '#A18CD1', '#FBC2EB', '#FF9A9E', '#F6D365'
        ]
    };
    
    let currentColorScheme = 'default';
    
    // 監聽允許重複中獎選項
    allowRepeatWinnerCheckbox.addEventListener('change', function() {
        allowRepeatWinner = this.checked;
    });
    allowRepeatWinner = allowRepeatWinnerCheckbox.checked;

    // 監聽重設抽獎按鈕
    resetDrawBtn.addEventListener('click', function() {
        // 恢復獎品數量
        prizes = initialPrizes.map(p => ({...p}));
        // 恢復參與者
        participants = [...initialParticipants];
        // 清空抽獎紀錄
        winners = [];
        // 重新繪製轉盤
        initWheel();
        // 更新結果區域
        updateWinnersList();
        // 啟用開始抽獎按鈕
        startDrawBtn.disabled = false;
    });

    // 監聽參與者類型切換
    // 初始顯示對應的參與者輸入區域
    function updateParticipantInputs() {
        const selectedType = document.querySelector('input[name="participant-type"]:checked').value;
        if (selectedType === 'manual') {
            manualParticipantsDiv.style.display = 'block';
            autoParticipantsDiv.style.display = 'none';
        } else {
            manualParticipantsDiv.style.display = 'none';
            autoParticipantsDiv.style.display = 'block';
        }
    }

    // 監聽參與者類型切換
    participantTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateParticipantInputs);
    });

    // 初始化顯示
    updateParticipantInputs();
    
    // 添加獎項
    addPrizeBtn.addEventListener('click', addPrizeInput);
    
    // 初始化一個獎項
    addPrizeInput();
    
    // 開始抽獎
    startDrawBtn.addEventListener('click', startDraw);
    
    // 監聽色系選擇變化
    document.querySelectorAll('input[name="color-scheme"]').forEach(radio => {
        radio.addEventListener('change', function() {
            currentColorScheme = this.value;
            // 切換色系時完整重設抽獎流程
            resetDraw();
        });
    });
    
    // 浮動通知函數
function showToast(message, type = '', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' ' + type : '');
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => container.removeChild(toast), 700);
    }, duration);
}

// 添加獎項輸入框
function addPrizeInput() {
    const prizeItem = document.createElement('div');
    prizeItem.className = 'prize-item';
    
    // 計算下一個獎品編號
    const prizeCount = document.querySelectorAll('.prize-item').length + 1;
    const defaultName = `獎品${prizeCount}`;
    
    prizeItem.innerHTML = `
        <input type="text" placeholder="獎項名稱" class="prize-name" value="${defaultName}" onchange="this.value = this.value.trim() || '${defaultName}'; resetDraw()" required>
        <input type="number" placeholder="1" min="1" value="1" class="prize-quantity" onchange="resetDraw()">
        <button class="remove-prize">刪除</button>
    `;
    // 刪除按鈕
    const removeBtn = prizeItem.querySelector('.remove-prize');
    removeBtn.addEventListener('click', function() {
        if (prizeInputs.children.length > 1) {
            prizeInputs.removeChild(prizeItem);
            // 刪除時也重設抽獎
            resetDraw();
        } else {
            showToast('至少需要一個獎項', 'warn');
        }
    });
    prizeInputs.appendChild(prizeItem);
    // 新增時自動重設抽獎
    resetDraw();
}

// 重設抽獎流程
function resetDraw() {
    // 重新記錄獎品初始狀態
    prizes = getPrizeSettings();
    initialPrizes = prizes.map(p => ({...p}));
    // 重新建立參與者
    participants = getParticipants();
    initialParticipants = [...participants];
    // 清空抽獎紀錄
    winners = [];
    // 重新繪製轉盤
    initWheel();
    // 更新結果區域
    updateWinnersList();
    // 啟用開始抽獎按鈕
    startDrawBtn.disabled = false;
}

// 讀取獎項設定，包含顏色
function getPrizeSettings() {
    const items = Array.from(prizeInputs.querySelectorAll('.prize-item'));
    return items.map((item, idx) => {
        const nameInput = item.querySelector('.prize-name');
        const quantityInput = item.querySelector('.prize-quantity');
        let quantity = parseInt(quantityInput.value);
        if (!quantityInput.value) {
            quantity = 1;
            showToast('ℹ️ 未輸入數量，已預設為 1', 'info');
            quantityInput.value = 1;
        }
        return {
            id: crypto.randomUUID ? crypto.randomUUID() : (Math.random().toString(36).slice(2) + Date.now()),
            name: nameInput.value.trim(),
            total: quantity,
            remain: quantity,
            color: colorSchemes[currentColorScheme][idx % colorSchemes[currentColorScheme].length]
        };
    });
}

// 讀取參與者設定
function getParticipants() {
    const participantType = document.querySelector('input[name="participant-type"]:checked').value;
    if (participantType === 'manual') {
        const participantsText = participantsTextarea.value.trim();
        if (!participantsText) {
            showToast('請輸入參與者名單', 'warn');
            return [];
        }
        return participantsText.split('\n')
            .map(p => p.trim())
            .filter(p => p.length > 0);
    } else {
        const startNumber = parseInt(startNumberInput.value) || 1;
        const count = parseInt(participantCountInput.value) || 10;
        const prefix = prefixInput.value.trim();
        const participants = [];
        for (let i = 0; i < count; i++) {
            const number = startNumber + i;
            participants.push(prefix ? `${prefix}${number}` : number.toString());
        }
        return participants;
    }
}

    
    // 開始抽獎
function startDraw() {
    if (isSpinning) return;
    // 僅首次或重設時才重建 prizes，這裡不再呼叫 getPrizeSettings()
    if (prizes.length === 0) {
        showToast('請添加至少一個獎項', 'warn');
        return;
    }
    // 初始化參與者
    participants = getParticipants();
    if (participants.length === 0) {
        showToast('請設置參與者名單', 'warn');
        return;
    }
    // 檢查參與者數量是否足夠
    const totalRemain = prizes.reduce((sum, prize) => sum + prize.remain, 0);
    if (participants.length < totalRemain) {
        showToast(`參與者數量(${participants.length})少於獎品總數(${totalRemain})`, 'warn');
        return;
    }
    // 記錄初始狀態（僅首次或重設時）
    if (!initialPrizes.length) initialPrizes = prizes.map(p => ({...p}));
    if (!initialParticipants.length) initialParticipants = [...participants];
    // 初始化輪盤並開始抽獎
    // initWheel();
    spinWheel();
}

// Fisher-Yates 洗牌演算法
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 計算適合的字體大小
function calculateFontSize(ctx, text, maxWidth, initialSize) {
    let size = initialSize;
    ctx.font = `${size}px Arial`;
    let textWidth = ctx.measureText(text).width;
    
    while (textWidth > maxWidth && size > 10) {
        size--;
        ctx.font = `${size}px Arial`;
        textWidth = ctx.measureText(text).width;
    }
    return size;
}

// 初始化輪盤
function initWheel() {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    
    // 銷毀現有圖表（如果存在）
    if (wheelChart) {
        wheelChart.destroy();
    }
    
    // 展開所有剩餘獎項（依剩餘數量），每個分身攜帶完整資訊
    let expandedPrizes = [];
    prizes.forEach(prize => {
        if (prize.remain > 0) {
            for (let i = 0; i < prize.remain; i++) {
                expandedPrizes.push({
                    id: prize.id,
                    name: prize.name,
                    color: prize.color,
                    total: prize.total,
                    remain: prize.remain,
                    instanceId: crypto.randomUUID ? crypto.randomUUID() : (Math.random().toString(36).slice(2) + Date.now())
                });
            }
        }
    });

    if (expandedPrizes.length === 0) {
        // 檢查是否為抽獎抽完的情況
        const hasPrizes = prizes.some(prize => prize.total > 0);
        if (hasPrizes) {
            showToast('所有獎品已抽完！', 'info');
        } else {
            showToast('請先設定獎項', 'warn');
        }
        return;
    }

    // 隨機洗牌獎品區塊
    expandedPrizes = shuffleArray(expandedPrizes);

    // 準備圖表數據
    const data = [];
    const backgroundColors = [];
    const borderColors = [];
    
    // 為每個獎項創建一個區塊
    expandedPrizes.forEach((prize) => {
        data.push(1); // 每個區塊大小相同
        backgroundColors.push(prize.color);
        borderColors.push('#ffffff');
    });

    // 創建圖表
    wheelChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: expandedPrizes.map(p => p.name),
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            rotation: -90,
            circumference: 360,
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            // 從原始獎品數據中獲取獎品名稱
                            const prize = prizes.find(p => p.id === context.dataset.id);
                            return prize ? prize.name : '';
                        }
                    }
                },
                datalabels: {
                    display: false
                }
            },
            cutout: '30%',
            radius: '95%',
            layout: {
                padding: 10
            },
            elements: {
                arc: {
                    borderWidth: 2,
                    borderColor: '#fff',
                    hoverBorderWidth: 3
                }
            },
            plugins: {
                legend: {
                    display: false
                },

                // 自定義繪製文字
                beforeDraw: function(chart) {
                    const width = chart.width;
                    const height = chart.height;
                    const ctx = chart.ctx;
                    
                    // 清除畫布
                    ctx.clearRect(0, 0, width, height);
                },
                // 繪製文字
                afterDraw: function(chart) {
                    const width = chart.width;
                    const height = chart.height;
                    const ctx = chart.ctx;
                    
                    ctx.save();
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const radius = Math.min(width, height) / 2 * 0.9;
                    
                    // 繪製每個區塊的文字
                    chart.data.datasets.forEach((dataset, i) => {
                        const meta = chart.getDatasetMeta(i);
                        meta.data.forEach((element, index) => {
                            // 計算文字位置
                            const model = element;
                            const startAngle = model.startAngle;
                            const endAngle = model.endAngle;
                            const angle = startAngle + (endAngle - startAngle) / 2;
                            const text = chart.data.labels[index];
                            
                            // 計算文字位置
                            const textRadius = radius * 0.6; // 文字半徑
                            const x = centerX + Math.cos(angle) * textRadius;
                            const y = centerY + Math.sin(angle) * textRadius;
                            
                            // 計算最大文字寬度（基於弧長）
                            const arcLength = (endAngle - startAngle) * radius * 0.8;
                            
                            // 設置文字樣式
                            ctx.font = 'bold 12px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            
                            // 計算適合的字體大小
                            const fontSize = calculateFontSize(ctx, text, arcLength, 12);
                            ctx.font = `bold ${fontSize}px Arial`;
                            
                            // 繪製文字陰影（增加可讀性）
                            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                            ctx.shadowBlur = 2;
                            ctx.shadowOffsetX = 1;
                            ctx.shadowOffsetY = 1;
                            
                            // 繪製文字
                            ctx.fillStyle = '#ffffff';
                            ctx.fillText(text, x, y);
                            
                            // 重置陰影
                            ctx.shadowColor = 'transparent';
                        });
                    });
                    
                    ctx.restore();
                }
            }
        }
    });
    
    // 保存當前獎品狀態，用於後續操作
    currentExpandedPrizes = expandedPrizes;
}

// 旋轉輪盤
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    startDrawBtn.disabled = true;

    // 展開所有剩餘獎項（依剩餘數量），每個分身攜帶完整資訊
    const expandedPrizes = [];
    prizes.forEach(prize => {
        if (prize.remain > 0) {
            for (let i = 0; i < prize.remain; i++) {
                expandedPrizes.push({
                    id: prize.id,
                    name: prize.name,
                    color: prize.color,
                    total: prize.total,
                    remain: prize.remain,
                    instanceId: crypto.randomUUID ? crypto.randomUUID() : (Math.random().toString(36).slice(2) + Date.now())
                });
            }
        }
    });

    if (expandedPrizes.length === 0) {
        showToast(' 所有獎品已抽完！', 'info');
        isSpinning = false;
        startDrawBtn.disabled = false;
        return;
    }

    // 取得可抽參與者名單
    let availableParticipants = participants;
    if (!allowRepeatWinner) {
        // 不允許重複中獎，排除已中獎者
        const winnerNames = winners.map(w => w.participant);
        availableParticipants = participants.filter(p => !winnerNames.includes(p));
    }
    if (availableParticipants.length === 0) {
        alert('沒有更多參與者了！');
        isSpinning = false;
        startDrawBtn.disabled = false;
        return;
    }

    // 隨機選擇一個區塊（即一個獎項）
    const randomPrizeIndex = Math.floor(Math.random() * expandedPrizes.length);
    const selectedPrize = expandedPrizes[randomPrizeIndex];
    // 隨機選擇一個參與者
    const randomParticipantIndex = Math.floor(Math.random() * availableParticipants.length);
    const winnerName = availableParticipants[randomParticipantIndex];

    // 計算轉盤上該獎項的區塊位置
    const segmentAngle = 360 / expandedPrizes.length;
    const targetAngle = 3600 + (randomPrizeIndex * segmentAngle) + (Math.random() * segmentAngle * 0.8 + segmentAngle * 0.1);

    // 設置動畫
    wheelChart.options.animation = {
        duration: 5000,
        easing: 'easeInOutQuart'
    };
    const currentRotation = wheelChart.options.rotation || 0;
    wheelChart.options.rotation = currentRotation % 360;
    const totalRotation = currentRotation + 360 * 10 + targetAngle;
    let startTime = null;
    const duration = 5000;
    const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        const easeOutQuart = 1 - Math.pow(1 - Math.min(progress, 1), 4);
        const currentRotation = easeOutQuart * totalRotation;
        wheelChart.options.rotation = currentRotation % 360;
        wheelChart.update('none');
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 動畫結束後顯示結果
            onSpinComplete(selectedPrize, winnerName);
        }
    };
    requestAnimationFrame(animate);
}

// 旋轉完成後的處理
function onSpinComplete(selectedPrize, winnerName) {
    try {
        // 找到原始獎項並更新剩餘數量
        const originalPrize = prizes.find(p => p.id === selectedPrize.id);
        if (originalPrize) {
            originalPrize.remain--;
        }
        
        // 記錄結果（獎項名稱與參與者）
        winners.push({ 
            prize: selectedPrize.name, 
            participant: winnerName, 
            color: selectedPrize.color,
            timestamp: new Date().getTime()
        });

        // 不允許重複中獎時，將該參與者移出名單
        if (!allowRepeatWinner) {
            participants = participants.filter(p => p !== winnerName);
        }

        // 立即刷新輪盤，移除已抽中的選項
        initWheel();

        highlightWinningSegment(selectedPrize.instanceId);
        updateWinnersList();

        isSpinning = false;
        if (startDrawBtn) startDrawBtn.disabled = false;

        // 檢查是否還有獎品可抽
        const totalRemain = prizes.reduce((sum, prize) => sum + (prize.remain || 0), 0);
        if (totalRemain === 0) {
            setTimeout(() => {
                showToast(' 所有獎品已抽完！', 'info');
            }, 1000);
        }
    } catch (error) {
        console.error('抽獎過程發生錯誤:', error);
        isSpinning = false;
        if (startDrawBtn) startDrawBtn.disabled = false;
        showToast('抽獎過程發生錯誤，請重試', 'error');
    }
}

// 高亮顯示中獎區塊
function highlightWinningSegment(instanceId) {
    if (!wheelChart || !currentExpandedPrizes) return;
    
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    
    // 找到中獎的區塊索引
    const segmentIndex = currentExpandedPrizes.findIndex(p => p.instanceId === instanceId);
    if (segmentIndex === -1) return;
    
    const meta = wheelChart.getDatasetMeta(0);
    const segment = meta.data[segmentIndex];
    if (!segment) return;
    
    // 高亮動畫
    const originalBorderColor = segment.options.borderColor;
    const highlightColor = '#FFFF00';
    let blinkCount = 0;
    const maxBlinks = 6;
    
    function blink() {
        if (blinkCount >= maxBlinks * 2) {
            segment.options.borderColor = originalBorderColor;
            segment.options.borderWidth = 2;
            const canvas = document.getElementById('wheel');
            const ctx = canvas.getContext('2d');
            
            // 找到中獎的區塊索引
            const segmentIndex = currentExpandedPrizes.findIndex(p => p.instanceId === instanceId);
            if (segmentIndex === -1) return;
            
            const meta = wheelChart.getDatasetMeta(0);
            const segment = meta.data[segmentIndex];
            if (!segment) return;
            
            // 高亮動畫
            const originalBorderColor = segment.options.borderColor;
            const highlightColor = '#FFFF00';
            let blinkCount = 0;
            const maxBlinks = 6;
            
            function blink() {
                if (blinkCount >= maxBlinks * 2) {
                    segment.options.borderColor = originalBorderColor;
                    segment.options.borderWidth = 2;
                    wheelChart.update();
                    return;
                }
                
                segment.options.borderColor = blinkCount % 2 === 0 ? highlightColor : originalBorderColor;
                segment.options.borderWidth = 4;
                wheelChart.update();
                
                blinkCount++;
                setTimeout(blink, 200);
            }
            
            setTimeout(blink, 300);
        }
    }
}
    
    // 更新獲獎者列表
    function updateWinnersList() {
        winnersContainer.innerHTML = '';
        if (!winners || winners.length === 0) {
            winnersContainer.innerHTML = '<div style="color:#888;">尚無抽獎結果</div>';
            return;
        }
        winners.sort((a, b) => a.timestamp - b.timestamp).forEach((winner, idx) => {
            winnersContainer.insertAdjacentHTML('beforeend',
                `<div class="winner-card" style="border-left: 4px solid ${winner.color};">
                    <h4>第${idx + 1}次<br>獎品名稱：${winner.prize}<br>得獎者：${winner.participant}</h4>
                </div>`
            );
        });
    }

// });