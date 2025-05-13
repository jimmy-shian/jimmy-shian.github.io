new Vue({
    el: '#app',
    data: {
        toolCategories: [
            {
                name: '計時與倒數計時器',
                tools: [
                    { name: 'Online Timer', description: '提供簡單的倒數計時器，適用於各種需求。', link: 'tools/online-timer/index.html' },
                    { name: 'Online Stopwatch', description: '提供多種計時功能，包括倒數計時、計時器和秒表。', link: 'tools/online-stopwatch/index.html' },
                    { name: 'Online Alarm Clock', description: '模擬鬧鐘功能，適合用於提醒和計時。', link: 'tools/online-alarm-clock/index.html' },
                    { name: 'Online Countdown Timer', description: '專注於倒數計時，適用於活動倒計時等場合。', link: 'tools/online-countdown-timer/index.html' },
                    { name: 'Online Timer & Stopwatch', description: '結合計時器和秒表功能，提供多用途計時工具。', link: 'tools/online-timer-stopwatch/index.html' }
                ]
            },
            {
                name: '占卜工具',
                tools: [
                    { name: 'AI Tarot Card Generator', description: '使用 AI 技術生成個性化的塔羅牌，適合用於占卜和靈性探索。', link: 'tools/ai-tarot-card-generator/index.html' },
                    { name: 'The Tarot', description: '提供隨機抽取一張或三張塔羅牌的功能，適合快速占卜。', link: 'tools/the-tarot/index.html' },
                    { name: 'Tarot Card Generator by CalculatorMix', description: '隨機生成塔羅牌，並提供保存功能。', link: 'tools/tarot-card-generator-calculatormix/index.html' },
                    { name: 'Tarot Card Generator by EpicTools', description: '提供正位與逆位的塔羅牌解讀，並支持自定義生成。', link: 'tools/tarot-card-generator-epictools/index.html' },
                    { name: 'TaRoT cARd CreAToR', description: 'AI 驅動的塔羅牌生成器，支持多語言界面。', link: 'tools/tarot-card-creator/index.html' },
                    { name: '3-Card Tarot Spread Generator', description: '生成三張塔羅牌，適用於過去、現在、未來的占卜。', link: 'tools/3-card-tarot-spread-generator/index.html' },
                    { name: 'Tarot Card Generator by AiBro', description: 'AI 支持的塔羅牌生成器，提供詳細描述。', link: 'tools/tarot-card-generator-aibro/index.html' },
                    { name: 'Tarot Card Generator by 23lotus', description: '簡潔的塔羅牌生成器，適合快速占卜。', link: 'tools/tarot-card-generator-23lotus/index.html' },
                    { name: 'Tarot Card Generator by randomoutputs', description: '提供隨機塔羅牌生成，並支持多種用途。', link: 'tools/tarot-card-generator-randomoutputs/index.html' }
                ]
            }
        ]
    },
    methods: {
        // 未來可能需要的方法，例如導航到工具頁面等
    }
});