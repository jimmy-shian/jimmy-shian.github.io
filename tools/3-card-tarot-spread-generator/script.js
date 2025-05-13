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
    const generateButton = document.getElementById('generateButton');
    const resultSection = document.querySelector('.result-section');
    const gptPrompt = document.getElementById('gptPrompt');
    const copyPrompt = document.getElementById('copyPrompt');
    
    // 抽牌按鈕點擊事件
    generateButton.addEventListener('click', () => {
        // 獲取使用者輸入
        const birthday = document.getElementById('birthday').value;
        const id = document.getElementById('id').value;
        const question = document.getElementById('question').value;
        
        // 生成三張牌
        const cards = generateThreeCards();
        
        // 更新牌陣顯示
        updateCardDisplay(cards);
        
        // 產生三張牌各自的說明
        const explanations = generateFakeAIExplanations(cards);
        let explanationText = explanations.map((exp, idx) => `【第${idx+1}張】${cards[idx].name}\n${exp}\n`).join('\n');
        gptPrompt.value = explanationText;
        
        // 僅console記錄組合（如需可再擴充）
        logCombination(cards, explanations);
        
        // 顯示結果區
        resultSection.style.display = 'block';
    });
    
    // 複製 prompt 到剪貼簿
    copyPrompt.addEventListener('click', () => {
        navigator.clipboard.writeText(gptPrompt.value)
            .then(() => {
                alert('已複製到剪貼簿！');
            })
            .catch(err => {
                console.error('複製失敗:', err);
                alert('複製失敗，請手動複製。');
            });
    });
});

// 生成三張牌的函數
function generateThreeCards() {
    const allCards = [...tarotCards.major, ...tarotCards.minor];
    const selectedCards = [];
    
    // 確保三張牌不重複
    while (selectedCards.length < 3) {
        const randomIndex = Math.floor(Math.random() * allCards.length);
        const card = allCards[randomIndex];
        
        if (!selectedCards.includes(card)) {
            selectedCards.push(card);
        }
    }
    
    return selectedCards;
}

// 更新牌陣顯示，支援滑鼠懸停翻轉
function updateCardDisplay(cards) {
    cards.forEach((card, index) => {
        const cardElement = document.getElementById(`card${index + 1}`);
        const cardImage = cardElement.querySelector('.card-image');
        const cardTitle = cardElement.querySelector('.card-title');
        const cardMeaning = cardElement.querySelector('.card-meaning');
        
        // 設置卡牌資訊
        const cardName = card.name.split('_')[0]; // 獲取卡牌名稱（去掉後綴）
        cardTitle.textContent = cardName;
        cardMeaning.textContent = card.meaning;
        
        // 設置卡牌圖片
        cardImage.style.backgroundImage = `url('../../images/${card.name}.png')`;
    });
}

// 每張卡牌三種說明（積極、消極、中立）
const cardExplanations = {
    // 大阿爾克那
    'Fool_I': [
        '【積極】新的冒險即將展開，充滿無限可能。這是一個全新的開始，你將獲得自由與成長的機會。',
        '【消極】過於衝動可能導致失誤，缺乏計劃可能帶來風險。請謹慎評估再行動。',
        '【中立】保持開放的心態，但也要注意現實的考量。這是一個學習與成長的時期。'
    ],
    'Magician_II': [
        '【積極】你的創造力與行動力達到高峰，能夠有效運用手中資源達成目標。',
        '【消極】可能過於依賴技巧而忽略真誠，或濫用才能操縱他人。',
        '【中立】專注於將潛能轉化為實際成果，平衡理想與現實。'
    ],
    'High_Priestess_III': [
        '【積極】直覺敏銳，內在智慧引導你找到答案。信任你的第六感。',
        '【消極】可能過於封閉或逃避現實，需要更主動面對問題。',
        '【中立】學習平衡理性與直覺，給自己時間沉澱思考。'
    ],
    'Empress_IV': [
        '【積極】豐盛與滋養的時期，創造力與生產力旺盛。',
        '【消極】可能過度放縱或依賴物質享受，忽略精神層面。',
        '【中立】學習在物質與精神間取得平衡，享受當下的豐盛。'
    ],
    'Emperor_V': [
        '【積極】領導才能與決策力強，能夠建立穩固基礎。',
        '【消極】可能過於專制或控制欲強，需要學習靈活變通。',
        '【中立】在權威與合作間取得平衡，發揮建設性領導力。'
    ],
    'Hierophant_VI': [
        '【積極】獲得傳統智慧與精神指引，找到人生導師。',
        '【消極】可能被教條束縛，需要打破常規思考。',
        '【中立】尊重傳統但不盲從，找到屬於自己的信仰道路。'
    ],
    'Lovers_VII': [
        '【積極】和諧的關係，真摯的愛與承諾。',
        '【消極】可能面臨感情抉擇或價值觀衝突。',
        '【中立】學習在關係中保持自我，同時與他人建立連結。'
    ],
    'Chariot_VIII': [
        '【積極】憑藉意志力與決心克服困難，邁向勝利。',
        '【消極】可能過於固執或控制欲過強，缺乏靈活性。',
        '【中立】在堅持與妥協間找到平衡，靈活應對挑戰。'
    ],
    'Strength_IX': [
        '【積極】內在力量強大，能夠溫柔而堅定地面對挑戰。',
        '【消極】可能過度壓抑情緒或過於強勢。',
        '【中立】學習平衡力量與溫柔，以智慧引導能量。'
    ],
    'Hermit_X': [
        '【積極】內省與獨處帶來深刻洞見，找到內在智慧。',
        '【消極】可能過於孤僻或逃避現實。',
        '【中立】在獨處與社交間取得平衡，適時尋求指引。'
    ],
    'Wheel_of_Fortune_XI': [
        '【積極】命運之輪轉動，帶來幸運與新機會。',
        '【消極】可能面臨突如其來的變化或命運的考驗。',
        '【中立】接受生命的起伏，在變化中保持平衡。'
    ],
    'Justice_XII': [
        '【積極】正義得到伸張，因果報應顯現。',
        '【消極】可能面臨不公平對待或需要為過去負責。',
        '【中立】誠實面對自己，為自己的選擇負責。'
    ],
    'Hanged_Man_XIII': [
        '【積極】換個角度看問題，獲得新的領悟。',
        '【消極】可能感到被困住或無力改變現狀。',
        '【中立】學習順其自然，接受當下的暫停與等待。'
    ],
    'Death_XIV': [
        '【積極】舊的結束帶來新的開始，徹底轉變的時機。',
        '【消極】可能抗拒必要的改變，執著於過去。',
        '【中立】接受生命中的結束與開始，放下執著。'
    ],
    'Temperance_XV': [
        '【積極】找到平衡與和諧，整合對立面。',
        '【消極】可能過度節制或缺乏熱情。',
        '【中立】學習調和極端，找到中庸之道。'
    ],
    'Devil_XVI': [
        '【積極】認清束縛，有機會掙脫負面模式。',
        '【消極】可能被物質慾望或負面情緒控制。',
        '【中立】正視自己的陰暗面，尋求釋放與轉化。'
    ],
    'Tower_XVII': [
        '【積極】突如其來的覺醒，打破虛假的安全感。',
        '【消極】可能面臨劇變或崩潰，需要重建。',
        '【中立】在混亂中尋找新的可能性，放下執著。'
    ],
    'Star_XVIII': [
        '【積極】希望與靈感湧現，心靈得到療癒。',
        '【消極】可能過於理想化或缺乏實際行動。',
        '【中立】在希望與現實間找到平衡，保持信心。'
    ],
    'Moon_XIX': [
        '【積極】直覺敏銳，探索潛意識的奧秘。',
        '【消極】可能被幻象迷惑或情緒困擾。',
        '【中立】學習解讀潛意識訊息，面對內在恐懼。'
    ],
    'Sun_XX': [
        '【積極】成功、快樂與成長的時期，充滿正能量。',
        '【消極】可能過於樂觀而忽略潛在問題。',
        '【中立】享受當下的喜悅，同時保持務實態度。'
    ],
    'Judgement_XXI': [
        '【積極】覺醒與重生的時刻，回應內在召喚。',
        '【消極】可能面臨過去的業力或自我批判。',
        '【中立】反思過去，準備好迎接新的開始。'
    ],
    'World': [
        '【積極】完成一個重要週期，獲得圓滿成就。',
        '【消極】可能過於自滿或抗拒結束。',
        '【中立】慶祝成就的同時，準備好展開新旅程。'
    ],
    // 小阿爾克那 - 權杖
    'Wand_1': [
        '【積極】新計劃的開始，充滿熱情與動力。',
        '【消極】可能缺乏持久力或過於衝動。',
        '【中立】將創意轉化為實際行動的時機。'
    ],
    'Wand_2': [
        '【積極】規劃未來，做出明智選擇。',
        '【消極】可能猶豫不決或過度分析。',
        '【中立】權衡選項，做出最佳決定。'
    ],
    'Wand_3': [
        '【積極】事業擴展，合作帶來成功。',
        '【消極】可能過度擴張或承諾過多。',
        '【中立】尋找新的機會與可能性。'
    ],
    'Wand_4': [
        '【積極】穩固的基礎，享受勞動成果。',
        '【消極】可能安於現狀，缺乏進取心。',
        '【中立】在穩定中尋找成長的機會。'
    ],
    'Wand_5': [
        '【積極】在競爭中脫穎而出的機會。',
        '【消極】可能陷入無謂的爭執或衝突。',
        '【中立】學習處理競爭與衝突的技巧。'
    ],
    'Wand_6': [
        '【積極】獲得認可與成就，勝利在望。',
        '【消極】可能過於在意他人眼光。',
        '【中立】享受成功的同時保持謙遜。'
    ],
    'Wand_7': [
        '【積極】堅守立場，保衛自己的利益。',
        '【消極】可能過於防衛或固執己見。',
        '【中立】在堅持與妥協間找到平衡。'
    ],
    'Wand_8': [
        '【積極】迅速行動，把握轉瞬即逝的機會。',
        '【消極】可能過於急躁或衝動行事。',
        '【中立】在速度與謹慎間取得平衡。'
    ],
    'Wand_9': [
        '【積極】堅持到底，克服最後的考驗。',
        '【消極】可能感到疲憊或失去動力。',
        '【中立】保持耐心，勝利在望。'
    ],
    'Wand_10': [
        '【積極】承擔責任，為成功付出代價。',
        '【消極】可能負擔過重或壓力過大。',
        '【中立】學習管理壓力與責任。'
    ],
    'Wand_Page': [
        '【積極】充滿熱情與冒險精神，樂於探索。',
        '【消極】可能缺乏經驗或過於天真。',
        '【中立】保持好奇心，勇於嘗試新事物。'
    ],
    'Wand_Knight': [
        '【積極】充滿行動力，追求夢想。',
        '【消極】可能過於衝動或缺乏耐心。',
        '【中立】在熱情與耐心間找到平衡。'
    ],
    'Wand_Queen': [
        '【積極】充滿魅力與自信，激勵他人。',
        '【消極】可能過於強勢或控制欲強。',
        '【中立】發揮領導力，同時尊重他人。'
    ],
    'Wand_King': [
        '【積極】有遠見的領導者，激發團隊潛能。',
        '【消極】可能過於專制或固執。',
        '【中立】平衡權威與開明，引領方向。'
    ],
    // 小阿爾克那 - 聖杯
    'Cup_1': [
        '【積極】新感情的開始，情感豐沛。',
        '【消極】可能過於情緒化或不切實際。',
        '【中立】敞開心胸，接受情感的流動。'
    ],
    'Cup_2': [
        '【積極】和諧的夥伴關係，真摯的連結。',
        '【消極】可能關係不平衡或依賴。',
        '【中立】在關係中保持自我，同時建立連結。'
    ],
    'Cup_3': [
        '【積極】歡慶與友誼，分享喜悅。',
        '【消極】可能過度放縱或膚淺社交。',
        '【中立】享受社交，同時保持真誠。'
    ],
    'Cup_4': [
        '【積極】內省時刻，重新評估價值觀。',
        '【消極】可能感到不滿足或冷漠。',
        '【中立】給自己時間沉澱，尋找真正渴望。'
    ],
    'Cup_5': [
        '【積極】從失落中學習，尋找新的希望。',
        '【消極】可能沉浸在悲傷中無法自拔。',
        '【中立】接受失落，同時看到身邊的支持。'
    ],
    'Cup_6': [
        '【積極】重溫美好回憶，療癒過去。',
        '【消極】可能過度留戀過去。',
        '【中立】從回憶中學習，活在當下。'
    ],
    'Cup_7': [
        '【積極】多種可能性，豐富的選擇。',
        '【消極】可能被幻想迷惑或優柔寡斷。',
        '【中立】釐清真正渴望，做出選擇。'
    ],
    'Cup_8': [
        '【積極】離開舒適圈，追尋更有意義的生活。',
        '【消極】可能逃避問題或感到迷失。',
        '【中立】評估當下，決定前進方向。'
    ],
    'Cup_9': [
        '【積極】願望實現，心滿意足。',
        '【消極】可能過於自滿或物質主義。',
        '【中立】享受成就，同時保持感恩。'
    ],
    'Cup_10': [
        '【積極】家庭和諧，情感圓滿。',
        '【消極】可能家庭關係緊張或逃避家庭責任。',
        '【中立】在家庭與個人間找到平衡。'
    ],
    'Cup_Page': [
        '【積極】浪漫的開始，創意靈感湧現。',
        '【消極】可能過於理想化或情緒化。',
        '【中立】保持開放，接受情感的啟發。'
    ],
    'Cup_Knight': [
        '【積極】浪漫追求，理想主義。',
        '【消極】可能逃避承諾或過度幻想。',
        '【中立】在理想與現實間找到平衡。'
    ],
    'Cup_Queen': [
        '【積極】富有同理心，直覺敏銳。',
        '【消極】可能過度情緒化或依賴。',
        '【中立】用智慧引導情感，保持平衡。'
    ],
    'Cup_King': [
        '【積極】情感成熟，智慧引導。',
        '【消極】可能壓抑情感或過度控制。',
        '【中立】在理性與感性間取得平衡。'
    ],
    // 小阿爾克那 - 寶劍
    'Sword_1': [
        '【積極】清晰的思維，果斷的決定。',
        '【消極】可能過於尖銳或傷人。',
        '【中立】用智慧與誠實面對問題。'
    ],
    'Sword_2': [
        '【積極】權衡選項，做出艱難決定。',
        '【消極】可能優柔寡斷或逃避選擇。',
        '【中立】在對立中尋找平衡點。'
    ],
    'Sword_3': [
        '【積極】從心碎中學習，釋放痛苦。',
        '【消極】可能深陷悲傷或自憐。',
        '【中立】接受痛苦，尋找治癒之路。'
    ],
    'Sword_4': [
        '【積極】必要的休息與恢復期。',
        '【消極】可能逃避問題或停滯不前。',
        '【中立】在行動與休息間找到平衡。'
    ],
    'Sword_5': [
        '【積極】在競爭中脫穎而出。',
        '【消極】可能贏了戰役輸了戰爭。',
        '【中立】評估衝突的代價與收穫。'
    ],
    'Sword_6': [
        '【積極】過渡期，離開困境。',
        '【消極】可能逃避問題而非解決。',
        '【中立】接受改變，邁向新階段。'
    ],
    'Sword_7': [
        '【積極】機智應對，策略性思考。',
        '【消極】可能欺騙或自欺欺人。',
        '【中立】誠實面對自己與他人。'
    ],
    'Sword_8': [
        '【積極】認清自我限制，尋求解脫。',
        '【消極】可能感到無助或受困。',
        '【中立】尋找內在力量，突破困境。'
    ],
    'Sword_9': [
        '【積極】面對恐懼，釋放焦慮。',
        '【消極】可能被擔憂壓垮。',
        '【中立】正視問題，尋求解決方案。'
    ],
    'Sword_10': [
        '【積極】痛苦的結束，新生的開始。',
        '【消極】可能深陷絕望或背叛感。',
        '【中立】接受結束，準備重生。'
    ],
    'Sword_Page': [
        '【積極】好奇心強，追求知識。',
        '【消極】可能過於批判或八卦。',
        '【中立】保持警覺，客觀分析。'
    ],
    'Sword_Knight': [
        '【積極】果斷行動，追求真理。',
        '【消極】可能過於衝動或好鬥。',
        '【中立】在行動前謹慎思考。'
    ],
    'Sword_Queen': [
        '【積極】清晰思考，獨立判斷。',
        '【消極】可能過於理性或冷漠。',
        '【中立】平衡理性與同理心。'
    ],
    'Sword_King': [
        '【積極】智慧領導，公正決策。',
        '【消極】可能過於嚴厲或專制。',
        '【中立】運用智慧與經驗引導他人。'
    ],
    // 小阿爾克那 - 錢幣
    'Pentacle_1': [
        '【積極】新的財務機會，物質豐盛。',
        '【消極】可能錯失機會或財務不穩。',
        '【中立】把握機會，務實規劃。'
    ],
    'Pentacle_2': [
        '【積極】財務平衡，資源調配得當。',
        '【消極】可能財務不穩或決策搖擺。',
        '【中立】在變動中保持平衡。'
    ],
    'Pentacle_3': [
        '【積極】技能提升，事業進步。',
        '【消極】可能過度工作或缺乏認可。',
        '【中立】專注於長期成長與學習。'
    ],
    'Pentacle_4': [
        '【積極】財務穩固，善於理財。',
        '【消極】可能過於吝嗇或控制欲強。',
        '【中立】在節省與分享間取得平衡。'
    ],
    'Pentacle_5': [
        '【積極】在困境中獲得支持與幫助。',
        '【消極】可能財務困難或感到匱乏。',
        '【中立】尋求協助，共同度過難關。'
    ],
    'Pentacle_6': [
        '【積極】慷慨分享，善有善報。',
        '【消極】可能過度付出或權力不平衡。',
        '【中立】在給予與接受間找到平衡。'
    ],
    'Pentacle_7': [
        '【積極】耐心等待投資回報。',
        '【消極】可能缺乏行動或進展緩慢。',
        '【中立】評估進展，調整策略。'
    ],
    'Pentacle_8': [
        '【積極】專注努力，技能精進。',
        '【消極】可能過度工作或缺乏回報。',
        '【中立】堅持努力，追求卓越。'
    ],
    'Pentacle_9': [
        '【積極】財務獨立，享受成果。',
        '【消極】可能過度物質主義。',
        '【中立】在物質與精神間取得平衡。'
    ],
    'Pentacle_10': [
        '【積極】家族興旺，財富傳承。',
        '【消極】可能家庭責任過重。',
        '【中立】珍惜家庭與傳統，同時開創未來。'
    ],
    'Pentacle_Page': [
        '【積極】學習理財，新機會出現。',
        '【消極】可能缺乏經驗或計劃。',
        '【中立】保持開放，學習理財知識。'
    ],
    'Pentacle_Knight': [
        '【積極】勤奮踏實，穩步前進。',
        '【消極】可能過於保守或缺乏彈性。',
        '【中立】在穩健與冒險間找到平衡。'
    ],
    'Pentacle_Queen': [
        '【積極】理財有方，照顧他人。',
        '【消極】可能過度控制或物質主義。',
        '【中立】用智慧管理資源，分享豐盛。'
    ],
    'Pentacle_King': [
        '【積極】事業成功，財務穩固。',
        '【消極】可能過於重視物質成就。',
        '【中立】在事業成功與生活品質間取得平衡。'
    ]
};

// 產生三張牌的說明組合（每張各隨機一種說明）
function generateFakeAIExplanations(cards) {
    return cards.map(card => {
        const exps = cardExplanations[card.name];
        const idx = Math.floor(Math.random() * exps.length);
        return exps[idx];
    });
}

// 不再下載txt檔案，僅於console顯示組合（如需可再擴充）
function logCombination(cards, explanations) {
    const title = `組合：${cards[0].name}, ${cards[1].name}, ${cards[2].name}`;
    const text = explanations.map((exp, idx) => `卡牌${idx+1}:\n${exp}`).join('\n\n');
    const content = `${title}\n${text}\n--------------------------\n`;
    console.log(content);
}

// 生成 GPT prompt
function generateGPTPrompt(cards, birthday, id, question) {
    const prompts = [];
    
    // 基本提示
    prompts.push("你是一位專業的塔羅牌師，請根據以下三張牌的牌陣，為我提供深入的解讀。\n");
    
    // 牌陣說明
    prompts.push("牌陣：過去、現在、未來\n");
    prompts.push(`過去：${cards[0].name} - ${cards[0].meaning}\n`);
    prompts.push(`現在：${cards[1].name} - ${cards[1].meaning}\n`);
    prompts.push(`未來：${cards[2].name} - ${cards[2].meaning}\n\n`);
    
    // 使用者資訊
    if (birthday) {
        prompts.push(`生日：${birthday}\n`);
    }
    if (id) {
        prompts.push(`身分證字號：${id}\n`);
    }
    if (question) {
        prompts.push(`問題：${question}\n\n`);
    }
    
    // 請求格式
    prompts.push("請根據以上資訊，為我提供：\n");
    prompts.push("1. 每張牌的詳細解讀\n");
    prompts.push("2. 三張牌之間的相互關係\n");
    prompts.push("3. 對於使用者問題的具體建議\n");
    prompts.push("4. 未來發展的可能方向\n");
    prompts.push("5. 需要注意的事項\n");
    
    return prompts.join("");
}