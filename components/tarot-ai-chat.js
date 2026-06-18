// components/tarot-ai-chat.js
(function() {
    // 建立並插入聊天泡泡與面板 DOM
    const root = document.createElement('div');
    root.id = 'tarot-ai-chat-root';
    root.innerHTML = `
        <!-- 聊天泡泡按鈕 -->
        <button id="tarot-chat-bubble" class="tarot-chat-bubble" aria-label="打開 AI 諮詢" title="塔羅 AI 大師">
            🔮
        </button>

        <!-- 聊天視窗面板 -->
        <div id="tarot-chat-panel" class="tarot-chat-panel" style="display: none;">
            <div class="tarot-chat-header">
                <span class="tarot-chat-title">🔮 塔羅 AI 諮詢大師</span>
                <div class="tarot-chat-header-actions">
                    <button id="tarot-chat-settings-btn" title="設定 API Key">⚙️</button>
                    <button id="tarot-chat-close-btn" title="關閉">&times;</button>
                </div>
            </div>
            
            <div class="tarot-chat-body">
                <!-- API 金鑰設定區 -->
                <div id="tarot-chat-settings-panel" class="tarot-chat-settings-panel" style="display: none;">
                    <label for="tarot-chat-apikey">NVIDIA API Key:</label>
                    <div class="apikey-input-group">
                        <input type="password" id="tarot-chat-apikey" placeholder="輸入 nvapi-...">
                        <button id="tarot-chat-save-apikey">儲存</button>
                    </div>
                    <small class="apikey-hint">金鑰僅存於您的本機 localStorage，安全無虞。</small>
                </div>
                
                <!-- 訊息紀錄區 -->
                <div id="tarot-chat-messages" class="tarot-chat-messages">
                    <div class="chat-msg ai">
                        <div class="msg-content">您好！我是您的塔羅 AI 諮詢大師。您可以先在網頁上進行占卜，然後點擊下方<strong>「📌 帶入本頁占卜結果」</strong>，我將為您進行深度解讀！或者您可以直接向我提問任何牌義或問題。</div>
                    </div>
                </div>
            </div>
            
            <!-- 快速動作列 -->
            <div class="tarot-chat-actions">
                <button id="tarot-chat-load-reading">📌 帶入本頁占卜結果</button>
            </div>
            
            <!-- 聊天輸入列 -->
            <div class="tarot-chat-footer">
                <textarea id="tarot-chat-input" placeholder="向大師請教您的困惑..." rows="3"></textarea>
                <button id="tarot-chat-send-btn">發送</button>
            </div>
        </div>
    `;
    document.body.appendChild(root);

    // 取得元件引用
    const bubble = document.getElementById('tarot-chat-bubble');
    const panel = document.getElementById('tarot-chat-panel');
    const closeBtn = document.getElementById('tarot-chat-close-btn');
    const settingsBtn = document.getElementById('tarot-chat-settings-btn');
    const settingsPanel = document.getElementById('tarot-chat-settings-panel');
    const apikeyInput = document.getElementById('tarot-chat-apikey');
    const saveApikeyBtn = document.getElementById('tarot-chat-save-apikey');
    const loadReadingBtn = document.getElementById('tarot-chat-load-reading');
    const chatInput = document.getElementById('tarot-chat-input');
    const sendBtn = document.getElementById('tarot-chat-send-btn');
    const messagesContainer = document.getElementById('tarot-chat-messages');

    // 儲存當前本頁占卜結果
    let pendingReading = null;

    // 對話紀錄歷史
    let chatHistory = [
        { role: "system", content: "你是一位溫暖、直覺敏銳且專業的塔羅牌解讀大師。請協助使用者解答他們的困惑。你需要根據占卜出來的卡牌結果以及使用者的問題，提供客觀、富有洞察力的塔羅牌解讀。請以溫馨鼓勵的語氣回答，引導使用者正向思考並提供可行的建議。" }
    ];

    // 初始化載入金鑰
    apikeyInput.value = localStorage.getItem('nvidia_tarot_api_key') || '';

    // 泡泡點擊切換
    bubble.addEventListener('click', () => {
        const isVisible = panel.style.display !== 'none';
        panel.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            // 自動帶入本頁占卜結果與輸入
            const info = detectCurrentPageReading();
            if (info) {
                pendingReading = info;
                const questionEl = document.getElementById('question');
                const question = questionEl ? questionEl.value.trim() : "";
                if (question) {
                    chatInput.value = `我要詢問塔羅占卜結果。我的問題是：「${question}」`;
                } else {
                    chatInput.value = `我要詢問塔羅占卜結果。`;
                }
            }
            scrollToBottom();
            chatInput.focus();
        }
    });

    // 關閉按鈕
    closeBtn.addEventListener('click', () => {
        panel.style.display = 'none';
    });

    // 設定面板切換
    settingsBtn.addEventListener('click', () => {
        settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
    });

    // 儲存金鑰
    saveApikeyBtn.addEventListener('click', () => {
        const key = apikeyInput.value.trim();
        localStorage.setItem('nvidia_tarot_api_key', key);
        settingsPanel.style.display = 'none';
        alert('API Key 已成功儲存！');
    });

    // 發送按鈕與 Enter 事件
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 帶入本頁占卜結果
    loadReadingBtn.addEventListener('click', () => {
        const info = detectCurrentPageReading();
        if (!info) {
            alert('偵測不到本頁占卜結果。請先點擊頁面上的按鈕進行抽牌，或開啟牌庫圖鑑詳情！');
            return;
        }
        pendingReading = info;
        const questionEl = document.getElementById('question');
        const question = questionEl ? questionEl.value.trim() : "";
        if (question) {
            chatInput.value = `我要詢問塔羅占卜結果。我的問題是：「${question}」`;
        } else {
            chatInput.value = `我要詢問塔羅占卜結果。`;
        }
        chatInput.focus();
    });

    function getFriendlyCardName(name) {
        if (!name) return "";
        if (name.includes('(')) return name;

        const majorMap = {
            'Fool': '愚者 (The Fool)', 'Fool_I': '愚者 (The Fool)',
            'Magician': '魔術師 (The Magician)', 'Magician_II': '魔術師 (The Magician)',
            'High_Priestess': '女祭司 (The High Priestess)', 'High_Priestess_III': '女祭司 (The High Priestess)',
            'Empress': '女皇 (The Empress)', 'Empress_IV': '女皇 (The Empress)',
            'Emperor': '皇帝 (The Emperor)', 'Emperor_V': '皇帝 (The Emperor)',
            'Hierophant': '教皇 (The Hierophant)', 'Hierophant_VI': '教皇 (The Hierophant)',
            'Lovers': '戀人 (The Lovers)', 'Lovers_VII': '戀人 (The Lovers)',
            'Chariot': '戰車 (The Chariot)', 'Chariot_VIII': '戰車 (The Chariot)',
            'Strength': '力量 (Strength)', 'Strength_IX': '力量 (Strength)',
            'Hermit': '隱者 (The Hermit)', 'Hermit_X': '隱者 (The Hermit)',
            'Wheel_of_Fortune': '命運之輪 (Wheel of Fortune)', 'Wheel_of_Fortune_XI': '命運之輪 (Wheel of Fortune)',
            'Justice': '正義 (Justice)', 'Justice_XII': '正義 (Justice)',
            'Hanged_Man': '倒吊人 (The Hanged Man)', 'Hanged_Man_XIII': '倒吊人 (The Hanged Man)',
            'Death': '死神 (Death)', 'Death_XIV': '死神 (Death)',
            'Temperance': '節制 (Temperance)', 'Temperance_XV': '節制 (Temperance)',
            'Devil': '惡魔 (The Devil)', 'Devil_XVI': '惡魔 (The Devil)',
            'Tower': '高塔 (The Tower)', 'Tower_XVII': '高塔 (The Tower)',
            'Star': '星星 (The Star)', 'Star_XVIII': '星星 (The Star)',
            'Moon': '月亮 (The Moon)', 'Moon_XIX': '月亮 (The Moon)',
            'Sun': '太陽 (The Sun)', 'Sun_XX': '太陽 (The Sun)',
            'Judgement': '審判 (Judgement)', 'Judgement_XXI': '審判 (Judgement)',
            'World': '世界 (The World)'
        };
        
        const cleanKey = name.trim();
        if (majorMap[cleanKey]) {
            return majorMap[cleanKey];
        }
        
        const majorZhMap = {
            '愚者I': '愚者 (The Fool)', '愚者': '愚者 (The Fool)',
            '魔術師II': '魔術師 (The Magician)', '魔術師': '魔術師 (The Magician)',
            '女祭司III': '女祭司 (The High Priestess)', '女祭司': '女祭司 (The High Priestess)',
            '皇后IV': '女皇 (The Empress)', '皇后': '女皇 (The Empress)', '女皇': '女皇 (The Empress)', '女皇IV': '女皇 (The Empress)',
            '皇帝V': '皇帝 (The Emperor)', '皇帝': '皇帝 (The Emperor)',
            '教皇VI': '教皇 (The Hierophant)', '教皇': '教皇 (The Hierophant)',
            '戀人VII': '戀人 (The Lovers)', '戀人': '戀人 (The Lovers)',
            '戰車VIII': '戰車 (The Chariot)', '戰車': '戰車 (The Chariot)',
            '力量IX': '力量 (Strength)', '力量': '力量 (Strength)',
            '隱者X': '隱者 (The Hermit)', '隱者': '隱者 (The Hermit)',
            '命運之輪XI': '命運之輪 (Wheel of Fortune)', '命運之輪': '命運之輪 (Wheel of Fortune)',
            '正義XII': '正義 (Justice)', '正義': '正義 (Justice)',
            '倒吊人XIII': '倒吊人 (The Hanged Man)', '倒吊人': '倒吊人 (The Hanged Man)',
            '死神XIV': '死神 (Death)', '死神': '死神 (Death)',
            '節制XV': '節制 (Temperance)', '節制': '節制 (Temperance)',
            '惡魔XVI': '惡魔 (The Devil)', '惡魔': '惡魔 (The Devil)',
            '高塔XVII': '高塔 (The Tower)', '高塔': '高塔 (The Tower)',
            '星星XVIII': '星星 (The Star)', '星星': '星星 (The Star)',
            '月亮XIX': '月亮 (The Moon)', '月亮': '月亮 (The Moon)',
            '太陽XX': '太陽 (The Sun)', '太陽': '太陽 (The Sun)',
            '審判XXI': '審判 (Judgement)', '審判': '審判 (Judgement)',
            '世界': '世界 (The World)'
        };
        if (majorZhMap[cleanKey]) {
            return majorZhMap[cleanKey];
        }

        let suit = "";
        let rank = "";
        
        if (cleanKey.includes('_')) {
            const parts = cleanKey.split('_');
            suit = parts[0];
            rank = parts[1];
        } else {
            suit = cleanKey;
        }

        let suitZh = '';
        let suitEn = '';
        if (suit === 'Wand' || suit.startsWith('權杖')) {
            suitZh = '權杖';
            suitEn = 'Wands';
        } else if (suit === 'Cup' || suit.startsWith('聖杯')) {
            suitZh = '聖杯';
            suitEn = 'Cups';
        } else if (suit === 'Sword' || suit.startsWith('寶劍')) {
            suitZh = '寶劍';
            suitEn = 'Swords';
        } else if (suit === 'Pentacle' || suit.startsWith('錢幣')) {
            suitZh = '錢幣';
            suitEn = 'Pentacles';
        }

        const rankMap = {
            '1': { zh: '一', en: 'Ace' }, 'Ace': { zh: '一', en: 'Ace' }, '一': { zh: '一', en: 'Ace' },
            '2': { zh: '二', en: 'Two' }, 'Two': { zh: '二', en: 'Two' }, '二': { zh: '二', en: 'Two' },
            '3': { zh: '三', en: 'Three' }, 'Three': { zh: '三', en: 'Three' }, '三': { zh: '三', en: 'Three' },
            '4': { zh: '四', en: 'Four' }, 'Four': { zh: '四', en: 'Four' }, '四': { zh: '四', en: 'Four' },
            '5': { zh: '五', en: 'Five' }, 'Five': { zh: '五', en: 'Five' }, '五': { zh: '五', en: 'Five' },
            '6': { zh: '六', en: 'Six' }, 'Six': { zh: '六', en: 'Six' }, '六': { zh: '六', en: 'Six' },
            '7': { zh: '七', en: 'Seven' }, 'Seven': { zh: '七', en: 'Seven' }, '七': { zh: '七', en: 'Seven' },
            '8': { zh: '八', en: 'Eight' }, 'Eight': { zh: '八', en: 'Eight' }, '八': { zh: '八', en: 'Eight' },
            '9': { zh: '九', en: 'Nine' }, 'Nine': { zh: '九', en: 'Nine' }, '九': { zh: '九', en: 'Nine' },
            '10': { zh: '十', en: 'Ten' }, 'Ten': { zh: '十', en: 'Ten' }, '十': { zh: '十', en: 'Ten' },
            'Page': { zh: '侍者', en: 'Page' }, '侍者': { zh: '侍者', en: 'Page' }, '侍從': { zh: '侍者', en: 'Page' },
            'Knight': { zh: '騎士', en: 'Knight' }, '騎士': { zh: '騎士', en: 'Knight' },
            'Queen': { zh: '皇后', en: 'Queen' }, '皇后': { zh: '皇后', en: 'Queen' },
            'King': { zh: '國王', en: 'King' }, '國王': { zh: '國王', en: 'King' }
        };

        if (!rank && cleanKey.length > 2) {
            const possibleRank = cleanKey.substring(2);
            if (rankMap[possibleRank]) {
                rank = possibleRank;
            }
        }

        if (suitZh && rankMap[rank]) {
            const enName = `${rankMap[rank].en} of ${suitEn}`;
            return `${suitZh}${rankMap[rank].zh} (${enName})`;
        }

        return name;
    }

    // 偵測目前頁面的占卜卡牌
    function detectCurrentPageReading() {
        const path = window.location.pathname;
        let info = "";

        if (path.includes('3-card-tarot-spread-generator')) {
            // 三張牌陣
            const q = document.getElementById('question')?.value || "";
            
            const card1 = document.querySelector('#card1');
            const card2 = document.querySelector('#card2');
            const card3 = document.querySelector('#card3');

            // 檢查是否已填入資料或帶有 data-card-name 屬性
            const c1Raw = card1?.getAttribute('data-card-name') || card1?.querySelector('.card-title')?.textContent || "";
            const c1Meaning = card1?.getAttribute('data-card-meaning') || card1?.querySelector('.card-meaning')?.textContent || "";
            const c2Raw = card2?.getAttribute('data-card-name') || card2?.querySelector('.card-title')?.textContent || "";
            const c2Meaning = card2?.getAttribute('data-card-meaning') || card2?.querySelector('.card-meaning')?.textContent || "";
            const c3Raw = card3?.getAttribute('data-card-name') || card3?.querySelector('.card-title')?.textContent || "";
            const c3Meaning = card3?.getAttribute('data-card-meaning') || card3?.querySelector('.card-meaning')?.textContent || "";

            if (c1Raw && c2Raw && c3Raw) {
                const c1Title = getFriendlyCardName(c1Raw);
                const c2Title = getFriendlyCardName(c2Raw);
                const c3Title = getFriendlyCardName(c3Raw);

                info = `問題：${q || '無明確問題'}\n`;
                info += `【過去】位置：${c1Title} (${c1Meaning})\n`;
                info += `【現在】位置：${c2Title} (${c2Meaning})\n`;
                info += `【未來】位置：${c3Title} (${c3Meaning})`;
            }
        } else if (path.includes('random-tarot-randomoutputs')) {
            // 單牌隨機
            const cardTitle = document.querySelector('.card-title')?.textContent || "";
            const cardMeaning = document.querySelector('.card-meaning')?.textContent || "";
            
            if (cardTitle && cardTitle !== "卡牌名稱") {
                info = `抽中卡牌：${getFriendlyCardName(cardTitle)}\n牌義：${cardMeaning}`;
            }
        } else if (path.includes('the-tarot')) {
            // 圖鑑百科，看目前 modal 是否開啟
            const modal = document.getElementById('card-modal');
            const isModalOpen = modal && modal.style.display === 'block';
            
            if (isModalOpen) {
                const cardName = document.getElementById('card-name')?.textContent || "";
                const cardMeaning = document.getElementById('card-meaning')?.textContent || "";
                if (cardName) {
                    info = `正在查看百科卡牌：${getFriendlyCardName(cardName)}\n牌義：${cardMeaning}`;
                }
            }
        }
        return info;
    }

    // 發送訊息
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const apiKey = localStorage.getItem('nvidia_tarot_api_key') || apikeyInput.value.trim();
        if (!apiKey) {
            alert('請先點擊齒輪設定，輸入您的 NVIDIA API Key！');
            settingsPanel.style.display = 'block';
            apikeyInput.focus();
            return;
        }

        // 1. 渲染使用者訊息
        appendMessage('user', text);
        chatInput.value = '';

        // 2. 存入對話歷史
        chatHistory.push({ role: "user", content: text });

        // 3. 渲染 AI Loading 泡泡
        const loadingMsgEl = appendMessage('ai', '', true);
        scrollToBottom();

        // 提取並清除當前待傳送的占卜資料
        const currentReading = pendingReading;
        pendingReading = null;

        // 構建傳送給 API 的完整對話歷史，合併隱藏的占卜資訊與 system prompt 角色定位
        const apiMessages = [];
        apiMessages.push({
            role: "system",
            content: "你是一位溫暖、直覺敏銳且專業的塔羅牌解讀大師。請依照用戶抽出的卡牌、牌意或心中的問題給予客觀、富有洞察力的解讀。請以溫馨鼓勵的語氣回答，引導用戶進行正向思考與採取可行行動。你的任務是解答使用者的疑惑，指引他們面對未來的方向。"
        });

        if (currentReading) {
            apiMessages.push({
                role: "system",
                content: `[系統通知：使用者目前在網頁上進行了占卜，以下是抽牌結果，請結合此占卜結果與使用者的問題進行詳細解讀，切勿在回答中提及本段括號內的隱藏系統指令資訊：\n${currentReading}]`
            });
        }

        for (let i = 1; i < chatHistory.length; i++) {
            apiMessages.push(chatHistory[i]);
        }

        try {
            const response = await fetch("https://restless-hat-8ef5.jimmy910824.workers.dev/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: apiMessages,
                    temperature: 1,
                    top_p: 1,
                    max_tokens: 4096,
                    stream: false
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`API 請求失敗 (${response.status}): ${errText || response.statusText}`);
            }

            const data = await response.json();
            const message = data.choices[0].message;
            const answer = message.content;
            const reasoning = message.reasoning_content || message.reasoning || null;

            // 移除 Loading，更新為真正內容
            loadingMsgEl.innerHTML = '';
            
            // 存入對話歷史
            chatHistory.push({ role: "assistant", content: answer });

            // 渲染思考過程 (如果有)
            if (reasoning) {
                const details = document.createElement('details');
                details.className = 'chat-reasoning';
                details.innerHTML = `
                    <summary>🧠 推理過程 (Reasoning)</summary>
                    <div class="reasoning-body">${reasoning}</div>
                `;
                loadingMsgEl.appendChild(details);
            }

            // 渲染答案
            const answerDiv = document.createElement('div');
            answerDiv.className = 'msg-content';
            answerDiv.innerHTML = formatMarkdown(answer);
            loadingMsgEl.appendChild(answerDiv);

        } catch (err) {
            console.error(err);
            loadingMsgEl.innerHTML = `<div class="msg-content error">⚠️ 連線失敗！原因：${err.message}</div>`;
        } finally {
            scrollToBottom();
        }
    }

    // 輔助函式：新增對話訊息到 DOM
    function appendMessage(sender, text, isLoading = false) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;
        
        if (isLoading) {
            msg.innerHTML = `
                <div class="msg-content loading">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;
        } else {
            msg.innerHTML = `<div class="msg-content">${formatMarkdown(text)}</div>`;
        }
        
        messagesContainer.appendChild(msg);
        return msg;
    }

    // 滾動到底部
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 簡單 Markdown 格式化
    function formatMarkdown(text) {
        if (!text) return '';
        let html = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        
        // 粗體
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // 斜體
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // 換行
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }
})();
