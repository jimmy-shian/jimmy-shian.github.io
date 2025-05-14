document.addEventListener('DOMContentLoaded', function() {
    // 初始化變數
    let wheelChart = null;
    let prizes = [];
    let participants = [];
    let winners = [];
    let isSpinning = false;
    
    // DOM 元素
    const prizeInputs = document.getElementById('prize-inputs');
    const addPrizeBtn = document.getElementById('add-prize');
    const participantsTextarea = document.getElementById('participants');
    const startDrawBtn = document.getElementById('start-draw');
    const winnersContainer = document.getElementById('winners');
    
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
    
    // 監聽參與者類型切換
    participantTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'manual') {
                manualParticipantsDiv.style.display = 'block';
                autoParticipantsDiv.style.display = 'none';
            } else {
                manualParticipantsDiv.style.display = 'none';
                autoParticipantsDiv.style.display = 'block';
            }
        });
    });
    
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
            // 如果已經有獎項，重新初始化轉盤
            if (prizes.length > 0) {
                initWheel();
            }
        });
    });
    
    // 添加獎項輸入框
    function addPrizeInput() {
        const prizeItem = document.createElement('div');
        prizeItem.className = 'prize-item';
        prizeItem.innerHTML = `
            <input type="text" placeholder="獎項名稱" class="prize-name" required>
            <input type="number" placeholder="數量" min="1" value="1" class="prize-quantity">
            <button class="remove-prize">刪除</button>
        `;
        
        // 添加刪除按鈕事件
        const removeBtn = prizeItem.querySelector('.remove-prize');
        removeBtn.addEventListener('click', function() {
            if (prizeInputs.children.length > 1) {
                prizeInputs.removeChild(prizeItem);
            } else {
                alert('至少需要一個獎項');
            }
        });
        
        prizeInputs.appendChild(prizeItem);
    }
    
    // 開始抽獎
    function startDraw() {
        if (isSpinning) return;
        
        // 獲取獎項和參與者
        prizes = [];
        participants = [];
        winners = [];
        
        // 驗證獎項
        const prizeItems = document.querySelectorAll('.prize-item');
        prizeItems.forEach((item, index) => {
            const nameInput = item.querySelector('.prize-name');
            const quantityInput = item.querySelector('.prize-quantity');
            
            if (!nameInput || !quantityInput) return;
            
            const name = nameInput.value.trim();
            const quantity = parseInt(quantityInput.value);
            
            if (!name) {
                alert('請填寫所有獎項名稱');
                return;
            }
            
            if (isNaN(quantity) || quantity < 1) {
                alert('獎品數量必須大於0');
                return;
            }
            
            // 使用色系中的顏色，循環使用
            const colorIndex = index % colorSchemes[currentColorScheme].length;
            
            prizes.push({
                name,
                quantity,
                color: colorSchemes[currentColorScheme][colorIndex],
                winners: []
            });
        });
        
        if (prizes.length === 0) {
            alert('請至少添加一個獎項');
            return;
        }
        
        // 獲取參與者
        const participantType = document.querySelector('input[name="participant-type"]:checked').value;
        
        if (participantType === 'manual') {
            // 手動輸入模式
            const participantsText = participantsTextarea.value.trim();
            if (!participantsText) {
                alert('請輸入參與者名單');
                return;
            }
            
            participants = participantsText.split('\n')
                .map(p => p.trim())
                .filter(p => p.length > 0);
        } else {
            // 自動生成序號模式
            const startNumber = parseInt(startNumberInput.value) || 1;
            const count = parseInt(participantCountInput.value) || 10;
            const prefix = prefixInput.value.trim();
            
            if (count <= 0) {
                alert('參與者數量必須大於0');
                return;
            }
            
            participants = [];
            for (let i = 0; i < count; i++) {
                const number = startNumber + i;
                participants.push(prefix ? `${prefix}${number}` : number.toString());
            }
        }
        
        if (participants.length === 0) {
            alert('請輸入有效的參與者名單');
            return;
        }
        
        // 檢查參與者數量是否足夠
        const totalPrizes = prizes.reduce((sum, prize) => sum + prize.quantity, 0);
        if (participants.length < totalPrizes) {
            alert(`參與者數量(${participants.length})少於獎品總數(${totalPrizes})`);
            return;
        }
        
        // 初始化輪盤
        initWheel();
        
        // 開始抽獎動畫
        spinWheel();
    }
    
    // 初始化輪盤
    function initWheel() {
        const ctx = document.getElementById('wheel').getContext('2d');
        
        // 銷毀現有的輪盤
        if (wheelChart) {
            wheelChart.destroy();
        }
        
        // 如果沒有獎項，顯示提示
        if (prizes.length === 0) {
            ctx.font = '20px Arial';
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.fillText('所有獎項已抽完！', 250, 150);
            return;
        }
        
        // 創建輪盤數據
        const labels = [];
        const data = [];
        const backgroundColor = [];
        const borderColor = [];
        
        // 根據獎項數量調整字體大小
        const baseFontSize = Math.max(14, Math.min(24, 200 / prizes.length));
        
        prizes.forEach((prize, index) => {
            // 如果獎項名稱太長，換行顯示
            let displayName = prize.name;
            if (prize.name.length > 8) {
                displayName = prize.name.substring(0, 8) + '\n' + prize.name.substring(8);
            }
            
            labels.push(displayName);
            data.push(1); // 所有獎項在輪盤上佔據相同大小
            
            // 使用色系中的顏色，循環使用
            const colorIndex = index % colorSchemes[currentColorScheme].length;
            backgroundColor.push(colorSchemes[currentColorScheme][colorIndex]);
            borderColor.push('#fff');
        });
        
        // 創建輪盤
        wheelChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
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
                        enabled: false
                    },
                    datalabels: {
                        display: false
                    }
                },
                cutout: '60%',
                radius: '95%',
                layout: {
                    padding: 10
                },
                elements: {
                    arc: {
                        borderWidth: 1,
                        borderColor: '#fff'
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }
    
    // 旋轉輪盤
    function spinWheel() {
        if (isSpinning) return;
        
        isSpinning = true;
        startDrawBtn.disabled = true;
        
        // 隨機選擇一個獎項
        const availablePrizes = prizes.filter(prize => 
            prize.winners.length < prize.quantity && prize.quantity > 0
        );
        
        if (availablePrizes.length === 0) {
            alert('所有獎項已抽完！');
            isSpinning = false;
            startDrawBtn.disabled = false;
            return;
        }
        
        const randomPrizeIndex = Math.floor(Math.random() * availablePrizes.length);
        const selectedPrize = availablePrizes[randomPrizeIndex];
        
        // 從剩餘參與者中隨機選擇一個
        const availableParticipants = participants.filter(participant => 
            !winners.some(winner => winner.participant === participant)
        );
        
        if (availableParticipants.length === 0) {
            alert('沒有更多參與者了！');
            isSpinning = false;
            startDrawBtn.disabled = false;
            return;
        }
        
        const randomParticipantIndex = Math.floor(Math.random() * availableParticipants.length);
        const winner = availableParticipants[randomParticipantIndex];
        
        // 計算旋轉角度
        const prizeIndex = prizes.findIndex(p => p.name === selectedPrize.name);
        const segmentAngle = 360 / prizes.length;
        const targetAngle = 3600 + (prizeIndex * segmentAngle) + (Math.random() * segmentAngle * 0.8 + segmentAngle * 0.1);
        
        // 設置動畫
        wheelChart.options.animation.duration = 5000;
        wheelChart.options.rotation = targetAngle;
        
        // 旋轉動畫
        wheelChart.update();
        
        // 動畫結束後顯示結果
        setTimeout(() => {
            // 添加獲獎者
            selectedPrize.winners.push(winner);
            winners.push({
                prize: selectedPrize.name,
                participant: winner,
                color: selectedPrize.color
            });
            
            // 更新獎項數量
            const prizeItem = prizeInputs.querySelector(`.prize-item:nth-child(${prizes.findIndex(p => p.name === selectedPrize.name) + 2})`);
            if (prizeItem) {
                const quantityInput = prizeItem.querySelector('.prize-quantity');
                const newQuantity = parseInt(quantityInput.value) - 1;
                quantityInput.value = newQuantity;
                
                // 如果數量為0，從輪盤上移除該獎項
                if (newQuantity <= 0) {
                    // 從prizes數組中移除該獎項
                    const prizeIndex = prizes.findIndex(p => p.name === selectedPrize.name);
                    if (prizeIndex > -1) {
                        prizes.splice(prizeIndex, 1);
                    }
                    
                    // 重新初始化輪盤
                    initWheel();
                }
            }
            
            // 更新獲獎者列表
            updateWinnersList();
            
            // 重置動畫
            wheelChart.options.animation.duration = 0;
            wheelChart.update();
            
            isSpinning = false;
            startDrawBtn.disabled = false;
            
            // 檢查是否還有獎品可抽
            const remainingPrizes = prizes.filter(prize => 
                prize.winners.length < prize.quantity && prize.quantity > 0
            );
            
            if (remainingPrizes.length === 0) {
                alert('所有獎項已抽完！');
                return;
            }
            
            // 檢查是否還有參與者
            const remainingParticipants = participants.filter(participant => 
                !winners.some(winner => winner.participant === participant)
            );
            
            if (remainingParticipants.length === 0) {
                alert('沒有更多參與者了！');
                return;
            }
            
        }, 5500);
    }
    
    // 更新獲獎者列表
    function updateWinnersList() {
        winnersContainer.innerHTML = '';
        
        prizes.forEach(prize => {
            if (prize.winners.length > 0) {
                const prizeWinners = prize.winners.map(winner => {
                    return `<div class="winner-card" style="border-left: 4px solid ${prize.color};">
                        <h4>${prize.name}</h4>
                        <p>${winner}</p>
                    </div>`;
                }).join('');
                
                winnersContainer.insertAdjacentHTML('beforeend', prizeWinners);
            }
        });
    }
});
