// 動態插入 footer 組件
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.createElement('div');
    footer.innerHTML = `
        <footer class="site-footer">
            <div class="footer-content">
                <p>&copy; 2025 Jimmy Shian. All rights reserved.</p>
                <p>Powered by AI and Love</p>
            </div>
        </footer>
    `;
    
    // 確保 footer 在 body 的最後
    document.body.appendChild(footer);
    
    // 確保 footer 不會遮擋內容
    const main = document.querySelector('main');
    if (main) {
        main.style.minHeight = 'calc(100vh - 200px)'; // 設置最小高度，確保內容不會被 footer 遮擋
    }
});
