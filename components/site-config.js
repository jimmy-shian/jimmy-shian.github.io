/**
 * site-config.js
 * 網站全域路徑與工具清單集中管理
 */
(function(window) {
  'use strict';

  // 自動判斷當前頁面相對於網站根目錄的深度
  const pathname = window.location.pathname.replace(/\\/g, '/');
  const isToolsSubdir = pathname.includes('/tools/');
  const rootPath = isToolsSubdir ? '../../' : './';
  const toolsPath = isToolsSubdir ? '../' : './tools/';

  const SiteConfig = {
    rootPath: rootPath,
    toolsPath: toolsPath,
    
    // 全站工具分類與元數據
    categories: [
      { id: 'all', name: '全部工具', tag: 'ALL' },
      { id: 'tarot', name: '塔羅占卜', tag: 'TAROT' },
      { id: 'time', name: '時間計時', tag: 'TIME' },
      { id: 'life', name: '生活實用', tag: 'LIFE' },
      { id: 'random', name: '隨機抽籤', tag: 'DRAW' },
      { id: 'security', name: '密碼安全', tag: 'SEC' },
      { id: 'data', name: '數據圖表', tag: 'DATA' }
    ],

    tools: [
      {
        id: 'random-tarot-randomoutputs',
        category: 'tarot',
        nameZh: '完整塔羅牌抽牌',
        nameEn: 'Complete Tarot Draw & AI Reading',
        description: '支援 78 張完整牌組、正逆位判定與深度問事維度解讀。',
        tag: 'TAROT',
        path: 'random-tarot-randomoutputs/index.html',
        badge: 'AI 深度解讀'
      },
      {
        id: '3-card-tarot-spread-generator',
        category: 'tarot',
        nameZh: '三張牌塔羅佈陣',
        nameEn: '3-Card Tarot Spread Generator',
        description: '經典三牌陣（過去/現在/未來），互動式洗牌選牌與時序脈絡解析。',
        tag: 'SPREAD',
        path: '3-card-tarot-spread-generator/index.html',
        badge: '經典牌陣'
      },
      {
        id: 'the-tarot',
        category: 'tarot',
        nameZh: '塔羅牌百科展示圖鑑',
        nameEn: 'Tarot Deck Encyclopedia',
        description: '完整 78 張高畫質塔羅牌庫、按大/小阿爾克那分類檢視與卡牌翻轉解析。',
        tag: 'ARCHIVE',
        path: 'the-tarot/index.html',
        badge: '78張全覽'
      },
      {
        id: 'universal-timer',
        category: 'time',
        nameZh: '通用多功能計時器',
        nameEn: 'Universal Timer & Stopwatch',
        description: '毫秒級精確秒錶記圈、正數計時器與日常倒數預設，支援圈數記錄與複製。',
        tag: 'TIMER',
        path: 'universal-timer/index.html',
        badge: '多功能'
      },
      {
        id: 'online-alarm-clock',
        category: 'time',
        nameZh: '線上鬧鐘',
        nameEn: 'Online Alarm Clock',
        description: '即時精美時鐘、多組自訂鬧鐘管理與悅耳音效提醒。',
        tag: 'ALARM',
        path: 'online-alarm-clock/index.html',
        badge: '多組提醒'
      },
      {
        id: 'drink-selector',
        category: 'life',
        nameZh: '飲料速食訂購工具',
        nameEn: 'Drink & Fast Food Selector',
        description: '自訂店家菜單、甜度冰塊配料自選、訂單統計與一鍵複製。',
        tag: 'ORDER',
        path: 'drink-selector/index.html',
        badge: '辦公室神器'
      },
      {
        id: 'prize-wheel',
        category: 'random',
        nameZh: '輪盤抽獎工具',
        nameEn: 'Lucky Prize Wheel',
        description: 'Canvas 高流暢輪盤引擎、多色系風格切換與參與者名單管理。',
        tag: 'WHEEL',
        path: 'prize-wheel/index.html',
        badge: '公平旋轉'
      },
      {
        id: 'password-generator',
        category: 'security',
        nameZh: '安全密碼產生器',
        nameEn: 'Secure Password Generator',
        description: '自訂長度、字元規則與排除字元的高強度安全密碼產生工具。',
        tag: 'SECURITY',
        path: 'password-generator/index.html',
        badge: '密碼安全'
      },
      {
        id: 'data-visualizer',
        category: 'data',
        nameZh: '數據可視化圖表工具',
        nameEn: 'Data Visualizer Studio',
        description: '支援 CSV/Excel 拖放上傳、折線/柱狀/散點圖、描述統計與相關分析。',
        tag: 'CHART',
        path: 'data-visualizer/index.html',
        badge: '專業圖表'
      }
    ],

    // 取得指定工具的完整相對 URL
    getToolUrl: function(toolPath) {
      return this.rootPath + 'tools/' + toolPath;
    },

    // 取得首頁相對 URL
    getHomeUrl: function() {
      return this.rootPath + 'index.html';
    }
  };

  window.SiteConfig = SiteConfig;
})(typeof window !== 'undefined' ? window : this);
