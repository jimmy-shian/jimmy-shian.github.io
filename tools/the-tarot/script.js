// 塔羅牌資料
const tarotCards = {
    major: [
        { name: 'Fool_I', meaning: '新的冒險、自由、無限可能' },
        { name: 'Magician_II', meaning: '創造力、行動力、資源運用' },
        { name: 'High_Priestess_III', meaning: '直覺、潛意識、神秘' },
        { name: 'Empress_IV', meaning: '豐盛、滋養、母性' },
        { name: 'Emperor_V', meaning: '權威、秩序、掌控' },
        { name: 'Hierophant_VI', meaning: '傳統、信仰、精神指引' },
        { name: 'Lovers_VII', meaning: '愛情、和諧、選擇' },
        { name: 'Chariot_VIII', meaning: '勝利、意志力、掌控' },
        { name: 'Strength_IX', meaning: '勇氣、堅持、內在力量' },
        { name: 'Hermit_X', meaning: '尋求真理、內省、指引' },
        { name: 'Wheel_of_Fortune_XI', meaning: '命運、循環、轉變' },
        { name: 'Justice_XII', meaning: '公平、平衡、因果' },
        { name: 'Hanged_Man_XIII', meaning: '等待、犧牲、新觀點' },
        { name: 'Death_XIV', meaning: '結束、轉變、新生' },
        { name: 'Temperance_XV', meaning: '平衡、節制、整合' },
        { name: 'Devil_XVI', meaning: '束縛、誘惑、陰影' },
        { name: 'Tower_XVII', meaning: '突變、瓦解、覺醒' },
        { name: 'Star_XVIII', meaning: '希望、療癒、靈感' },
        { name: 'Moon_XIX', meaning: '潛意識、幻象、直覺' },
        { name: 'Sun_XX', meaning: '成功、快樂、成長' },
        { name: 'Judgement_XXI', meaning: '覺醒、救贖、新生' },
        { name: 'World', meaning: '完成、圓滿、成就' }
    ],
    minor: [
        // 權杖
        { name: 'Wand_1', meaning: '新計畫、動力、開始' },
        { name: 'Wand_2', meaning: '規劃、遠見、選擇' },
        { name: 'Wand_3', meaning: '拓展、合作、前進' },
        { name: 'Wand_4', meaning: '慶祝、穩定、團結' },
        { name: 'Wand_5', meaning: '競爭、衝突、挑戰' },
        { name: 'Wand_6', meaning: '勝利、認可、成就' },
        { name: 'Wand_7', meaning: '防衛、堅持、立場' },
        { name: 'Wand_8', meaning: '迅速、訊息、行動' },
        { name: 'Wand_9', meaning: '堅持、考驗、準備' },
        { name: 'Wand_10', meaning: '負擔、壓力、責任' },
        { name: 'Wand_Page', meaning: '熱情、冒險、消息' },
        { name: 'Wand_Knight', meaning: '衝勁、行動、變動' },
        { name: 'Wand_Queen', meaning: '自信、獨立、魅力' },
        { name: 'Wand_King', meaning: '領導、遠見、權威' },
        // 聖杯
        { name: 'Cup_1', meaning: '新感情、靈感、喜悅' },
        { name: 'Cup_2', meaning: '夥伴、結合、吸引' },
        { name: 'Cup_3', meaning: '友誼、慶祝、社交' },
        { name: 'Cup_4', meaning: '冷淡、沉思、無聊' },
        { name: 'Cup_5', meaning: '失落、遺憾、悲傷' },
        { name: 'Cup_6', meaning: '回憶、童年、懷舊' },
        { name: 'Cup_7', meaning: '幻想、選擇、誘惑' },
        { name: 'Cup_8', meaning: '離開、尋找、失望' },
        { name: 'Cup_9', meaning: '滿足、願望、成就' },
        { name: 'Cup_10', meaning: '幸福、和諧、家庭' },
        { name: 'Cup_Page', meaning: '浪漫、消息、創意' },
        { name: 'Cup_Knight', meaning: '追求、邀請、理想' },
        { name: 'Cup_Queen', meaning: '體貼、直覺、溫柔' },
        { name: 'Cup_King', meaning: '成熟、智慧、情感平衡' },
        // 寶劍
        { name: 'Sword_1', meaning: '新想法、決心、真理' },
        { name: 'Sword_2', meaning: '抉擇、平衡、猶豫' },
        { name: 'Sword_3', meaning: '心碎、分離、療癒' },
        { name: 'Sword_4', meaning: '休息、沉澱、恢復' },
        { name: 'Sword_5', meaning: '衝突、競爭、爭執' },
        { name: 'Sword_6', meaning: '過渡、旅行、釋放' },
        { name: 'Sword_7', meaning: '謀略、欺瞞、逃避' },
        { name: 'Sword_8', meaning: '束縛、限制、困境' },
        { name: 'Sword_9', meaning: '焦慮、擔憂、失眠' },
        { name: 'Sword_10', meaning: '結束、背叛、痛苦' },
        { name: 'Sword_Page', meaning: '警覺、觀察、學習' },
        { name: 'Sword_Knight', meaning: '果斷、行動、衝動' },
        { name: 'Sword_Queen', meaning: '理性、獨立、誠實' },
        { name: 'Sword_King', meaning: '權威、邏輯、公正' },
        // 錢幣
        { name: 'Pentacle_1', meaning: '新機會、財富、實現' },
        { name: 'Pentacle_2', meaning: '平衡、適應、調整' },
        { name: 'Pentacle_3', meaning: '合作、技能、成長' },
        { name: 'Pentacle_4', meaning: '保守、控制、積蓄' },
        { name: 'Pentacle_5', meaning: '貧困、失落、支持' },
        { name: 'Pentacle_6', meaning: '施予、分享、幫助' },
        { name: 'Pentacle_7', meaning: '等待、評估、耐心' },
        { name: 'Pentacle_8', meaning: '努力、專注、學習' },
        { name: 'Pentacle_9', meaning: '獨立、豐盛、享受' },
        { name: 'Pentacle_10', meaning: '財富、家族、成就' },
        { name: 'Pentacle_Page', meaning: '計畫、學習、機會' },
        { name: 'Pentacle_Knight', meaning: '勤奮、實在、責任' },
        { name: 'Pentacle_Queen', meaning: '實際、溫暖、照顧' },
        { name: 'Pentacle_King', meaning: '穩定、富有、領導' }
    ]
};

function getCardDisplayName(name) {
    const majorMap = {
        'Fool_I': '愚者 (The Fool)',
        'Magician_II': '魔術師 (The Magician)',
        'High_Priestess_III': '女祭司 (The High Priestess)',
        'Empress_IV': '女皇 (The Empress)',
        'Emperor_V': '皇帝 (The Emperor)',
        'Hierophant_VI': '教皇 (The Hierophant)',
        'Lovers_VII': '戀人 (The Lovers)',
        'Chariot_VIII': '戰車 (The Chariot)',
        'Strength_IX': '力量 (Strength)',
        'Hermit_X': '隱者 (The Hermit)',
        'Wheel_of_Fortune_XI': '命運之輪 (Wheel of Fortune)',
        'Justice_XII': '正義 (Justice)',
        'Hanged_Man_XIII': '倒吊人 (The Hanged Man)',
        'Death_XIV': '死神 (Death)',
        'Temperance_XV': '節制 (Temperance)',
        'Devil_XVI': '惡魔 (The Devil)',
        'Tower_XVII': '高塔 (The Tower)',
        'Star_XVIII': '星星 (The Star)',
        'Moon_XIX': '月亮 (The Moon)',
        'Sun_XX': '太陽 (The Sun)',
        'Judgement_XXI': '審判 (Judgement)',
        'World': '世界 (The World)'
    };
    if (majorMap[name]) {
        return majorMap[name];
    }
    
    const parts = name.split('_');
    const suit = parts[0];
    const rank = parts[1];
    
    let suitZh = '';
    let suitEn = '';
    if (suit === 'Wand') {
        suitZh = '權杖';
        suitEn = 'Wands';
    } else if (suit === 'Cup') {
        suitZh = '聖杯';
        suitEn = 'Cups';
    } else if (suit === 'Sword') {
        suitZh = '寶劍';
        suitEn = 'Swords';
    } else if (suit === 'Pentacle') {
        suitZh = '錢幣';
        suitEn = 'Pentacles';
    }
    
    const rankMap = {
        '1': { zh: '一', en: 'Ace' },
        '2': { zh: '二', en: 'Two' },
        '3': { zh: '三', en: 'Three' },
        '4': { zh: '四', en: 'Four' },
        '5': { zh: '五', en: 'Five' },
        '6': { zh: '六', en: 'Six' },
        '7': { zh: '七', en: 'Seven' },
        '8': { zh: '八', en: 'Eight' },
        '9': { zh: '九', en: 'Nine' },
        '10': { zh: '十', en: 'Ten' },
        'Page': { zh: '侍者', en: 'Page' },
        'Knight': { zh: '騎士', en: 'Knight' },
        'Queen': { zh: '皇后', en: 'Queen' },
        'King': { zh: '國王', en: 'King' }
    };
    
    if (rankMap[rank]) {
        const isCourt = ['Page', 'Knight', 'Queen', 'King'].includes(rank);
        const enName = isCourt ? `${rankMap[rank].en} of ${suitEn}` : `${rankMap[rank].en} of ${suitEn}`;
        return `${suitZh}${rankMap[rank].zh} (${enName})`;
    }
    
    return name;
}

function getCardId(rawName) {
    const majorMap = {
        'Fool_I': 'major_00', 'Magician_II': 'major_01', 'High_Priestess_III': 'major_02',
        'Empress_IV': 'major_03', 'Emperor_V': 'major_04', 'Hierophant_VI': 'major_05',
        'Lovers_VII': 'major_06', 'Chariot_VIII': 'major_07', 'Strength_IX': 'major_08',
        'Hermit_X': 'major_09', 'Wheel_of_Fortune_XI': 'major_10', 'Justice_XII': 'major_11',
        'Hanged_Man_XIII': 'major_12', 'Death_XIV': 'major_13', 'Temperance_XV': 'major_14',
        'Devil_XVI': 'major_15', 'Tower_XVII': 'major_16', 'Star_XVIII': 'major_17',
        'Moon_XIX': 'major_18', 'Sun_XX': 'major_19', 'Judgement_XXI': 'major_20',
        'World': 'major_21'
    };
    if (majorMap[rawName]) return majorMap[rawName];

    if (rawName.includes('_')) {
        const [suit, rank] = rawName.split('_');
        const suitPrefix = {
            'Wand': 'wands', 'Cup': 'cups', 'Sword': 'swords', 'Pentacle': 'pentacles'
        }[suit] || suit.toLowerCase();
        
        let rankStr = rank.toLowerCase();
        if (!isNaN(parseInt(rank))) {
            rankStr = parseInt(rank).toString().padStart(2, '0');
        }
        return `${suitPrefix}_${rankStr}`;
    }
    return rawName.toLowerCase();
}

// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
    const gridMajor = document.getElementById('grid-major');
    const gridWands = document.getElementById('grid-wands');
    const gridCups = document.getElementById('grid-cups');
    const gridSwords = document.getElementById('grid-swords');
    const gridPentacles = document.getElementById('grid-pentacles');

    const modal = document.getElementById('card-modal');
    const closeBtn = document.querySelector('.close');
    const cardName = document.getElementById('card-name');
    const cardMeaning = document.getElementById('card-meaning');
    let flippedCard = null;

    // 生成所有塔羅牌
    const allCards = [...tarotCards.major, ...tarotCards.minor];
    allCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'tarot-card';
        
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        
        const cardId = getCardId(card.name);
        cardFront.style.backgroundImage = `url('../../images/tarot/web/${cardId}.webp')`;
        cardFront.style.backgroundSize = 'cover';
        cardFront.style.backgroundRepeat = 'no-repeat';
        cardFront.style.backgroundPosition = 'center';
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        
        const cardBackContent = document.createElement('div');
        cardBackContent.style.padding = '15px';
        cardBackContent.textContent = card.meaning;
        cardBack.appendChild(cardBackContent);
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        
        // 加上卡牌小標
        const cardTitleLabel = document.createElement('div');
        cardTitleLabel.className = 'card-title-label';
        
        const cardNameText = document.createElement('div');
        cardNameText.className = 'card-name-text';
        cardNameText.textContent = getCardDisplayName(card.name);
        
        const cardMeaningText = document.createElement('div');
        cardMeaningText.className = 'card-meaning-text';
        cardMeaningText.textContent = card.meaning;
        
        cardTitleLabel.appendChild(cardNameText);
        cardTitleLabel.appendChild(cardMeaningText);
        cardElement.appendChild(cardTitleLabel);
        
        cardElement.addEventListener('click', (e) => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
            if (isMobile) {
                e.stopPropagation(); // 防止冒泡
        
                // 如果已經翻了某張卡，而且是這張卡，再次點擊時翻回來
                if (flippedCard && flippedCard === cardInner) {
                    cardInner.classList.remove('is-flipped');
                    flippedCard = null;
                } else {
                    // 若已有其他牌翻開，先把那張翻回來
                    if (flippedCard) {
                        flippedCard.classList.remove('is-flipped');
                    }
                    // 翻新的一張牌
                    cardInner.classList.add('is-flipped');
                    flippedCard = cardInner;
                }
            } else {
                // 桌面顯示 modal
                cardName.textContent = getCardDisplayName(card.name);
                cardMeaning.textContent = card.meaning;
                modal.style.display = 'block';
            }
        });
        
        // 判斷分發到哪一個 grid 容器
        let targetGrid = gridMajor;
        if (card.name.startsWith('Wand')) {
            targetGrid = gridWands;
        } else if (card.name.startsWith('Cup')) {
            targetGrid = gridCups;
        } else if (card.name.startsWith('Sword')) {
            targetGrid = gridSwords;
        } else if (card.name.startsWith('Pentacle')) {
            targetGrid = gridPentacles;
        }
        
        if (targetGrid) {
            targetGrid.appendChild(cardElement);
        }
    });

    // 分類過濾切換功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    const sections = document.querySelectorAll('.tarot-section');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新 active class
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            sections.forEach(sec => {
                if (category === 'all') {
                    sec.style.display = 'block';
                } else if (category === 'major' && sec.id === 'sec-major') {
                    sec.style.display = 'block';
                } else if (category === 'wands' && sec.id === 'sec-wands') {
                    sec.style.display = 'block';
                } else if (category === 'cups' && sec.id === 'sec-cups') {
                    sec.style.display = 'block';
                } else if (category === 'swords' && sec.id === 'sec-swords') {
                    sec.style.display = 'block';
                } else if (category === 'pentacles' && sec.id === 'sec-pentacles') {
                    sec.style.display = 'block';
                } else {
                    sec.style.display = 'none';
                }
            });
        });
    });

    // Modal 關閉功能
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        // 點擊 modal 背景時關閉 modal（桌機用）
        if (event.target === modal) {
            modal.style.display = 'none';
        }

        // 手機裝置點空白區，讓翻牌恢復原狀
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile && flippedCard) {
            flippedCard.classList.remove('is-flipped');
            flippedCard = null;
        }
    });
});