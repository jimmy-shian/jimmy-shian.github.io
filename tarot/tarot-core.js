/**
 * tarot-core.js
 * 統一塔羅核心引擎 - 負責牌組加載、密碼學隨機洗牌、抽牌、牌陣配置與牌義解析
 */
(function(window) {
  'use strict';

  let tarotData = null;
  let tarotMeanings = null;
  let tarotAssets = null;
  let isLoaded = false;
  let loadPromise = null;

  const SPREAD_DEFINITIONS = {
    time: {
      id: 'time',
      name: '時序牌陣 (過去 / 現在 / 未來)',
      count: 3,
      positions: [
        { name: '過去', desc: '過去的根源、經歷與形成的基礎' },
        { name: '現在', desc: '當前的現況、核心問題與主要能量' },
        { name: '未來', desc: '未來可能發展的趨勢與結果' }
      ]
    },
    problem: {
      id: 'problem',
      name: '難題解析牌陣 (現況 / 阻礙 / 建議)',
      count: 3,
      positions: [
        { name: '現況', desc: '目前的真實狀態與面臨的局面' },
        { name: '阻礙', desc: '阻礙前進的核心難題與盲點' },
        { name: '建議', desc: '突破困境的最佳指引與行動策略' }
      ]
    },
    mind: {
      id: 'mind',
      name: '身心靈牌陣 (身 / 心 / 靈)',
      count: 3,
      positions: [
        { name: '身體 (物理層面)', desc: '健康狀態、物質生活與現實行動' },
        { name: '心智 (心理層面)', desc: '情緒感受、思維模式與人際心境' },
        { name: '靈性 (心靈層面)', desc: '潛意識智慧、靈魂渴望與更高指引' }
      ]
    },
    relationship: {
      id: 'relationship',
      name: '人際關係牌陣 (自己 / 對方 / 關係)',
      count: 3,
      positions: [
        { name: '我的心態', desc: '你在這段關係中的角色、期望與盲點' },
        { name: '對方心態', desc: '對方目前的感受、態度與真實想法' },
        { name: '關係走向', desc: '兩人互動的能量交會與未來走向' }
      ]
    }
  };

  const TarotCore = {
    /**
     * 初始化加載塔羅資料庫
     * @param {string} basePath 相對於根目錄的路徑
     */
    init: function(basePath = './') {
      if (isLoaded) return Promise.resolve(true);
      if (loadPromise) return loadPromise;

      const cleanBase = basePath.endsWith('/') ? basePath : basePath + '/';
      const dataUrl = `${cleanBase}tarot/tarot-data.json`;
      const meaningsUrl = `${cleanBase}tarot/tarot-meanings.json`;
      const assetsUrl = `${cleanBase}tarot/tarot-assets.json`;

      loadPromise = Promise.all([
        fetch(dataUrl).then(r => r.json()),
        fetch(meaningsUrl).then(r => r.json()),
        fetch(assetsUrl).then(r => r.json())
      ]).then(([data, meanings, assets]) => {
        tarotData = data;
        tarotMeanings = meanings;
        tarotAssets = assets;
        isLoaded = true;
        return true;
      }).catch(err => {
        console.error('[TarotCore] Failed to load tarot JSON datasets:', err);
        return false;
      });

      return loadPromise;
    },

    /**
     * 取得完整或篩選的牌組
     */
    getDeck: function(filter = {}) {
      if (!isLoaded || !tarotData) return [];
      let cards = [...tarotData.cards];

      if (filter.majorOnly) {
        cards = cards.filter(c => c.arcana === 'major');
      }
      if (filter.suit) {
        cards = cards.filter(c => c.suit === filter.suit);
      }
      if (filter.search) {
        const q = filter.search.toLowerCase().trim();
        cards = cards.filter(c => 
          c.nameZh.includes(q) || 
          c.nameEn.toLowerCase().includes(q) ||
          (c.upKeywords && c.upKeywords.some(k => k.toLowerCase().includes(q)))
        );
      }

      return cards;
    },

    /**
     * 密碼學安全洗牌 (Fisher-Yates)
     */
    shuffle: function(cards) {
      const arr = [...cards];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = (window.AppUtils && window.AppUtils.getRandomInt)
          ? window.AppUtils.getRandomInt(0, i)
          : Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },

    /**
     * 依 ID 取得單張牌完整資料
     */
    getCardById: function(cardId) {
      if (!isLoaded || !tarotData) return null;
      const base = tarotData.cards.find(c => c.id === cardId);
      if (!base) return null;
      const details = tarotMeanings ? tarotMeanings[cardId] : {};
      const asset = tarotAssets && tarotAssets.cards ? tarotAssets.cards[cardId] : null;

      return {
        ...base,
        ...details,
        imageWeb: asset ? asset.web : `images/tarot/web/${cardId}.webp`,
        imageThumb: asset ? asset.thumb : `images/tarot/thumb/${cardId}.webp`
      };
    },

    /**
     * 抽牌
     * @param {number} count 抽牌張數
     * @param {object} options { majorOnly, allowReversed, spreadType, category, basePath }
     */
    drawCards: function(count = 1, options = {}) {
      if (!isLoaded) {
        console.warn('[TarotCore] Call drawCards before init completed');
        return [];
      }

      const deck = this.getDeck({ majorOnly: options.majorOnly });
      const shuffled = this.shuffle(deck);
      const drawn = shuffled.slice(0, count);
      const allowReversed = options.allowReversed !== false;
      const basePath = options.basePath || './';

      const spreadDef = options.spreadType && SPREAD_DEFINITIONS[options.spreadType] 
        ? SPREAD_DEFINITIONS[options.spreadType] 
        : null;

      return drawn.map((c, index) => {
        // 判定正逆位 (50% 機率)
        const isReversed = allowReversed ? (Math.random() < 0.5) : false;
        const details = tarotMeanings ? tarotMeanings[c.id] : {};
        const asset = tarotAssets && tarotAssets.cards ? tarotAssets.cards[c.id] : null;

        // 計算圖片相對路徑
        const webImg = asset ? asset.web : `images/tarot/web/${c.id}.webp`;
        const thumbImg = asset ? asset.thumb : `images/tarot/thumb/${c.id}.webp`;

        const positionInfo = spreadDef && spreadDef.positions[index]
          ? spreadDef.positions[index]
          : { name: `第 ${index + 1} 張`, desc: '' };

        return {
          ...c,
          ...details,
          isReversed: isReversed,
          orientationText: isReversed ? '逆位 (Reversed)' : '正位 (Upright)',
          activeMeaning: isReversed ? (details.reversedMeaning || c.revMeaning) : (details.uprightMeaning || c.upMeaning),
          activeKeywords: isReversed ? (details.reversedKeywords || c.revKeywords) : (details.uprightKeywords || c.upKeywords),
          position: positionInfo,
          imageWeb: basePath + webImg,
          imageThumb: basePath + thumbImg
        };
      });
    },

    /**
     * 取得牌陣列表與定義
     */
    getSpreads: function() {
      return SPREAD_DEFINITIONS;
    },

    /**
     * 取得卡背圖片路徑
     */
    getCardBackUrl: function(basePath = './') {
      const cleanBase = basePath.endsWith('/') ? basePath : basePath + '/';
      if (tarotAssets && tarotAssets.card_back) {
        return cleanBase + tarotAssets.card_back.web;
      }
      return `${cleanBase}images/tarot/web/card_back.webp`;
    },

    /**
     * 是與否 (Yes / No) 占卜判定
     */
    evaluateYesNo: function(drawnCard) {
      if (!drawnCard) return { verdict: 'Neutral', text: '中立', score: 0 };
      const positiveMajors = ['major_00', 'major_01', 'major_03', 'major_04', 'major_06', 'major_07', 'major_08', 'major_10', 'major_14', 'major_17', 'major_19', 'major_21'];
      const negativeMajors = ['major_13', 'major_15', 'major_16', 'major_18'];

      let score = 0;
      if (drawnCard.arcana === 'major') {
        if (positiveMajors.includes(drawnCard.id)) score += 2;
        else if (negativeMajors.includes(drawnCard.id)) score -= 2;
        else score += 1;
      } else {
        if (drawnCard.suit === 'cups' || drawnCard.suit === 'wands' || drawnCard.suit === 'pentacles') score += 1;
        if (drawnCard.suit === 'swords') score -= 1;
      }

      if (drawnCard.isReversed) score *= -1;

      if (score >= 2) return { verdict: 'Strong Yes', text: '強烈肯定 (Strong Yes)', color: 'var(--success)' };
      if (score === 1) return { verdict: 'Yes', text: '偏向肯定 (Yes)', color: 'var(--primary)' };
      if (score === 0) return { verdict: 'Neutral', text: '情況未定 / 視行動而定 (Neutral)', color: 'var(--warning)' };
      if (score === -1) return { verdict: 'No', text: '偏向否定 (No)', color: 'var(--warning-hover)' };
      return { verdict: 'Strong No', text: '強烈否定 (Strong No)', color: 'var(--danger)' };
    }
  };

  window.TarotCore = TarotCore;
})(typeof window !== 'undefined' ? window : this);
