// 動態插入 footer 組件
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.createElement('div');
    footer.innerHTML = `
    <div id="ad-container-1" class="ad-wrapper"></div>
        <footer class="site-footer">
            <div class="footer-content">
                <p>&copy; 2025 Jimmy Shian. All rights reserved.</p>
                <p>Powered by AI and Love</p>
            </div>
            <!-- Google AdSense Slots -->
        </footer>
    `;
    
    // 確保 footer 在 body 的最後
    document.body.appendChild(footer);

    /*
     * Inject Google AdSense ads defined in ad.txt
     * There are two ad slots: in-article responsive and auto responsive.
     */
    function injectGoogleAds() {
        const adSettings = [
            {
                containerId: 'ad-container-1',
                attrs: {
                    style: 'display:block; text-align:center;',
                    'data-ad-layout': 'in-article',
                    'data-ad-format': 'fluid',
                    'data-ad-client': 'ca-pub-2415998114933157',
                    'data-ad-slot': '7830577841'
                }
            },
            {
                containerId: 'ad-container-2',
                attrs: {
                    style: 'display:block',
                    'data-ad-client': 'ca-pub-2415998114933157',
                    'data-ad-slot': '3809557888',
                    'data-ad-format': 'auto',
                    'data-full-width-responsive': 'true'
                }
            }
        ];

        // Ensure the Google AdSense script is loaded only once
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const adsScript = document.createElement('script');
            adsScript.async = true;
            adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2415998114933157';
            adsScript.crossOrigin = 'anonymous';
            document.head.appendChild(adsScript);
        }

        adSettings.forEach(({ containerId, attrs }) => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const ins = document.createElement('ins');
            ins.className = 'adsbygoogle';

            Object.entries(attrs).forEach(([key, value]) => {
                if (key === 'style') {
                    ins.style.cssText = value;
                } else {
                    ins.setAttribute(key, value);
                }
            });
            container.appendChild(ins);

            const pushScript = document.createElement('script');
            pushScript.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
            container.appendChild(pushScript);
        });
    }

    injectGoogleAds();
    
    // 確保 footer 不會遮擋內容
    const main = document.querySelector('main');
    if (main) {
        main.style.minHeight = 'calc(100vh - 200px)'; // 設置最小高度，確保內容不會被 footer 遮擋
    }
});
