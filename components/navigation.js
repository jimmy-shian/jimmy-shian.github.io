// navigation.js
(function() {
  // 獲取當前頁面路徑
  const currentPath = window.location.pathname;
  const isToolsPage = currentPath.includes('/tools/');
  
  // 根據當前頁面決定基礎路徑
  const basePath = isToolsPage ? '../../tools/' : 'tools/';
  const rootPath = isToolsPage ? '../../' : '';
  
  var nav = document.createElement('nav');
  nav.className = 'main-navigation';
  nav.innerHTML = `
    <button class="menu-toggle" aria-label="選單" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="menu">
      <li><a href="${rootPath}index.html">首頁</a></li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">工具 <span class="arrow">▼</span></a>
        <ul class="dropdown-menu">
          <li><a href="${basePath}universal-timer/index.html">計時器</a></li>
          <li><a href="${basePath}online-alarm-clock/index.html">線上鬧鐘</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">塔羅牌 <span class="arrow">▼</span></a>
        <ul class="dropdown-menu">
          <li><a href="${basePath}random-tarot-randomoutputs/index.html">完整塔羅占卜</a></li>
          <li><a href="${basePath}3-card-tarot-spread-generator/index.html">三張牌陣占卜</a></li>
          <li><a href="${basePath}the-tarot/index.html">塔羅百科展示</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">其他 <span class="arrow">▼</span></a>
        <ul class="dropdown-menu">
          <li><a href="${basePath}drink-selector/index.html">飲料選擇器</a></li>
          <li><a href="${basePath}prize-wheel/index.html">獎品轉盤</a></li>
          <li><a href="${basePath}password-generator/index.html">密碼產生器</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">圖表 <span class="arrow">▼</span></a>
        <ul class="dropdown-menu">
          <li><a href="${basePath}data-visualizer/index.html">圖表繪製器</a></li>
        </ul>
      </li>
      <li><a href="${rootPath}index.html">回主站</a></li>
    </ul>
  `;
  
  // 插入到<body>最前面
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertBefore(nav, document.body.firstChild);

    // Insert container for second AdSense slot (auto responsive)
    const ad2 = document.createElement('div');
    ad2.id = 'ad-container-2';
    ad2.className = 'ad-wrapper';
    document.body.insertBefore(ad2, nav.nextSibling);
    
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const dropdowns = document.querySelectorAll('.main-navigation .dropdown');
    
    // 手機漢堡選單切換
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isActive = menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
    
    // 處理下拉選單點擊事件（特別是行動裝置）
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      toggle.addEventListener('click', function(e) {
        // 在行動裝置寬度時 (<= 768px)，阻止預設導向並切換展開狀態
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          const isOpen = dropdown.classList.contains('open');
          
          // 收合其他下拉選單
          dropdowns.forEach(d => {
            if (d !== dropdown) {
              d.classList.remove('open');
              d.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
          });
          
          if (isOpen) {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          } else {
            dropdown.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });
    
    // 點擊選單以外的任何地方時，收合所有選單
    document.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        dropdowns.forEach(d => {
          d.classList.remove('open');
          d.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
      }
    });
    
    // 點擊選單內部避免冒泡導致選單關閉
    menu.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // 動態載入 AI 客服懸浮泡泡 (只在塔羅相關頁面載入)
    const isTarotPage = currentPath.includes('tarot') || currentPath.includes('3-card') || currentPath.includes('random');
    if (isTarotPage) {
      const chatLink = document.createElement('link');
      chatLink.rel = 'stylesheet';
      chatLink.href = isToolsPage ? '../../components/tarot-ai-chat.css' : 'components/tarot-ai-chat.css';
      document.head.appendChild(chatLink);

      const chatScript = document.createElement('script');
      chatScript.src = isToolsPage ? '../../components/tarot-ai-chat.js' : 'components/tarot-ai-chat.js';
      document.body.appendChild(chatScript);
    }
  });
})();
