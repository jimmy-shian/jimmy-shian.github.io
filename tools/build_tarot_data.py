# -*- coding: utf-8 -*-
"""
build_tarot_data.py
建立 78 張完整塔羅牌資料庫、牌義庫、素材映射表與 Prompt 清單
"""
import os
import json

# 78 張塔羅牌詳細定義
CARDS = [
    # === 大阿爾克那 Major Arcana (22) ===
    {
        "id": "major_00", "num": 0, "nameZh": "愚者", "nameEn": "The Fool", "arcana": "major", "suit": None, "element": "air", "astrology": "天王星",
        "upKeywords": ["純真", "新開始", "冒險", "自由", "無限潛能", "自發性"],
        "revKeywords": ["魯莽", "輕率", "冒失", "猶豫不決", "盲目冒險", "逃避責任"],
        "symbols": ["懸崖邊緣", "白狗", "包袱手杖", "白色太陽", "白玫瑰"],
        "upMeaning": "愚者代表一段全新旅程的啟程。懷抱著純真與對未來的期盼，勇敢踏出第一步，信任直覺，宇宙將為你敞開無限可能性。",
        "revMeaning": "可能過於衝動盲目，或因恐懼而裹足不前。提醒你在冒險之餘需兼顧現實評估，切忌草率行事。",
        "love": "一段純粹、充滿新鮮感的新戀情，放下既定成見享受當下；逆位提醒勿對承諾漫不經心。",
        "career": "新的工作機會或創業嘗試，勇於打破常規發揮創意；逆位注意缺乏周詳規劃與準備。",
        "finance": "抱持樂觀的心態看待財務，可能有意料之外的支出；逆位注意過度揮霍或投機風險。",
        "prompt": "The Fool tarot card, a carefree young traveler in colorful medieval tunic standing near cliff edge with a small bundle on a staff, joyous white dog leaping beside him, bright sun shining, glowing cathedral stained glass window style, vibrant jewel tones, intricate black lead lines, ornate gold pointed arch border, majestic gothic holy light."
    },
    {
        "id": "major_01", "num": 1, "nameZh": "魔術師", "nameEn": "The Magician", "arcana": "major", "suit": None, "element": "air", "astrology": "水星",
        "upKeywords": ["創造力", "顯化", "行動力", "技能專精", "資源整合", "自信"],
        "revKeywords": ["欺瞞", "眼高手低", "才能未展", "濫用技巧", "溝通受阻", "幻滅"],
        "symbols": ["右手指天左手指地", "無限符號∞", "四要素法器（杖杯劍幣）", "紅白長袍", "玫瑰與百合"],
        "upMeaning": "魔術師代表將想法化為現實的強大力量。你已具備所需的所有資源與天賦，是主動採取行動、開創新局面的最佳時刻。",
        "revMeaning": "可能有才能被埋沒、注意力分散，或過於仰賴小聰明而缺乏真誠。提醒你腳踏實地，真誠溝通。",
        "love": "充滿魅力與主動出擊的戀情，溝通順暢且互相吸引；逆位防範甜言蜜語與不實承諾。",
        "career": "展現卓越專業能力與領導手腕，項目進展順遂；逆位警惕規劃不切實際或溝通誤解。",
        "finance": "多元化理財與良好投資敏銳度，靈活運用資源獲利；逆位注意財務陷阱或過度自信。",
        "prompt": "The Magician tarot card, a charismatic sorcerer with one hand holding glowing wand pointing to the heavens and other hand pointing to earth, infinity symbol above head, table with wand cup sword pentacle, cathedral stained glass style, glowing sapphire and ruby glass, intricate black leaded lines, gothic gold arch frame."
    },
    {
        "id": "major_02", "num": 2, "nameZh": "女祭司", "nameEn": "The High Priestess", "arcana": "major", "suit": None, "element": "water", "astrology": "月亮",
        "upKeywords": ["直覺", "潛意識", "深層智慧", "神秘", "寧靜內省", "靈性"],
        "revKeywords": ["情緒壓抑", "直覺受阻", "秘密洩漏", "冷漠孤立", "逃避現實", "浮躁"],
        "symbols": ["黑白二柱(B與J)", "石榴帷幕", "腳下新月", "胸前十字", "神秘經卷TORA"],
        "upMeaning": "女祭司守護著潛意識的大門，象徵內在的靈性智慧與敏銳直覺。此時不宜急於行動，靜心聆聽內在聲音能看清真相。",
        "revMeaning": "可能與自己的內在直覺失去連結，或因情緒波動而感到迷茫。給自己獨處沉澱的時間，理清思緒。",
        "love": "心靈契合的深刻連結，彼此保有神秘與尊重；逆位注意缺乏溝通或過於被動封閉。",
        "career": "適合研究、規劃、洞察市場深層脈動，保持冷靜判斷；逆位注意缺乏實質行動力。",
        "finance": "保守穩健的理財策略，相信自己的財務敏銳度；逆位避免輕信未經驗證的私密消息。",
        "prompt": "The High Priestess tarot card, a serene mystical priestess seated between black and white temple pillars B and J, holding sacred scroll, crescent moon at her feet, pomegranate veil behind, luminous cathedral stained glass art, deep cobalt blue and silver tones, intricate leaded outlines, gothic golden pointed arch."
    },
    {
        "id": "major_03", "num": 3, "nameZh": "皇后", "nameEn": "The Empress", "arcana": "major", "suit": None, "element": "earth", "astrology": "金星",
        "upKeywords": ["豐饒", "滋養", "創造力", "母性", "美與和諧", "繁榮"],
        "revKeywords": ["過度依賴", "過度溺愛", "創造力枯竭", "忽視自我", "物質浪費", "虛榮"],
        "symbols": ["金黃麥田", "十二星冠", "金星之盾", "繁花長袍", "流動瀑布"],
        "upMeaning": "皇后象徵大地之母的豐收與滋養，代表愛、美感與源源不絕的創造力。生活正處於充滿恩賜與溫暖的繁榮期。",
        "revMeaning": "可能過於勞心勞力照顧他人而忽略了自身需求，或在物質享受中迷失。學習重拾內在自我滋養。",
        "love": "充滿溫情與包容的甜美關係，家庭和諧與孕育新生；逆位注意控制慾或情緒勒索。",
        "career": "創意與產能達到高峰，團隊氛圍融洽且成果豐碩；逆位注意拖延或缺乏執行紀律。",
        "finance": "物質生活豐裕，財務收成良好；逆位注意過度消費與奢華浪費。",
        "prompt": "The Empress tarot card, a regal maternal queen crowned with twelve stars reclining gracefully in ripe golden wheat fields and lush nature, Venus heart shield, flowing forest waterfall, stained glass cathedral aesthetic, rich emerald green and gold glass panels, glowing medieval halo, gothic ornate arch."
    },
    {
        "id": "major_04", "num": 4, "nameZh": "皇帝", "nameEn": "The Emperor", "arcana": "major", "suit": None, "element": "fire", "astrology": "白羊座",
        "upKeywords": ["權威", "秩序", "結構", "穩固基石", "領導力", "紀律"],
        "revKeywords": ["專制跋扈", "過度控制", "僵化固執", "缺乏彈性", "權力鬥爭", "無序"],
        "symbols": ["石刻王座", "四公羊頭浮雕", "紅袍披甲", "生命權杖Ankh", "寶球"],
        "upMeaning": "皇帝代表強大的意志、秩序與建立長治久安的體系。具備卓越的決斷力與統率力，能為目標奠定無可撼動的基礎。",
        "revMeaning": "可能顯得過於嚴苛、專制或抗拒彈性變通。提醒你在維護原則的同時，也需懂得傾聽與同理。",
        "love": "成熟穩重且富有保護欲的關係，給予安全感；逆位注意大男人/強勢控制引發爭執。",
        "career": "晉升主管、主導大型專案或建立完善流程，具領導威信；逆位防範官僚僵化與權力糾紛。",
        "finance": "穩健的財務管控與長線資產佈局，極具掌控力；逆位避免因剛愎自用而導致投資失誤。",
        "prompt": "The Emperor tarot card, a stern bearded sovereign on a massive stone throne carved with ram heads, crimson robes over iron armor, holding ankh sceptre and golden orb, stained glass cathedral window art, vibrant fiery crimson and amber glass, sharp black lead outlines, gothic gilded arch."
    },
    {
        "id": "major_05", "num": 5, "nameZh": "教皇", "nameEn": "The Hierophant", "arcana": "major", "suit": None, "element": "earth", "astrology": "金牛座",
        "upKeywords": ["精神指引", "傳統", "道德倫理", "學習傳承", "導師", "信仰"],
        "revKeywords": ["盲從教條", "打破常規", "反叛傳統", "錯誤指引", "思想禁錮", "偽善"],
        "symbols": ["三重冠", "三重十字杖", "交錯雙鑰匙", "兩位僧侶跪拜", "神殿立柱"],
        "upMeaning": "教皇代表智慧的傳承與精神指引。尋求有經驗的導師或回歸傳統價值觀，將能為你目前的疑惑提供明確方向。",
        "revMeaning": "受到傳統束縛或僵化規範壓迫，是時候質疑現狀、打破盲從，尋找屬於自己的獨立信念。",
        "love": "以結婚或長期承諾為目標的傳統良緣，受長輩祝福；逆位可能面臨觀念差異或家庭阻礙。",
        "career": "在大機構、體制內穩健發展，獲前輩提攜或考取專業證照；逆位適合尋求創新突破體制。",
        "finance": "遵循正規傳統的投資管道，避免旁門左道；逆位當心不良理財顧問或過時資訊。",
        "prompt": "The Hierophant tarot card, a holy patriarch in ornate papal robes and triple tiara seated between cathedral pillars, holding triple cross staff, two kneeling acolytes, crossed golden keys at feet, stained glass gothic window design, rich purple and gold hues, dark lead borders."
    },
    {
        "id": "major_06", "num": 6, "nameZh": "戀人", "nameEn": "The Lovers", "arcana": "major", "suit": None, "element": "air", "astrology": "雙子座",
        "upKeywords": ["真摯愛情", "和諧和鳴", "重要抉擇", "價值契合", "夥伴關係", "信任"],
        "revKeywords": ["感情裂痕", "價值觀衝突", "猶豫不決", "不負責任", "誘惑出軌", "溝通斷裂"],
        "symbols": ["天使拉斐爾", "伊甸園男女", "生命樹十二果", "善惡樹與蛇", "遠方火山"],
        "upMeaning": "戀人牌代表心靈與情感的深刻共鳴，同時象徵面臨人生重大道德或價值的抉擇。跟隨真心，做出對彼此皆誠實的選擇。",
        "revMeaning": "關係面臨價值觀考驗或信任危機，內心可能在不同選項間掙扎。需坦誠面對真實感受以化解衝突。",
        "love": "強烈吸引、靈魂共鳴與美好承諾；逆位需重新審視溝通模式與彼此期望。",
        "career": "絕佳的事業夥伴關係，合作無間；逆位注意合約細節歧見或合作理念不合。",
        "finance": "與夥伴共同投資理財，取得雙贏平衡；逆位慎防因感情用事而做出不理智決策。",
        "prompt": "The Lovers tarot card, an angelic guardian angel blessing a man and woman in lush paradise garden with Tree of Life and Tree of Knowledge, stained glass cathedral style, luminous rose pink violet and golden amber glass panels, intricate black lead work, gothic golden frame."
    },
    {
        "id": "major_07", "num": 7, "nameZh": "戰車", "nameEn": "The Chariot", "arcana": "major", "suit": None, "element": "water", "astrology": "巨蟹座",
        "upKeywords": ["意志力", "勝利凱旋", "自我控制", "克服障礙", "前進衝刺", "專注"],
        "revKeywords": ["失去控制", "橫衝直撞", "方向迷失", "遭遇阻礙", "挫敗放棄", "侵略性"],
        "symbols": ["星光華蓋", "黑白雙斯芬克斯", "鎧甲勇士", "城牆城堡", "金色輪圈"],
        "upMeaning": "戰車象徵憑藉鋼鐵般的意志力與專注度克服內外衝突，勇往直前。只要掌握好方向盤，勝利終將屬於你。",
        "revMeaning": "可能因情緒失控或目標分歧而感到力不從心，甚至橫衝直撞導致反效果。暫停腳步重新校準方向。",
        "love": "主動積極追求，排除困難推進關係；逆位需注意過於強勢或缺乏彈性引發衝突。",
        "career": "克服事業難關、擊敗競爭對手取得關鍵進展；逆位注意缺乏統籌協調導致專案脫軌。",
        "finance": "目標明確的財務衝刺，獲取可觀回報；逆位避免衝動投機或無節制的開銷。",
        "prompt": "The Chariot tarot card, a triumphant armoured warrior riding a starry-canopied chariot guided by two sphinxes one black one white, gothic city walls behind, stained glass cathedral artwork, vibrant royal blue gold and silver tones, intricate lead lines, ornate pointed arch."
    },
    {
        "id": "major_08", "num": 8, "nameZh": "力量", "nameEn": "The Strength", "arcana": "major", "suit": None, "element": "fire", "astrology": "獅子座",
        "upKeywords": ["內在勇氣", "柔克剛", "慈悲包容", "耐心耐性", "自我接納", "堅定信念"],
        "revKeywords": ["自我懷疑", "軟弱退縮", "情緒失控", "暴躁易怒", "傲慢霸道", "信心喪失"],
        "symbols": ["白袍女子", "溫馴雄獅", "頭頂無限符號∞", "花環腰帶", "金色背景"],
        "upMeaning": "真正的力量並非來自暴力或強權，而是源自內在的溫柔、包容與堅定。以耐心和愛撫平內心的恐懼與獸性。",
        "revMeaning": "感到疲憊、自信心低落或被內在負面情緒淹沒。提醒你重拾對自我的信心，善待自己的脆弱。",
        "love": "以溫柔與同理心化解矛盾，深刻且持久的陪伴；逆位容易因情緒失控而傷害彼此。",
        "career": "面對高壓環境保持冷靜沉著，展現優雅的抗壓性；逆位需防範自暴自棄或過度急躁。",
        "finance": "長期穩健的財務紀律，具備良好的自我克制力；逆位注意恐慌性拋售或衝動購物。",
        "prompt": "The Strength tarot card, a serene graceful maiden in white robes gently taming a majestic golden lion with love, infinity symbol glowing above her head, floral garland, stained glass cathedral window style, warm gold amber and emerald glass, intricate leaded outlines, gothic golden arch."
    },
    {
        "id": "major_09", "num": 9, "nameZh": "隱者", "nameEn": "The Hermit", "arcana": "major", "suit": None, "element": "earth", "astrology": "處女座",
        "upKeywords": ["內省", "尋求真理", "心靈指引", "獨處深思", "智慧", "自省照明"],
        "revKeywords": ["孤立自閉", "過度孤僻", "拒絕求助", "迷失方向", "頑固偏執", "社交恐懼"],
        "symbols": ["雪山之巔", "灰色兜帽長袍", "六芒星提燈", "引路手杖", "皚皚白雪"],
        "upMeaning": "隱士高居雪峰，提著真理之燈照亮前路。這是一個暫時遠離喧囂、回歸內心深處探索自我與汲取智慧的時刻。",
        "revMeaning": "過度封閉自我導致與現實脫節，或盲目抗拒外界的善意協助。打開心扉，適時與信任之人交流。",
        "love": "享受個人獨立空間，或需先了解自己才能經營好關係；逆位需防冷戰或孤芳自賞。",
        "career": "適合獨立作業、深度研究、專業深造與諮詢規劃；逆位提醒勿閉門造車，需適度團隊合作。",
        "finance": "崇尚簡單簡樸的財務哲學，不盲從市場炒作；逆位注意過於保守而錯失合理理財時機。",
        "prompt": "The Hermit tarot card, an aged wise sage in grey hooded cloak standing on snowy mountain peak holding glowing lantern with six-pointed star, wooden walking staff, stained glass cathedral art, deep midnight blue frosty silver and golden light, intricate gothic arch frame."
    },
    {
        "id": "major_10", "num": 10, "nameZh": "命運之輪", "nameEn": "Wheel of Fortune", "arcana": "major", "suit": None, "element": "fire", "astrology": "木星",
        "upKeywords": ["轉機", "命運循環", "好運機遇", "順應變化", "宿命", "新的週期"],
        "revKeywords": ["運勢低潮", "抗拒改變", "暫時阻礙", "惡性循環", "挫折連連", "無法掌控"],
        "symbols": ["命運神輪", "斯芬克斯", "阿努比斯與蛇", "四活物（人、鷹、獅、牛）", "希伯來文字TARO"],
        "upMeaning": "命運之輪永不停息地轉動，代表生命的起伏週期與突如其來的轉機。保持豁達的心胸，順應變化乘勢而上。",
        "revMeaning": "正面臨暫時的低谷或計劃趕不上變化。記住低谷亦是上升週期的起點，保持耐心度過考驗。",
        "love": "命中注定的奇妙邂逅或關係迎來重大轉折契機；逆位需學會接受磨合期，勿急於定論。",
        "career": "事業迎來順風期，抓住偶然出現的重要良機；逆位需穩住陣腳，等待風向好轉。",
        "finance": "財運亨通，投資獲利或意外之財；逆位應緊縮開支，避免風險性高的投機行為。",
        "prompt": "Wheel of Fortune tarot card, a grand mystical rotating wheel inscribed with sacred letters, flanked by sphinx anubis and serpent, four winged creatures in clouds, stained glass cathedral style, vivid lapis lazuli emerald and solar gold panels, intricate leaded outlines, gothic arch."
    },
    {
        "id": "major_11", "num": 11, "nameZh": "正義", "nameEn": "The Justice", "arcana": "major", "suit": None, "element": "air", "astrology": "天秤座",
        "upKeywords": ["公平公正", "真理客觀", "因果法則", "法律責任", "平衡裁決", "誠實"],
        "revKeywords": ["不公不義", "偏頗武斷", "逃避責任", "法律糾紛", "失去平衡", "自欺欺人"],
        "symbols": ["雙刃劍", "正義天平", "紫色帷幕", "石座雙柱", "四方王冠"],
        "upMeaning": "正義女神手持天平與雙刃劍，代表客觀、誠實與對自己行為承擔完全責任。以理智平衡感性，追求真理與公平。",
        "revMeaning": "可能遭遇不公對待，或自身存在偏見與逃避後果的心態。審視自身行為，尋求公正合理的解決方案。",
        "love": "平等尊重、真誠相待且彼此權責分明的成熟關係；逆位需注意失衡付出或互相指責。",
        "career": "合約簽署順利、考核公正、是非分明；逆位防範合約糾紛或不透明的職場政治。",
        "finance": "收支平衡、清楚明白每一筆開銷與帳目；逆位需謹防合約漏洞或法律稅務爭議。",
        "prompt": "The Justice tarot card, a solemn crowned figure seated between stone pillars, holding upright double-edged sword and golden balancing scales, purple mantle, stained glass cathedral window aesthetic, vibrant amethyst scarlet and golden hues, intricate lead work, gothic frame."
    },
    {
        "id": "major_12", "num": 12, "nameZh": "倒吊人", "nameEn": "The Hanged Man", "arcana": "major", "suit": None, "element": "water", "astrology": "海王星",
        "upKeywords": ["臣服", "換位思考", "暫停等待", "靈性昇華", "自我犧牲", "新視角"],
        "revKeywords": ["無謂犧牲", "停滯不前", "執迷不悟", "抗拒放手", "怨天尤人", "視野狹隘"],
        "symbols": ["生命之樹T型十字", "倒懸一足", "頭部金色聖光", "平靜安詳面容", "綠色嫩芽"],
        "upMeaning": "倒吊人自願倒懸於生命之樹，面容安詳。換個完全不同的角度看世界，放慢腳步，在暫停中獲得更高層次的智慧。",
        "revMeaning": "為了錯誤的人事物進行無意義的妥協與犧牲，或因害怕改變而陷入原地踏步。勇敢打破僵局。",
        "love": "願意為對方體諒退讓，換位思考能化解僵局；逆位需警惕過度委屈求全失去自我。",
        "career": "專案處於沉澱等待期，利用這段時間調整策略；逆位注意缺乏進展帶來的焦慮與內耗。",
        "finance": "財務暫時處於停滯期，適合檢討財務體質而非急於投資；逆位避免被套牢或盲目死守。",
        "prompt": "The Hanged Man tarot card, a peaceful figure hanging upside down by one ankle from a living wooden T-cross, golden halo of enlightenment glowing around his head, stained glass cathedral style, luminous turquoise blue amber and green glass panels, intricate leaded outlines, gothic arch."
    },
    {
        "id": "major_13", "num": 13, "nameZh": "死神", "nameEn": "Death", "arcana": "major", "suit": None, "element": "water", "astrology": "天蠍座",
        "upKeywords": ["徹底轉變", "舊有結束", "新生起點", "斷捨離", "向死而生", "蛻變重塑"],
        "revKeywords": ["抗拒改變", "執著過去", "苟延殘喘", "害怕未知", "拖泥帶水", "停滯不前"],
        "symbols": ["黑甲骷髏騎士", "白玫瑰旗幟", "倒下國王與祈求者", "遠方雙塔朝陽", "生命之河"],
        "upMeaning": "死神象徵必然的告別與終結。結束不再適合你的舊生活、舊思維，唯有勇敢掃除枯木，嶄新的生命契機才能破土而出。",
        "revMeaning": "死守著早已腐朽的人事物不放，抗拒必經的生命轉變。學會放手，接納變革才能迎來新生。",
        "love": "一段不合適關係的結束，或關係經歷根本性蛻變迎來新生；逆位拖延痛苦無法走出來。",
        "career": "告別舊職位/舊行業，轉型迎向新領域；逆位容易因恐懼改變而在不適合的環境中消磨。",
        "finance": "斷絕不良財務習慣，重組資產架構；逆位注意抗拒停損導致虧損擴大。",
        "prompt": "Death tarot card, an ominous black-armored knight on a white warhorse carrying a mystical white rose flag, golden sunrise rising between distant twin towers, river of life, stained glass cathedral artwork, obsidian black crimson and dawn gold glass, intricate lead lines, gothic arch."
    },
    {
        "id": "major_14", "num": 14, "nameZh": "節制", "nameEn": "The Temperance", "arcana": "major", "suit": None, "element": "fire", "astrology": "射手座",
        "upKeywords": ["平衡調和", "耐心流動", "身心療癒", "中庸之道", "整合融合", "自我節制"],
        "revKeywords": ["失衡極端", "過度放縱", "急躁缺乏耐心", "衝突不和", "能量耗竭", "缺乏節制"],
        "symbols": ["大天使雙翼", "雙金杯水流", "一足在水一足在陸", "遠方晨曦山峰", "胸前三角四方徽記"],
        "upMeaning": "大天使專注地在兩杯之間調和水流，象徵平衡、和諧與耐心的煉金術。融合對立觀點，尋求中庸之道能達成最高境界。",
        "revMeaning": "生活節奏或情緒處於失衡狀態，可能飲食過度、作息紊亂或在極端間搖擺。需要重新找回內心平靜。",
        "love": "細水長流、互相磨合包容的溫潤感情；逆位注意溝通不良或一方過度索取導致失衡。",
        "career": "跨部門協調、資源整合順暢，團隊協作和諧；逆位注意溝通摩擦與步調不一。",
        "finance": "量入為出、理性穩定的財務規劃；逆位當心過度消費或收支失去平衡。",
        "prompt": "The Temperance tarot card, a majestic winged angel with glowing aura pouring liquid light seamlessly between two golden cups, one foot in water one on land, distant path leading to radiant sunrise, stained glass cathedral style, iridescent sapphire violet and amber glass, gothic arch."
    },
    {
        "id": "major_15", "num": 15, "nameZh": "惡魔", "nameEn": "The Devil", "arcana": "major", "suit": None, "element": "earth", "astrology": "摩羯座",
        "upKeywords": ["物質束縛", "慾望誘惑", "執念成癮", "陰影面", "自我設限", "金錢權力"],
        "revKeywords": ["打破枷鎖", "覺醒解脫", "戒除成癮", "看清幻象", "重獲自由", "克服誘惑"],
        "symbols": ["羊頭惡魔Baphomet", "倒五角星", "點燃火炬", "被鬆縛鐵鍊的男女", "黑石基座"],
        "upMeaning": "惡魔象徵被物質慾望、恐懼或不良習慣所禁錮。男女頸上的鐵鍊實則寬鬆可自行脫下，審視內心，重獲自主意識。",
        "revMeaning": "看破虛妄的誘惑與執念，開始採取行動打破不良關係或習慣的束縛，逐步迎向自由新生。",
        "love": "強烈佔有慾、肉體吸引或不健康依賴；逆位意識到問題根源，開始解脫與療癒。",
        "career": "過度追求權力地位或處於高壓受壓迫環境；逆位決定跳脫有毒職場重新出發。",
        "finance": "過度追求金錢物質、貪婪或陷入債務危機；逆位開始重整債務、拒絕過度消費。",
        "prompt": "The Devil tarot card, a horned goat demon perched on a black pedestal holding a fiery torch upside down, chained silhouetted man and woman below, inverted pentagram, stained glass cathedral style, dramatic crimson charcoal and sulfur gold glass panels, gothic arch."
    },
    {
        "id": "major_16", "num": 16, "nameZh": "高塔", "nameEn": "The Tower", "arcana": "major", "suit": None, "element": "fire", "astrology": "火星",
        "upKeywords": ["突變瓦解", "打破虛妄", "震撼覺醒", "舊有崩塌", "解放突破", "危機轉機"],
        "revKeywords": ["恐懼崩潰", "逃避必然", "內在動盪", "勉強支撐", "災難餘波", "延遲爆發"],
        "symbols": ["高聳石塔", "天降雷霆", "皇冠被擊落", "火焰自窗噴湧", "墜落人物", "二十二道火星"],
        "upMeaning": "閃電擊中建立在傲慢與虛幻之上的高塔，瞬間崩解。突如其來的改變雖令人震撼，但唯有破除虛妄，真正的真理方能顯露。",
        "revMeaning": "明知體系已搖搖欲墜卻仍勉強苦撐，或內心經歷深層的無聲劇變。接納現實才能從廢墟中重建。",
        "love": "突然爆發的劇烈爭執或關係瓦解；逆位勉強維持表面和平，需誠實面對核心問題。",
        "career": "公司架構重整、專案突然喊停或重大突發事件；逆位需提早準備後路，勿心存僥倖。",
        "finance": "意料之外的財務衝擊或投資失利；逆位加強風險控管，避免連鎖崩盤。",
        "prompt": "The Tower tarot card, a tall stone tower struck by a bolt of divine lightning, fiery explosion blowing off the golden crown, figures falling into stormy abyss, dark clouds, stained glass cathedral aesthetic, vivid lightning gold crimson and stormy indigo glass, gothic arch."
    },
    {
        "id": "major_17", "num": 17, "nameZh": "星星", "nameEn": "The Star", "arcana": "major", "suit": None, "element": "air", "astrology": "水瓶座",
        "upKeywords": ["希望", "靈感啟發", "心靈療癒", "寧靜祥和", "願景", "宇宙祝福"],
        "revKeywords": ["失去希望", "信心動搖", "悲觀消極", "靈感阻滯", "自我懷疑", "失望落空"],
        "symbols": ["八角主星與七小星", "裸身仙女", "雙壺傾倒甘露", "綠地與清池", "聖鳥朱鷺"],
        "upMeaning": "在暴風雨過後，星星為心靈帶來寧靜、希望與療癒之光。信任宇宙的指引，你的願景正受到無條件的祝福與呵護。",
        "revMeaning": "暫時陷入迷惘與悲觀，懷疑自己的未來前景。提醒你抬起頭仰望星空，希望之光從未熄滅。",
        "love": "純潔無瑕、互相信任與充滿希望的美好戀情；逆位需重建對愛情的信心與安全感。",
        "career": "靈感湧現、創意滿點，對未來職業藍圖充滿憧憬；逆位需注意理想過高而缺乏實踐步驟。",
        "finance": "財務狀況平穩轉好，對未來持樂觀預期；逆位避免過於理想化預期收益。",
        "prompt": "The Star tarot card, a luminous nude maiden pouring crystalline water from two pitchers onto earth and shimmering pool under a vast radiant eight-pointed gold star and seven lesser stars, sacred ibis bird, stained glass cathedral style, azure teal and starlight silver glass, gothic arch."
    },
    {
        "id": "major_18", "num": 18, "nameZh": "月亮", "nameEn": "The Moon", "arcana": "major", "suit": None, "element": "water", "astrology": "雙魚座",
        "upKeywords": ["潛意識", "直覺夢境", "迷茫不安", "隱藏真相", "幻象恐懼", "情緒波瀾"],
        "revKeywords": ["撥雲見日", "走出恐懼", "真相大白", "直覺清晰", "克服焦慮", "釋懷解惑"],
        "symbols": ["滴落金色露珠之月", "雙石塔", "嚎叫之狼與狗", "池中爬出之龍蝦", "蜿蜒小徑"],
        "upMeaning": "月光映照出潛意識的迷霧與隱秘恐懼。事情可能不如表面看起來那般明確，信任內在直覺，穿透迷霧尋找真實。",
        "revMeaning": "迷霧逐漸消散，隱藏的真相浮出水面，內心的焦慮與不安開始獲得釋懷與平息。",
        "love": "充滿不確定感、猜忌或情緒化波動；逆位彼此坦白心中疑慮，誤會冰釋。",
        "career": "形勢不明朗、存在隱藏資訊或方向不清；逆位局勢逐漸清晰，看清真實走向。",
        "finance": "存在看不見的財務風險或投資盲點；逆位理清混亂帳目，避免受騙上當。",
        "prompt": "The Moon tarot card, a mysterious crescent moon with weeping drops shining over twin stone towers, a howling dog and wolf, a crayfish emerging from deep water, winding path, stained glass cathedral window style, deep midnight indigo sea green and silver glass, gothic arch."
    },
    {
        "id": "major_19", "num": 19, "nameZh": "太陽", "nameEn": "The Sun", "arcana": "major", "suit": None, "element": "fire", "astrology": "太陽",
        "upKeywords": ["成功勝利", "喜悅快樂", "生命活力", "光明坦蕩", "自信榮耀", "豐收繁榮"],
        "revKeywords": ["暫時陰霾", "延遲成功", "過度樂觀", "精力耗損", "驕傲自滿", "缺乏熱情"],
        "symbols": ["燦爛神日", "騎白馬赤子", "向日葵花牆", "紅色勝利旗幟", "羽毛花冠"],
        "upMeaning": "太陽帶來至高無上的光明、溫暖與勝利。你正處於能量充沛、成就斐然且充滿純粹快樂的黃金時刻，盡情閃耀！",
        "revMeaning": "雖然成功稍有延遲或偶有陰霾，但光明本質不變。保持熱情與自信，烏雲終將散去。",
        "love": "充滿熱情、真誠透明且備受祝福的幸福戀情；逆位注意偶爾的小任性或過於自我中心。",
        "career": "項目大獲成功、能力備受肯定與讚譽；逆位即使遇到小挫折亦能順利克服。",
        "finance": "財運大吉、收入豐厚、投資回報亮眼；逆位注意避免過度樂觀造成不必要支出。",
        "prompt": "The Sun tarot card, a radiant smiling golden sun beaming down on a joyous naked child on a calm white horse holding a red banner, vibrant wall of sunflowers behind, stained glass cathedral art, brilliant golden yellow amber and rich red glass panels, ornate gothic arch."
    },
    {
        "id": "major_20", "num": 20, "nameZh": "審判", "nameEn": "Judgement", "arcana": "major", "suit": None, "element": "fire", "astrology": "冥王星",
        "upKeywords": ["覺醒召喚", "重大決定", "重生救贖", "回顧省察", "因果結清", "靈性復甦"],
        "revKeywords": ["猶豫不決", "拒絕召喚", "自我否定", "悔恨自責", "重複犯錯", "延誤決策"],
        "symbols": ["大天使加百列", "金色末日號角", "聖十字白旗", "石棺甦醒之人群", "崇山峻嶺"],
        "upMeaning": "號角吹響，象徵重大覺醒與重生的時刻已至。總結過去的經驗教訓，勇敢回應內心的天命召喚，開啟全新生命階段。",
        "revMeaning": "面對重大抉擇猶豫不決，或過度沉溺於過去的錯誤自責中。給予自己寬恕，才能邁步向前。",
        "love": "關係迎來關鍵重大決定（復合、定局或昇華）；逆位需放下過去舊怨才能重獲新生。",
        "career": "事業轉捩點，迎來關鍵轉型或升遷機會；逆位切忌拖延做決定的時機。",
        "finance": "結清舊債、重組資產、做出重大財務決定；逆位避免重蹈過去不良投資覆轍。",
        "prompt": "The Judgement tarot card, archangel Gabriel blowing a golden herald trumpet with cross banner from the heavens, resurrected souls rising joyfully with open arms from stone tombs below, stained glass cathedral style, vivid celestial blue crimson and radiant gold glass, gothic arch."
    },
    {
        "id": "major_21", "num": 21, "nameZh": "世界", "nameEn": "The World", "arcana": "major", "suit": None, "element": "earth", "astrology": "土星",
        "upKeywords": ["圓滿達成", "整合統一", "成功完結", "環遊世界", "全面勝利", "全新循環"],
        "revKeywords": ["未竟之志", "臨門一腳", "拖延未結", "缺乏收尾", "完美主義阻礙", "封閉不前"],
        "symbols": ["綠色月桂花環", "曼妙舞者手持雙權杖", "紅色彩帶", "四活物（人、鷹、獅、牛）"],
        "upMeaning": "世界牌是大阿爾克那的最終圓滿。代表一個重大週期的完美收官，所有要素整合為一，獲得全然的自由、成就與喜悅。",
        "revMeaning": "事情已接近終點但仍差臨門一腳，或因缺乏收尾而感到留有遺憾。集中精力完成最後一哩路。",
        "love": "靈魂伴侶般的圓滿和諧，關係迎來美好修成正果；逆位需化解最後的芥蒂方能圓滿。",
        "career": "專案圓滿成功、達成長期目標、名利雙收；逆位專注於把最後細節處理妥當。",
        "finance": "財務達成理想目標，整體資產佈局完整穩健；逆位注意完成最後結算手續。",
        "prompt": "The World tarot card, a triumphant divine dancer draped in purple cloth holding twin wands inside an oval green laurel wreath tied with red ribbons, flanked by four cosmic beasts in corners, stained glass cathedral style, lush emerald violet and celestial gold glass, gothic arch."
    }
]

# 四大花色配置
SUITS = [
    {
        "key": "wands", "nameZh": "權杖", "nameEn": "Wands", "element": "fire", "colors": "Fiery crimson, amber, solar gold",
        "keywords": ["行動", "意志", "熱情", "創造力", "事業開拓"]
    },
    {
        "key": "cups", "nameZh": "聖杯", "nameEn": "Cups", "element": "water", "colors": "Deep ocean sapphire, azure, silver, turquoise",
        "keywords": ["情感", "直覺", "人際關係", "愛與和諧", "靈性感受"]
    },
    {
        "key": "swords", "nameZh": "寶劍", "nameEn": "Swords", "element": "air", "colors": "Stormy sky blue, steel grey, radiant white, silver",
        "keywords": ["思維", "理智", "挑戰", "溝通決策", "真相洞察"]
    },
    {
        "key": "pentacles", "nameZh": "錢幣", "nameEn": "Pentacles", "element": "earth", "colors": "Lush emerald green, rich ochre earth, antique gold",
        "keywords": ["物質", "財富", "工作實踐", "健康穩定", "長期根基"]
    }
]

# 數字牌 (1-10) 與宮廷牌 (Page, Knight, Queen, King)
MINOR_TEMPLATES = [
    {"suffix": "01", "num": 1, "rank": "Ace", "rankZh": "一", "isCourt": False},
    {"suffix": "02", "num": 2, "rank": "Two", "rankZh": "二", "isCourt": False},
    {"suffix": "03", "num": 3, "rank": "Three", "rankZh": "三", "isCourt": False},
    {"suffix": "04", "num": 4, "rank": "Four", "rankZh": "四", "isCourt": False},
    {"suffix": "05", "num": 5, "rank": "Five", "rankZh": "五", "isCourt": False},
    {"suffix": "06", "num": 6, "rank": "Six", "rankZh": "六", "isCourt": False},
    {"suffix": "07", "num": 7, "rank": "Seven", "rankZh": "七", "isCourt": False},
    {"suffix": "08", "num": 8, "rank": "Eight", "rankZh": "八", "isCourt": False},
    {"suffix": "09", "num": 9, "rank": "Nine", "rankZh": "九", "isCourt": False},
    {"suffix": "10", "num": 10, "rank": "Ten", "rankZh": "十", "isCourt": False},
    {"suffix": "page", "num": 11, "rank": "Page", "rankZh": "侍從", "isCourt": True},
    {"suffix": "knight", "num": 12, "rank": "Knight", "rankZh": "騎士", "isCourt": True},
    {"suffix": "queen", "num": 13, "rank": "Queen", "rankZh": "皇后", "isCourt": True},
    {"suffix": "king", "num": 14, "rank": "King", "rankZh": "國王", "isCourt": True}
]

# 小阿爾克那詳細牌面定義
MINOR_DETAILS = {
    # 權杖組
    "wands_01": {"symbols": ["雲中神手", "發芽權杖", "遠方城堡"], "upMeaning": "靈感的火花與新計畫的啟動，充滿強大行動力與熱情。", "revMeaning": "缺乏方向、熱情消退或時機尚未成熟。"},
    "wands_02": {"symbols": ["城堡領主", "地球儀", "遠眺海港"], "upMeaning": "站在穩固基礎上放眼未來，進行宏觀規劃與關鍵決策。", "revMeaning": "猶豫不決、害怕跨出舒適圈或過度擔憂未來。"},
    "wands_03": {"symbols": ["山崖背影", "三根權杖", "商船出海"], "upMeaning": "努力開始展現成果，版圖持續擴張，開拓更廣闊視野。", "revMeaning": "進展受阻、合作不如預期或延遲回報。"},
    "wands_04": {"symbols": ["花環四柱拱門", "歡慶人群", "宏偉城堡"], "upMeaning": "穩固的基石、家庭和諧、階段性成就與盛大慶祝。", "revMeaning": "短暫的家庭磨擦或慶典延期，但根基依然穩固。"},
    "wands_05": {"symbols": ["五位青年", "持杖比試", "良性競爭"], "upMeaning": "意見分歧與競爭挑戰，在磨合碰撞中激發潛能。", "revMeaning": "衝突升級、內耗或避免正面交鋒逃避問題。"},
    "wands_06": {"symbols": ["桂冠騎士", "凱旋而歸", "歡呼群眾"], "upMeaning": "取得顯著勝利、獲得公眾認可與讚譽，自信前行。", "revMeaning": "自負傲慢、虛名浮誇或勝利果實遭到忽視。"},
    "wands_07": {"symbols": ["高處勇士", "持杖防守", "面對眾敵"], "upMeaning": "堅守自己的立場與原則，勇敢抵擋外界挑戰與壓力。", "revMeaning": "寡不敵眾感到精疲力竭，或過度防禦產生孤立。"},
    "wands_08": {"symbols": ["八杖長空飛行", "迅速前進", "晴空萬里"], "upMeaning": "進展神速、消息迅速傳遞、旅行或突如其來的良機。", "revMeaning": "急躁莽撞、訊息混亂延誤或行動受阻。"},
    "wands_09": {"symbols": ["受傷守衛", "八杖圍籬", "警惕防範"], "upMeaning": "歷經考驗仍堅毅不拔，保持警戒守護最後防線。", "revMeaning": "防衛過當、草木皆兵，過度消耗內在能量。"},
    "wands_10": {"symbols": ["負重十杖", "艱難前行", "城鎮在望"], "upMeaning": "責任沉重、承擔過多壓力，需學會分工與釋放負擔。", "revMeaning": "不堪重負、崩潰邊緣，必須學會放手與求助。"},
    "wands_page": {"symbols": ["熱情青年", "凝視權杖", "沙漠綠洲"], "upMeaning": "充滿好奇心與冒險精神，帶來令人振奮的新消息與創意。", "revMeaning": "三分鐘熱度、浮躁不實或不可靠的訊息。"},
    "wands_knight": {"symbols": ["火蜥蜴戰袍", "奔騰戰馬", "衝鋒前進"], "upMeaning": "充滿激情與衝勁，勇往直前追求目標，充滿自信。", "revMeaning": "魯莽衝動、脾氣暴躁或虎頭蛇尾。"},
    "wands_queen": {"symbols": ["向日葵", "黑貓", "獅王寶座"], "upMeaning": "自信熱情、獨立溫暖、極具個人魅力與領導風采。", "revMeaning": "情緒起伏大、嫉妒心強或強勢霸道。"},
    "wands_king": {"symbols": ["火龍王冠", "火焰王座", "遠見卓識"], "upMeaning": "成熟的開拓者與領袖，具備遠見、勇氣與激勵他人的力量。", "revMeaning": "獨斷專行、專橫霸道或設定過高不切實際的目標。"},

    # 聖杯組
    "cups_01": {"symbols": ["神手托金杯", "五道甘泉", "含聖餅和平鴿"], "upMeaning": "充沛的情感、心靈滋潤與靈性覺醒，愛與喜悅的新起點。", "revMeaning": "情感壓抑、靈感阻滯或感到內在空虛。"},
    "cups_02": {"symbols": ["男女互敬", "雙蛇杖Caduceus", "帶翼獅頭"], "upMeaning": "平等真摯的愛戀、深刻夥伴連結與相互吸引的和諧。", "revMeaning": "關係失衡、溝通誤會或短暫的分歧。"},
    "cups_03": {"symbols": ["三位少女", "高舉聖杯", "豐收花果"], "upMeaning": "友誼的歡慶、團隊協作成功、社交聚會與共同喜悅。", "revMeaning": "過度放縱、小圈子排擠或社交疲勞。"},
    "cups_04": {"symbols": ["樹下青年", "抱胸沉思", "雲中第四杯"], "upMeaning": "冷淡倦怠、過度內省而忽略眼前的機會與關懷。", "revMeaning": "打破冷漠、重拾熱情，重新接納外界新機會。"},
    "cups_05": {"symbols": ["黑袍背影", "傾倒三杯", "背後兩杯依然佇立"], "upMeaning": "沈溺於失落與悲傷，提醒你轉過身，希望與美好仍在。", "revMeaning": "走出傷痛、接納遺憾，重新發現身邊擁有的價值。"},
    "cups_06": {"symbols": ["古堡庭院", "贈花孩童", "純真回憶"], "upMeaning": "溫暖的回憶、童年純真、舊友重逢與無私的分享饋贈。", "revMeaning": "沉溺過去、抗拒長大或受困於童年陰影。"},
    "cups_07": {"symbols": ["雲中七杯", "浮現幻象", "面臨誘惑"], "upMeaning": "選擇繁多但真假難辨，需分辨幻想與現實，跟隨真心。", "revMeaning": "看破幻象、目標清晰，做出切實可行的選擇。"},
    "cups_08": {"symbols": ["月夜旅人", "八杯佇立", "背向走向山峰"], "upMeaning": "勇敢告別不再滋養心靈的現狀，踏上尋求更高意義的旅程。", "revMeaning": "害怕離開舒適圈、猶豫不決或流浪無依。"},
    "cups_09": {"symbols": ["富足男子", "九杯排列", "滿足微笑"], "upMeaning": "願望成真、自我實現、精神與物質皆感到極大滿足。", "revMeaning": "自滿傲慢、過度物質享受或內心仍感空虛。"},
    "cups_10": {"symbols": ["彩虹十杯", "幸福家庭", "綠意家園"], "upMeaning": "情感的終極圓滿、家庭幸福美滿、和諧長久的愛。", "revMeaning": "家庭溝通摩擦或表面和諧但暗藏矛盾。"},
    "cups_page": {"symbols": ["溫柔侍從", "杯中金魚", "粉藍長袍"], "upMeaning": "富有想像力、直覺敏銳、帶來溫馨的情感或藝術好消息。", "revMeaning": "過度敏感脆弱、情緒化或不切實際的幻想。"},
    "cups_knight": {"symbols": ["優雅騎士", "白馬漫步", "高捧聖杯"], "upMeaning": "浪漫熱情、理想主義、跟隨內心追求美與真愛。", "revMeaning": "不切實際、情緒多變或花言巧語缺乏責任感。"},
    "cups_queen": {"symbols": ["海邊王座", "華麗密閉聖杯", "慈愛溫柔"], "upMeaning": "同理心強大、情感深邃、能深刻滋養與理解他人。", "revMeaning": "情緒勒索、過度依賴或容易受外界情緒感染失衡。"},
    "cups_king": {"symbols": ["海中石座", "聖杯權杖", "波浪起伏"], "upMeaning": "情感成熟、智慧沉穩、能在狂瀾中保持平衡的引導者。", "revMeaning": "冷酷壓抑、情緒操控或表面平靜內在焦慮。"},

    # 寶劍組
    "swords_01": {"symbols": ["神手擎劍", "橄欖與棕櫚桂冠", "山巔破雲"], "upMeaning": "思想的重大突破、真理與洞察力，用清晰理智開創新局。", "revMeaning": "思緒混亂、濫用言語傷人或判斷失誤。"},
    "swords_02": {"symbols": ["蒙眼女子", "雙劍交叉", "平靜海面"], "upMeaning": "面臨兩難抉擇、暫時維持內外平衡，需打破盲點做出決定。", "revMeaning": "資訊揭露、打破僵局，被逼做出抉擇。"},
    "swords_03": {"symbols": ["三劍穿心", "風雨暴雲", "心碎療癒"], "upMeaning": "經歷心碎、悲傷與背叛的痛苦，接納悲傷是療癒的起點。", "revMeaning": "傷痛逐漸平復、走出陰霾，迎向心靈復原。"},
    "swords_04": {"symbols": ["教堂騎士雕像", "三劍懸牆一劍在側", "彩繪玻璃窗"], "upMeaning": "暫時退避休養、冥想沉澱、為即將到來的挑戰積蓄能量。", "revMeaning": "被迫休養結束、重回戰場，或過度孤立。"},
    "swords_05": {"symbols": ["狡黠男子", "手攬三劍", "敗者遠去"], "upMeaning": "贏得表面勝利但輸掉關係，自私爭鬥帶來的代價。", "revMeaning": "渴望和解、放下爭端，從失敗中記取教訓。"},
    "swords_06": {"symbols": ["擺渡舟子", "載運六劍母子", "航向平靜水域"], "upMeaning": "渡過難關、漸入佳境、在療癒之旅中航向平靜彼岸。", "revMeaning": "進展緩慢、背負沉重包袱、難以擺脫困境。"},
    "swords_07": {"symbols": ["躡足男子", "偷抱五劍", "回望敵營"], "upMeaning": "運用策略智慧謀略，或警惕暗處的欺瞞與投機行為。", "revMeaning": "計謀敗露、坦誠面對，或改採光明正大途徑。"},
    "swords_08": {"symbols": ["蒙眼綁縛女子", "八劍圍繞", "泥濘水窪"], "upMeaning": "受限於自我設限的思維牢籠，其實隨時可以掙脫束縛。", "revMeaning": "看清限制本質、解除自我束縛，重獲自由行動力。"},
    "swords_09": {"symbols": ["深夜掩面", "九劍橫空", "惡夢焦慮"], "upMeaning": "被擔憂、焦慮與失眠困擾，恐懼往往大於現實本身。", "revMeaning": "走出惡夢、找到出口，焦慮逐漸消退重拾信心。"},
    "swords_10": {"symbols": ["倒臥十劍", "黑雲壓境", "遠方晨曦"], "upMeaning": "徹底的結束與低谷，最壞的時刻已過，黎明就在眼前。", "revMeaning": "絕處逢生、痛苦過去，開始緩慢復原。"},
    "swords_page": {"symbols": ["機敏青年", "持劍回望", "狂風綠原"], "upMeaning": "思維敏銳、好奇心旺盛、具備洞察力但需防言多必失。", "revMeaning": "暗中窺探、搬弄是非、言語刻薄或缺乏耐心。"},
    "swords_knight": {"symbols": ["衝鋒騎士", "拔劍策馬", "狂風驟雨"], "upMeaning": "果斷勇敢、行動迅速、為了目標不顧一切衝鋒陷陣。", "revMeaning": "盲目魯莽、言語傷人、缺乏深思熟慮。"},
    "swords_queen": {"symbols": ["肅穆女王", "手持利劍", "雲端石座"], "upMeaning": "理智清醒、獨立正直、能洞悉真相並做出客觀公正判斷。", "revMeaning": "過於嚴苛冷酷、尖酸刻薄或封閉情感。"},
    "swords_king": {"symbols": ["嚴肅國王", "裁決之劍", "天使雕飾王座"], "upMeaning": "權威理智、邏輯清晰、具備卓越的戰略智慧與判斷力。", "revMeaning": "冷酷專斷、濫用權力、偏執冷血。"},

    # 錢幣組
    "pentacles_01": {"symbols": ["神手托金幣", "花園拱門", "百合通道"], "upMeaning": "物質與事業的新機遇、實質的財富種子與穩固開端。", "revMeaning": "錯失財務良機、預算不足或基礎不穩固。"},
    "pentacles_02": {"symbols": ["雜耍青年", "無限雙幣", "巨浪起伏"], "upMeaning": "在多重任務與資源間靈活調度平衡，隨機應變。", "revMeaning": "財務失衡、分身乏術、感到難以兼顧。"},
    "pentacles_03": {"symbols": ["雕刻工匠", "建築師修士", "教堂拱頂"], "upMeaning": "專業技能展現、團隊通力協作、精益求精共創成果。", "revMeaning": "缺乏合作精神、技術不足或溝通產生歧見。"},
    "pentacles_04": {"symbols": ["緊抱金幣", "頭頂足踩", "背後城市"], "upMeaning": "注重安全感與資源守護，但需防過度守財與掌控慾。", "revMeaning": "過度吝嗇導致人際疏離，或開始學會適度分享。"},
    "pentacles_05": {"symbols": ["風雪跛行", "彩繪玻璃窗", "貧寒相依"], "upMeaning": "暫時的物質困窘或孤立無援，記得身旁始終有溫暖支持。", "revMeaning": "度過財務寒冬、重獲生機與援助。"},
    "pentacles_06": {"symbols": ["富商施捨", "公平天平", "跪拜貧民"], "upMeaning": "慷慨施予、資源共享，在付出與接受間維持平衡。", "revMeaning": "施捨帶有條件、自高自大或財務分配不均。"},
    "pentacles_07": {"symbols": ["倚鋤農夫", "審視七幣", "葡萄藤蔓"], "upMeaning": "耐心等待成果收穫、階段性評估進度與長遠規劃。", "revMeaning": "急功近利、焦躁不耐或投資效益低落。"},
    "pentacles_08": {"symbols": ["專注工匠", "刻製八幣", "勤勉不懈"], "upMeaning": "專注於技藝磨練、踏實工作、精益求精必有回報。", "revMeaning": "缺乏熱情、機械式重複或投機取巧。"},
    "pentacles_09": {"symbols": ["葡萄園貴婦", "金幣滿藤", "臂上獵鷹"], "upMeaning": "自給自足、獨立優雅、享受辛勤耕耘換來的豐盛成果。", "revMeaning": "過度炫耀、物質空虛或過度重視外在評價。"},
    "pentacles_10": {"symbols": ["三代同堂", "家徽拱門", "忠犬安居"], "upMeaning": "家族繁榮、世代傳承、物質與精神皆無比富足。", "revMeaning": "家族爭產、傳統觀念束縛或財務糾紛。"},
    "pentacles_page": {"symbols": ["踏實青年", "雙手捧幣", "繁茂田野"], "upMeaning": "求知若渴、腳踏實地、帶來實用可行的學習與商業機會。", "revMeaning": "缺乏進取心、短視近利或浪費機會。"},
    "pentacles_knight": {"symbols": ["黑馬騎士", "手捧金幣", "耕耘田野"], "upMeaning": "勤勉負責、沉著穩重、一步一腳印實現長期目標。", "revMeaning": "固執不知變通、缺乏熱情進度緩慢。"},
    "pentacles_queen": {"symbols": ["森林女王", "膝抱金幣", "繁盛果實"], "upMeaning": "務實溫暖、擅長理財與照料家庭，充滿母性慈愛。", "revMeaning": "過度物質主義、過度操勞或忽略心靈滋養。"},
    "pentacles_king": {"symbols": ["葡萄藤袍國王", "手握金幣權杖", "公牛浮雕王座"], "upMeaning": "事業有成、富甲一方、穩健可靠且具備卓越商業智慧。", "revMeaning": "唯利是圖、剛愎自用或貪圖安逸享受。"}
}

# 組合小阿爾克那 56 張
for suit in SUITS:
    s_key = suit["key"]
    for tpl in MINOR_TEMPLATES:
        cid = f"{s_key}_{tpl['suffix']}"
        nameZh = f"{suit['nameZh']}{tpl['rankZh']}"
        nameEn = f"{tpl['rank']} of {suit['nameEn']}"
        details = MINOR_DETAILS.get(cid, {})
        
        card_obj = {
            "id": cid,
            "num": tpl["num"],
            "nameZh": nameZh,
            "nameEn": nameEn,
            "arcana": "minor",
            "suit": s_key,
            "element": suit["element"],
            "astrology": "",
            "upKeywords": [f"{suit['nameZh']}能量", "專注", "發展"] + suit["keywords"][:3],
            "revKeywords": ["阻礙", "失衡", "需調整"],
            "symbols": details.get("symbols", [f"{suit['nameZh']}象徵圖騰"]),
            "upMeaning": details.get("upMeaning", f"{nameZh}代表{suit['keywords'][0]}的具體展現，順勢而為將有顯著進展。"),
            "revMeaning": details.get("revMeaning", f"{nameZh}逆位提醒審視當前步調，調整策略以克服阻礙。"),
            "love": f"感情中展現{suit['keywords'][0]}與和諧互動，彼此真誠相待。",
            "career": f"在工作事業上運用專業與熱情，推動計畫平穩前行。",
            "finance": f"財務狀況需注重穩健與理性規劃，依循正確方向前進。",
            "prompt": f"{nameEn} tarot card, showing {', '.join(details.get('symbols', [suit['nameZh']]))}, stained glass cathedral style, {suit['colors']}, intricate black leaded lines, gothic golden arch frame."
        }
        CARDS.append(card_obj)

print(f"Total cards constructed: {len(CARDS)}")

# 1. 寫入 tarot-data.json
tarot_data = {
    "version": 1,
    "total": len(CARDS),
    "cards": CARDS
}
with open('tarot/tarot-data.json', 'w', encoding='utf-8') as f:
    json.dump(tarot_data, f, ensure_ascii=False, indent=2)

# 2. 寫入 tarot-meanings.json (優化查詢用的結構)
meanings_dict = {}
for c in CARDS:
    meanings_dict[c["id"]] = {
        "nameZh": c["nameZh"],
        "nameEn": c["nameEn"],
        "arcana": c["arcana"],
        "suit": c["suit"],
        "element": c["element"],
        "astrology": c.get("astrology", ""),
        "uprightKeywords": c["upKeywords"],
        "reversedKeywords": c["revKeywords"],
        "symbols": c["symbols"],
        "uprightMeaning": c["upMeaning"],
        "reversedMeaning": c["revMeaning"],
        "loveMeaning": c["love"],
        "careerMeaning": c["career"],
        "financeMeaning": c["finance"]
    }
with open('tarot/tarot-meanings.json', 'w', encoding='utf-8') as f:
    json.dump(meanings_dict, f, ensure_ascii=False, indent=2)

# 3. 寫入 tarot-assets.json
assets_dict = {
    "card_back": {
        "web": "images/tarot/web/card_back.webp",
        "thumb": "images/tarot/thumb/card_back.webp",
        "master": "images/tarot/master/card_back.png",
        "legacy": "images/card_back.png"
    },
    "cards": {}
}
for c in CARDS:
    cid = c["id"]
    assets_dict["cards"][cid] = {
        "web": f"images/tarot/web/{cid}.webp",
        "thumb": f"images/tarot/thumb/{cid}.webp",
        "master": f"images/tarot/master/{cid}.png"
    }
with open('tarot/tarot-assets.json', 'w', encoding='utf-8') as f:
    json.dump(assets_dict, f, ensure_ascii=False, indent=2)

# 4. 分類導出 Prompt JSON 檔
prompt_groups = {
    "major": [c for c in CARDS if c["arcana"] == "major"],
    "wands": [c for c in CARDS if c.get("suit") == "wands"],
    "cups": [c for c in CARDS if c.get("suit") == "cups"],
    "swords": [c for c in CARDS if c.get("suit") == "swords"],
    "pentacles": [c for c in CARDS if c.get("suit") == "pentacles"]
}

for gname, glist in prompt_groups.items():
    p_data = [
        {
            "id": c["id"],
            "nameZh": c["nameZh"],
            "nameEn": c["nameEn"],
            "prompt": c["prompt"]
        } for c in glist
    ]
    with open(f'tarot/prompts/{gname}-prompts.json', 'w', encoding='utf-8') as f:
        json.dump(p_data, f, ensure_ascii=False, indent=2)

print("All tarot database files successfully created!")
