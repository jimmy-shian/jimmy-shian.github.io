// 完整塔羅牌工具腳本（合併 randomoutputs, 23lotus, randomtarotcardgenerator, random-tarot-card-generator, random-tarot-aibro）

// 塔羅牌資料 - 大阿爾卡那與小阿爾卡那完整版
const tarotCards = {
    major: [
        { name: '愚者I', meaning: '開始新的冒險，充滿希望與可能性', ai: [
            '愚者象徵無限的潛能與新起點，你正站在人生的十字路口。',
            '保持開放心態，勇敢追夢，人生充滿驚喜等待你發現。',
            '這是一個放下過去、迎向未知的時刻，信任直覺前行。'
        ] },
        { name: '魔術師II', meaning: '創造力與行動力，將想法轉化為現實', ai: [
            '魔術師提醒你善用資源，將想法具體實現。',
            '現在是展現自信與主動的最佳時機。',
            '運用你的技能與創意，開創屬於自己的道路。'
        ] },
        { name: '女祭司III', meaning: '直覺與內在智慧，傾聽內在聲音', ai: [
            '女祭司提醒你要相信自己的直覺與潛意識。',
            '這是一個需要內省與沉思的時刻。',
            '隱藏的訊息即將顯現，保持開放的心靈。'
        ] },
        { name: '皇后IV', meaning: '豐饒、滋養與母性力量', ai: [
            '皇后象徵豐盛與創造力，是孕育夢想的時刻。',
            '接納自己的情感與感受，讓創意自然流動。',
            '照顧好自己，才能更好地照顧他人。'
        ] },
        { name: '皇帝V', meaning: '權威、結構與領導力', ai: [
            '皇帝提醒你要為自己的生活建立穩固的基礎。',
            '現在是展現領導力的時候，但也要保持靈活。',
            '結構與紀律將幫助你實現目標。'
        ] },
        { name: '教皇VI', meaning: '傳統、信仰與精神指引', ai: [
            '教皇代表尋求智慧與精神指引。',
            '傳統價值觀與信仰體系可能對你有所幫助。',
            '尋找導師或成為他人的導師。'
        ] },
        { name: '戀人VII', meaning: '關係、選擇與和諧', ai: [
            '戀人牌提醒你關係中的和諧與平衡。',
            '面對重要選擇時，跟隨內心的聲音。',
            '真誠的連結建立在相互尊重與理解的基礎上。'
        ] },
        { name: '戰車VIII', meaning: '意志力、勝利與前進', ai: [
            '戰車象徵通過意志力克服障礙。',
            '保持專注與決心，你將取得成功。',
            '平衡對立的力量，找到前進的方向。'
        ] },
        { name: '力量IX', meaning: '內在力量、勇氣與耐心', ai: [
            '力量牌提醒你真正的力量來自內在。',
            '以溫和但堅定的方式面對挑戰。',
            '勇氣與同情心並存，才是真正的力量。'
        ] },
        { name: '隱者X', meaning: '內省、智慧與獨處', ai: [
            '隱士邀請你進行內在探索。',
            '獨處時光能帶來深刻的洞見。',
            '有時需要暫時遠離喧囂，尋找內在的指引。'
        ] },
        { name: '命運之輪XI', meaning: '命運的轉變與週期', ai: [
            '命運之輪提醒你生命是循環往復的。',
            '接受變化，順應生命的流動。',
            '好運與挑戰都是暫時的，保持平衡心態。'
        ] },
        { name: '正義XII', meaning: '公平、真相與因果', ai: [
            '正義牌提醒你每個選擇都有其後果。',
            '誠實地面對自己與他人。',
            '尋求平衡與公平的解決方案。'
        ] },
        { name: '倒吊人XIII', meaning: '犧牲、新視角與等待', ai: [
            '倒吊人邀請你從不同角度看問題。',
            '有時候放下控制反而能獲得更多。',
            '這段等待的時光有其意義，保持耐心。'
        ] },
        { name: '死神XIV', meaning: '結束、轉變與新生', ai: [
            '死神象徵必要的結束與轉變。',
            '放下不再服務於你的事物，為新生創造空間。',
            '每個結束都是新開始的機會。'
        ] },
        { name: '節制XV', meaning: '平衡、調和與耐心', ai: [
            '節制牌提醒你尋找生活中的平衡點。',
            '調和對立的力量，找到中庸之道。',
            '耐心與適應力是現在的關鍵。'
        ] },
        { name: '惡魔XVI', meaning: '束縛、慾望與物質依賴', ai: [
            '惡魔牌提醒你審視自己的束縛。',
            '什麼限制了你？這些限制是真實的還是自我設限？',
            '釋放對物質或關係的不健康依賴。'
        ] },
        { name: '高塔XVII', meaning: '突變、瓦解與覺醒', ai: [
            '高塔象徵突如其來的改變與覺醒。',
            '看似破壞性的變化可能帶來必要的突破。',
            '釋放舊有結構，為新的可能性騰出空間。'
        ] },
        { name: '星星XVIII', meaning: '希望、靈感與療癒', ai: [
            '星星帶來希望與靈感之光。',
            '相信宇宙的支持與指引。',
            '療癒的時刻，對未來保持信心。'
        ] },
        { name: '月亮XIX', meaning: '潛意識、直覺與幻象', ai: [
            '月亮邀請你探索潛意識的領域。',
            '事情可能不像表面看起來那樣，相信你的直覺。',
            '面對恐懼，穿越迷霧尋找真相。'
        ] },
        { name: '太陽XX', meaning: '成功、快樂與活力', ai: [
            '太陽象徵成功、快樂與生命力。',
            '你正處在一個充滿能量與樂觀的時期。',
            '享受當下的喜悅，分享你的熱情。'
        ] },
        { name: '審判XXI', meaning: '覺醒、重生與新的開始', ai: [
            '審判牌象徵覺醒與重生的時刻。',
            '過去的經驗帶來新的理解與智慧。',
            '回應內在的召喚，開始新的生命階段。'
        ] },
        { name: '世界', meaning: '完成、成就與整合', ai: [
            '世界牌象徵一個階段的圓滿完成。',
            '你已經走過一個完整的循環，準備好迎接新的開始。',
            '慶祝成就，同時保持開放迎接新的可能性。'
        ] }
    ],
    minor: [
        // 權杖組 (Wands) - 火元素，代表行動、熱情與創造力
        { name: '權杖一', meaning: '新的開始與行動力', ai: [
            '權杖一代表行動的起點與熱情。',
            '你擁有推動計畫前進的力量。',
            '抓住機會，勇敢啟動新旅程。'
        ] },
        { name: '權杖二', meaning: '規劃未來與決策', ai: [
            '權杖二邀請你做出重要決定。',
            '考慮所有選項，然後採取行動。',
            '你正處於規劃未來的關鍵時刻。'
        ] },
        { name: '權杖三', meaning: '擴展視野與合作', ai: [
            '權杖三象徵遠見與合作。',
            '你的努力開始見到成果。',
            '考慮擴展現有計畫或尋求合作機會。'
        ] },
        { name: '權杖四', meaning: '穩定、慶祝與成就', ai: [
            '權杖四代表穩固的基礎與慶祝。',
            '享受當下的成功與和諧。',
            '與親友分享你的喜悅。'
        ] },
        { name: '權杖五', meaning: '衝突、競爭與挑戰', ai: [
            '權杖五提醒你面對競爭與衝突。',
            '堅持自己的立場，但保持開放態度。',
            '從不同觀點中學習與成長。'
        ] },
        { name: '權杖六', meaning: '勝利、認可與進步', ai: [
            '權杖六象徵勝利與公眾認可。',
            '你的努力獲得應有的讚賞。',
            '自信地前進，你走在正確的道路上。'
        ] },
        { name: '權杖七', meaning: '防衛、堅持與勇氣', ai: [
            '權杖七提醒你捍衛自己的立場。',
            '面對挑戰時保持堅定。',
            '相信自己的能力，你有力量克服障礙。'
        ] },
        { name: '權杖八', meaning: '迅速行動與進展', ai: [
            '權杖八象徵快速進展與行動。',
            '事情正在加速發展，保持靈活。',
            '訊息和機會可能突然到來，準備好行動。'
        ] },
        { name: '權杖九', meaning: '毅力、警覺與防備', ai: [
            '權杖九提醒你保持警覺。',
            '你已經經歷了很多，但挑戰仍在。',
            '從過去的經驗中學習，為未來做準備。'
        ] },
        { name: '權杖十', meaning: '負擔、壓力與責任', ai: [
            '權杖十提醒你審視自己的負擔。',
            '你承擔的責任是否過多？',
            '考慮尋求幫助或重新分配責任。'
        ] },
        { name: '權杖侍者', meaning: '熱情、探索與新消息', ai: [
            '權杖侍者帶來新機會與冒險精神。',
            '保持好奇心，探索新領域。',
            '好消息即將到來，保持開放態度。'
        ] },
        { name: '權杖騎士', meaning: '行動、冒險與熱情', ai: [
            '權杖騎士象徵充滿活力的行動。',
            '帶著熱情追求你的目標。',
            '冒險精神將帶你前往新的領域。'
        ] },
        { name: '權杖皇后', meaning: '自信、獨立與魅力', ai: [
            '權杖皇后展現自信與獨立精神。',
            '相信自己的直覺與能力。',
            '你的熱情與魅力激勵著他人。'
        ] },
        { name: '權杖國王', meaning: '領導、遠見與企業家精神', ai: [
            '權杖國王代表強大的領導力。',
            '以遠見和熱情引導他人。',
            '你的經驗與智慧是指引他人的明燈。'
        ] },

        // 聖杯組 (Cups) - 水元素，代表情感、關係與直覺
        { name: '聖杯一', meaning: '新情感、直覺與喜悅', ai: [
            '聖杯一象徵情感的開始與直覺開啟。',
            '敞開心扉接受愛與喜悅。',
            '新的情感連結或創意靈感正在湧現。'
        ] },
        { name: '聖杯二', meaning: '和諧、夥伴關係與連結', ai: [
            '聖杯二代表和諧的夥伴關係。',
            '平等、尊重與愛是關係的基礎。',
            '慶祝人與人之間的真誠連結。'
        ] },
        { name: '聖杯三', meaning: '慶祝、友誼與歡樂', ai: [
            '聖杯三邀請你與他人分享喜悅。',
            '慶祝成就與友誼的時刻。',
            '團隊合作帶來豐盛的成果。'
        ] },
        { name: '聖杯四', meaning: '不滿、反思與新機會', ai: [
            '聖杯四提醒你審視現狀。',
            '不要忽視眼前的機會。',
            '內心的不滿可能是改變的契機。'
        ] },
        { name: '聖杯五', meaning: '失落、悲傷與新的視角', ai: [
            '聖杯五提醒你關注仍擁有的美好。',
            '悲傷是暫時的，新的希望即將來臨。',
            '轉變視角，發現被忽視的機會。'
        ] },
        { name: '聖杯六', meaning: '懷舊、童年與單純的快樂', ai: [
            '聖杯六喚起溫暖的回憶。',
            '過去的經驗影響著現在。',
            '分享你的禮物與智慧，滋養他人。'
        ] },
        { name: '聖杯七', meaning: '選擇、幻想與清晰', ai: [
            '聖杯七邀請你釐清真正的渴望。',
            '區分幻想與現實。',
            '面對選擇時，跟隨內心的聲音。'
        ] },
        { name: '聖杯八', meaning: '追尋更深層次的意義', ai: [
            '聖杯八象徵追尋更深層的滿足。',
            '離開舒適圈，追尋更有意義的事物。',
            '你已經準備好進入人生的下一個階段。'
        ] },
        { name: '聖杯九', meaning: '願望成真與滿足', ai: [
            '聖杯九象徵願望的實現。',
            '享受努力的成果與自我滿足。',
            '你擁有實現夢想所需的一切。'
        ] },
        { name: '聖杯十', meaning: '和諧、家庭與情感圓滿', ai: [
            '聖杯十代表情感上的圓滿。',
            '家庭和諧與情感滿足的時刻。',
            '慶祝愛與連結的喜悅。'
        ] },
        { name: '聖杯侍者', meaning: '敏感、直覺與新情感', ai: [
            '聖杯侍者帶來情感上的新開始。',
            '信任你的直覺與感受。',
            '敏感地回應周圍的情感氛圍。'
        ] },
        { name: '聖杯騎士', meaning: '浪漫、理想與追求', ai: [
            '聖杯騎士代表浪漫與理想的追求。',
            '跟隨內心的熱情與理想。',
            '真誠地表達你的情感。'
        ] },
        { name: '聖杯皇后', meaning: '直覺、同理心與滋養', ai: [
            '聖杯皇后展現深刻的直覺與同理心。',
            '滋養自己與他人。',
            '你的情感智慧是指引他人的燈塔。'
        ] },
        { name: '聖杯國王', meaning: '情感成熟、智慧與支持', ai: [
            '聖杯國王代表情感上的成熟與智慧。',
            '平衡情感與理性。',
            '你的經驗與同理心支持著他人。'
        ] },

        // 寶劍組 (Swords) - 風元素，代表思想、溝通與挑戰
        { name: '寶劍一', meaning: '新想法、突破與清晰', ai: [
            '寶劍一象徵思想上的突破。',
            '清晰的思維帶來新的開始。',
            '用真理與誠實面對挑戰。'
        ] },
        { name: '寶劍二', meaning: '抉擇、平衡與僵局', ai: [
            '寶劍二提醒你面對抉擇。',
            '避免逃避困難的決定。',
            '尋求內在平衡與和諧。'
        ] },
        { name: '寶劍三', meaning: '心碎、悲傷與癒合', ai: [
            '寶劍三象徵情感的痛苦與失落。',
            '允許自己感受悲傷，這是癒合的開始。',
            '時間會治癒傷口，保持希望。'
        ] },
        { name: '寶劍四', meaning: '休息、恢復與準備', ai: [
            '寶劍四邀請你休息與恢復。',
            '暫時撤退以獲得新的視角。',
            '為即將到來的挑戰儲備能量。'
        ] },
        { name: '寶劍五', meaning: '衝突、爭論與代價', ai: [
            '寶劍五提醒你審視衝突的代價。',
            '贏得爭論是否值得失去關係？',
            '尋求雙贏的解決方案。'
        ] },
        { name: '寶劍六', meaning: '過渡、療癒與前行', ai: [
            '寶劍六象徵困難後的療癒之旅。',
            '帶著經驗前行，但放下痛苦。',
            '更好的時光即將到來。'
        ] },
        { name: '寶劍七', meaning: '策略、欺騙與冒險', ai: [
            '寶劍七提醒你審視策略。',
            '誠實面對自己的動機。',
            '冒險可能帶來回報，但也伴隨風險。'
        ] },
        { name: '寶劍八', meaning: '限制、恐懼與釋放', ai: [
            '寶劍八象徵自我限制的束縛。',
            '你的恐懼可能比實際限制更大。',
            '釋放自我設限的信念。'
        ] },
        { name: '寶劍九', meaning: '焦慮、擔憂與恐懼', ai: [
            '寶劍九提醒你面對內在恐懼。',
            '擔憂往往比現實更可怕。',
            '尋求支持，你並不孤單。'
        ] },
        { name: '寶劍十', meaning: '結束、痛苦與新的開始', ai: [
            '寶劍十象徵困難時期的結束。',
            '最壞的時刻即將過去。',
            '新的開始就在眼前。'
        ] },
        { name: '寶劍侍者', meaning: '好奇心、消息與警覺', ai: [
            '寶劍侍者帶來新消息或見解。',
            '保持好奇心與開放心態。',
            '注意細節，它們可能很重要。'
        ] },
        { name: '寶劍騎士', meaning: '決斷、行動與衝動', ai: [
            '寶劍騎士象徵快速的行動與決斷。',
            '熱情很重要，但要注意衝動行事。',
            '專注於目標，但考慮後果。'
        ] },
        { name: '寶劍皇后', meaning: '清晰、獨立與誠實', ai: [
            '寶劍皇后代表清晰的思維與誠實。',
            '以智慧和客觀性面對挑戰。',
            '你的洞察力能幫助他人看清真相。'
        ] },
        { name: '寶劍國王', meaning: '理性、權威與公正', ai: [
            '寶劍國王象徵理性與權威。',
            '以邏輯和智慧做決定。',
            '你的經驗與判斷力值得信賴。'
        ] },

        // 錢幣組 (Pentacles) - 土元素，代表物質、工作與健康
        { name: '錢幣一', meaning: '新機會、財富與實現', ai: [
            '錢幣一象徵物質層面的新開始。',
            '新的財務或職業機會即將來臨。',
            '投資於有形的成果。'
        ] },
        { name: '錢幣二', meaning: '平衡、適應與選擇', ai: [
            '錢幣二提醒你在資源間取得平衡。',
            '靈活應對變化的財務狀況。',
            '考慮所有選項後再做決定。'
        ] },
        { name: '錢幣三', meaning: '合作、技能與成長', ai: [
            '錢幣三象徵團隊合作與技能發展。',
            '你的專業知識受到賞識。',
            '持續學習與改進帶來成功。'
        ] },
        { name: '錢幣四', meaning: '保守、安全與控制', ai: [
            '錢幣四提醒你平衡節省與分享。',
            '安全感重要，但不要過度控制。',
            '考慮什麼對你真正有價值。'
        ] },
        { name: '錢幣五', meaning: '財務困難、孤立與支持', ai: [
            '錢幣五象徵物質層面的挑戰。',
            '困難時期需要互相支持。',
            '尋求幫助並不可恥。'
        ] },
        { name: '錢幣六', meaning: '慷慨、分享與平衡', ai: [
            '錢幣六提醒你資源的分享。',
            '慷慨與感恩的時刻。',
            '在給予與接受間找到平衡。'
        ] },
        { name: '錢幣七', meaning: '評估、耐心與長期規劃', ai: [
            '錢幣七邀請你評估進展。',
            '耐心等待成果的成熟。',
            '長期規劃將帶來回報。'
        ] },
        { name: '錢幣八', meaning: '專注、技藝與奉獻', ai: [
            '錢幣八象徵專注於技藝。',
            '持續努力將帶來專業成就。',
            '對工作保持熱情與奉獻精神。'
        ] },
        { name: '錢幣九', meaning: '獨立、享受與自給自足', ai: [
            '錢幣九代表獨立與自給自足。',
            '享受辛勤工作的成果。',
            '你已經創造了自己的成功。'
        ] },
        { name: '錢幣十', meaning: '財富、家族與傳承', ai: [
            '錢幣十象徵物質上的成功與家庭和諧。',
            '家族傳統與價值觀的重要性。',
            '財富的傳承與分享。'
        ] },
        { name: '錢幣侍者', meaning: '學習、機會與潛力', ai: [
            '錢幣侍者帶來學習與成長的機會。',
            '新的技能或知識將開啟可能性。',
            '保持好奇心，準備好學習。'
        ] },
        { name: '錢幣騎士', meaning: '勤奮、責任與進步', ai: [
            '錢幣騎士象徵穩健的進展。',
            '勤奮工作終將獲得回報。',
            '負責任地追求目標。'
        ] },
        { name: '錢幣皇后', meaning: '務實、慷慨與照顧', ai: [
            '錢幣皇后代表務實的關懷。',
            '將愛轉化為實際行動。',
            '你的照顧滋養著周圍的人。'
        ] },
        { name: '錢幣國王', meaning: '成功、穩定與領導', ai: [
            '錢幣國王象徵物質成功與穩定。',
            '你的經驗與智慧創造了堅實的基礎。',
            '負責任地運用資源與影響力。'
        ] }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const generateButton = document.getElementById('generate-card');
    const majorOnlyCheckbox = document.getElementById('major-only');
    const cardImage = document.getElementById('card-image');
    const cardName = document.getElementById('card-name');
    const cardMeaning = document.getElementById('card-meaning');

    // 動態新增 AI 解讀切換
    let aiInsightCheckbox = document.getElementById('ai-insight-enable');
    if (!aiInsightCheckbox) {
        aiInsightCheckbox = document.createElement('input');
        aiInsightCheckbox.type = 'checkbox';
        aiInsightCheckbox.id = 'ai-insight-enable';
        const label = document.createElement('label');
        label.appendChild(aiInsightCheckbox);
        label.appendChild(document.createTextNode(' 顯示 AI 深度解讀'));
        generateButton.parentNode.insertBefore(label, generateButton.nextSibling);
    }

    // AI 解讀顯示區
    let aiText = document.getElementById('ai-text');
    if (!aiText) {
        aiText = document.createElement('div');
        aiText.id = 'ai-text';
        aiText.style = 'margin-top:1em;color:#444;font-size:1.1em;max-width:500px;margin-left:auto;margin-right:auto;';
        cardContainer.appendChild(aiText);
    }

    function getRandomCard(majorOnly) {
        const cards = majorOnly ? tarotCards.major : [...tarotCards.major, ...tarotCards.minor];
        const randomIndex = Math.floor(Math.random() * cards.length);
        return cards[randomIndex];
    }

    function showCard(card) {
        cardContainer.style.opacity = '0';
        cardContainer.style.display = 'block';
        
        // 獲取新的 DOM 元素
        const cardTitle = document.querySelector('.card-title');
        const cardMeaning = document.querySelector('.card-meaning');
        const cardImage = document.querySelector('.card-image');
        
        // 設置卡牌資訊
        cardTitle.textContent = card.name;
        cardMeaning.textContent = card.meaning;
        
        // 設置牌圖（指向根目錄的 images 資料夾）
        cardImage.style.backgroundImage = `url('../../images/${card.name}.png')`;
        
        // AI 解讀
        if (aiInsightCheckbox.checked && card.ai) {
            aiText.innerHTML = card.ai.map(line => `<p>${line}</p>`).join('');
        } else {
            aiText.innerHTML = '';
        }
        
        setTimeout(() => {
            cardContainer.style.opacity = '1';
        }, 100);
    }

    function generateCard() {
        const card = getRandomCard(majorOnlyCheckbox.checked);
        showCard(card);
    }

    generateButton.addEventListener('click', generateCard);
    aiInsightCheckbox.addEventListener('change', () => {
        const card = cardName.textContent ? tarotCards.major.concat(tarotCards.minor).find(c => c.name === cardName.textContent) : null;
        if (card) showCard(card);
    });
    generateCard();
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('Random Tarot Card Generator script loaded');
    
    const cardContainer = document.getElementById('card-container');
    const generateButton = document.getElementById('generate-card');
    const majorOnlyCheckbox = document.getElementById('major-only');
    const cardImage = document.getElementById('card-image');
    const cardName = document.getElementById('card-name');
    const cardMeaning = document.getElementById('card-meaning');

    // 塔羅牌資料
    const tarotCards = {
        major: [
    { name: '愚者I', meaning: '新的冒險、自由、無限可能' },
    { name: '魔術師II', meaning: '創造力、行動力、資源運用' },
    { name: '女祭司III', meaning: '直覺、潛意識、神秘' },
    { name: '皇后IV', meaning: '豐盛、滋養、母性' },
    { name: '皇帝V', meaning: '權威、秩序、掌控' },
    { name: '教皇VI', meaning: '傳統、信仰、精神指引' },
    { name: '戀人VII', meaning: '愛情、和諧、選擇' },
    { name: '戰車VIII', meaning: '勝利、意志力、掌控' },
    { name: '力量IX', meaning: '勇氣、堅持、內在力量' },
    { name: '隱者X', meaning: '尋求真理、內省、指引' },
    { name: '命運之輪XI', meaning: '命運、循環、轉變' },
    { name: '正義XII', meaning: '公平、平衡、因果' },
    { name: '倒吊人XIII', meaning: '等待、犧牲、新觀點' },
    { name: '死神XIV', meaning: '結束、轉變、新生' },
    { name: '節制XV', meaning: '平衡、節制、整合' },
    { name: '惡魔XVI', meaning: '束縛、誘惑、陰影' },
    { name: '高塔XVII', meaning: '突變、瓦解、覺醒' },
    { name: '星星XVIII', meaning: '希望、療癒、靈感' },
    { name: '月亮XIX', meaning: '潛意識、幻象、直覺' },
    { name: '太陽XX', meaning: '成功、快樂、成長' },
    { name: '審判XXI', meaning: '覺醒、救贖、新生' },
    { name: '世界', meaning: '完成、圓滿、成就' }
],
minor: [
    // 權杖
    { name: '權杖一', meaning: '新計畫、動力、開始' },
    { name: '權杖二', meaning: '規劃、遠見、選擇' },
    { name: '權杖三', meaning: '拓展、合作、前進' },
    { name: '權杖四', meaning: '慶祝、穩定、團結' },
    { name: '權杖五', meaning: '競爭、衝突、挑戰' },
    { name: '權杖六', meaning: '勝利、認可、成就' },
    { name: '權杖七', meaning: '防衛、堅持、立場' },
    { name: '權杖八', meaning: '迅速、訊息、行動' },
    { name: '權杖九', meaning: '堅持、考驗、準備' },
    { name: '權杖十', meaning: '負擔、壓力、責任' },
    { name: '權杖侍從', meaning: '熱情、冒險、消息' },
    { name: '權杖騎士', meaning: '衝勁、行動、變動' },
    { name: '權杖皇后', meaning: '自信、獨立、魅力' },
    { name: '權杖國王', meaning: '領導、遠見、權威' },
    // 聖杯
    { name: '聖杯一', meaning: '新感情、靈感、喜悅' },
    { name: '聖杯二', meaning: '夥伴、結合、吸引' },
    { name: '聖杯三', meaning: '友誼、慶祝、社交' },
    { name: '聖杯四', meaning: '冷淡、沉思、無聊' },
    { name: '聖杯五', meaning: '失落、遺憾、悲傷' },
    { name: '聖杯六', meaning: '回憶、童年、懷舊' },
    { name: '聖杯七', meaning: '幻想、選擇、誘惑' },
    { name: '聖杯八', meaning: '離開、尋找、失望' },
    { name: '聖杯九', meaning: '滿足、願望、成就' },
    { name: '聖杯十', meaning: '幸福、和諧、家庭' },
    { name: '聖杯侍從', meaning: '浪漫、消息、創意' },
    { name: '聖杯騎士', meaning: '追求、邀請、理想' },
    { name: '聖杯皇后', meaning: '體貼、直覺、溫柔' },
    { name: '聖杯國王', meaning: '成熟、智慧、情感平衡' },
    // 寶劍
    { name: '寶劍一', meaning: '新想法、決心、真理' },
    { name: '寶劍二', meaning: '抉擇、平衡、猶豫' },
    { name: '寶劍三', meaning: '心碎、分離、療癒' },
    { name: '寶劍四', meaning: '休息、沉澱、恢復' },
    { name: '寶劍五', meaning: '衝突、競爭、爭執' },
    { name: '寶劍六', meaning: '過渡、旅行、釋放' },
    { name: '寶劍七', meaning: '謀略、欺瞞、逃避' },
    { name: '寶劍八', meaning: '束縛、限制、困境' },
    { name: '寶劍九', meaning: '焦慮、擔憂、失眠' },
    { name: '寶劍十', meaning: '結束、背叛、痛苦' },
    { name: '寶劍侍從', meaning: '警覺、觀察、學習' },
    { name: '寶劍騎士', meaning: '果斷、行動、衝動' },
    { name: '寶劍皇后', meaning: '理性、獨立、誠實' },
    { name: '寶劍國王', meaning: '權威、邏輯、公正' },
    // 錢幣
    { name: '錢幣一', meaning: '新機會、財富、實現' },
    { name: '錢幣二', meaning: '平衡、適應、調整' },
    { name: '錢幣三', meaning: '合作、技能、成長' },
    { name: '錢幣四', meaning: '保守、控制、積蓄' },
    { name: '錢幣五', meaning: '貧困、失落、支持' },
    { name: '錢幣六', meaning: '施予、分享、幫助' },
    { name: '錢幣七', meaning: '等待、評估、耐心' },
    { name: '錢幣八', meaning: '努力、專注、學習' },
    { name: '錢幣九', meaning: '獨立、豐盛、享受' },
    { name: '錢幣十', meaning: '財富、家族、成就' },
    { name: '錢幣侍從', meaning: '計畫、學習、機會' },
    { name: '錢幣騎士', meaning: '勤奮、實在、責任' },
    { name: '錢幣皇后', meaning: '實際、溫暖、照顧' },
    { name: '錢幣國王', meaning: '穩定、富有、領導' }
]
    };

    function getRandomCard(majorOnly) {
        const cards = majorOnly ? tarotCards.major : [...tarotCards.major, ...tarotCards.minor];
        const randomIndex = Math.floor(Math.random() * cards.length);
        return cards[randomIndex];
    }

    function showCard(card) {
        // 顯示轉場效果
        cardContainer.style.opacity = '0';
        cardContainer.style.display = 'block';
        
        // 更新牌面資料
        cardName.textContent = card.name;
        cardMeaning.textContent = card.meaning;
        
        // 模擬翻牌效果
        setTimeout(() => {
            cardContainer.style.opacity = '1';
        }, 100);
    }

    function generateCard() {
        const card = getRandomCard(majorOnlyCheckbox.checked);
        showCard(card);
    }

    // 初始化
    generateButton.addEventListener('click', generateCard);
    
    // 第一次載入時自動生成一張牌
    generateCard();
});