// navigation.js
(function() {
  // 獲取當前頁面路徑
  const currentPath = window.location.pathname;
  const isToolsPage = currentPath.includes('/tools/');
  
  // 根據當前頁面決定基礎路徑
  const basePath = isToolsPage ? '../../tools/' : 'tools/';
  
  var nav = document.createElement('nav');
  nav.className = 'main-navigation';
  nav.innerHTML = `
    <button class="menu-toggle" aria-label="選單">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="menu">
      <li><a href="${isToolsPage ? 'index.html' : 'index.html'}">首頁</a></li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle">工具 <span class="arrow">▼</span></a>
        <ul class="dropdown-menu">
          <li><a href="${basePath}universal-timer/index.html">計時器</a></li>
          <li><a href="${basePath}online-alarm-clock/index.html">線上鬧鐘</a></li>
          <li><a href="${basePath}drink-selector/index.html">飲料選擇器</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle">塔羅 <span class="arrow">▼</span></a>
        <ul class="dropdown-menu">
          <li><a href="${basePath}3-card-tarot-spread-generator/index.html">三張塔羅牌</a></li>
          <li><a href="${basePath}the-tarot/index.html">完整塔羅牌</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle">其他 <span class="arrow">▼</span></a>
        <ul class="dropdown-menu">
          <li><a href="${basePath}drink-selector/index.html">飲料選擇器</a></li>
          <li><a href="${basePath}prize-wheel/index.html">獎品轉盤</a></li>
          <li><a href="${basePath}password-generator/index.html">密碼產生器</a></li>
        </ul>
      </li>
      <li><a href="${isToolsPage ? '../../index.html' : 'index.html'}">回主站</a></li>
    </ul>
  `;
  
  // 插入到<body>最前面
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertBefore(nav, document.body.firstChild);
    
    // 手機選單切換
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // 點擊選單連結後自動收合選單
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  });
})();
