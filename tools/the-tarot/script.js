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

// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
    const tarotGrid = document.querySelector('.tarot-grid');
    const modal = document.getElementById('card-modal');
    const closeBtn = document.querySelector('.close');
    const cardName = document.getElementById('card-name');
    const cardMeaning = document.getElementById('card-meaning');

    // 生成所有塔羅牌
    const allCards = [...tarotCards.major, ...tarotCards.minor];
    allCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'tarot-card';
        
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.style.backgroundImage = `url('../../images/${card.name}.png')`;
        cardFront.style.backgroundSize = 'contain';
        cardFront.style.backgroundRepeat = 'no-repeat';
        cardFront.style.backgroundPosition = 'center';
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = card.meaning;
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        
        cardElement.addEventListener('click', () => {
            cardName.textContent = card.name;
            cardMeaning.textContent = card.meaning;
            modal.style.display = 'block';
        });
        
        tarotGrid.appendChild(cardElement);
    });

    // Modal 關閉功能
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
});