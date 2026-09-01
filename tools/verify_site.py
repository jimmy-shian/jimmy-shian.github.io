# -*- coding: utf-8 -*-
"""
verify_site.py
全站重構完整性與品質驗證腳本
"""
import os
import sys
import json

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

def verify():
    print("========================================")
    print("   全站重構驗證報告 (System Verification)")
    print("========================================")
    
    passed = True

    # 1. 核心組件與共用庫
    required_components = [
        "components/site-config.js",
        "components/global.css",
        "components/navigation.js",
        "components/navigation.css",
        "components/footer.js",
        "components/footer.css",
        "lib/storage.js",
        "lib/audio.js",
        "lib/toast.js",
        "lib/modal.js",
        "lib/utils.js",
        "lib/validation.js",
        "tarot/tarot-core.js",
        "tarot/tarot-data.json",
        "tarot/tarot-meanings.json",
        "tarot/tarot-assets.json",
        "index.html",
        "styles.css"
    ]
    
    print("\n[1] 檢查共用庫與全域組件:")
    for path in required_components:
        exists = os.path.exists(path)
        size = os.path.getsize(path) if exists else 0
        if exists and size > 0:
            print(f"  [OK] {path} ({size} bytes)")
        else:
            print(f"  [FAIL] {path} [MISSING OR EMPTY]")
            passed = False

    # 2. 9 個重構工具完整性
    tools = [
        "random-tarot-randomoutputs",
        "3-card-tarot-spread-generator",
        "the-tarot",
        "universal-timer",
        "online-alarm-clock",
        "drink-selector",
        "prize-wheel",
        "password-generator",
        "data-visualizer"
    ]
    
    print("\n[2] 檢查 9 大工具目錄與前端資源:")
    for t in tools:
        t_dir = os.path.join("tools", t)
        html_ok = os.path.exists(os.path.join(t_dir, "index.html"))
        css_ok = os.path.exists(os.path.join(t_dir, "style.css"))
        js_ok = os.path.exists(os.path.join(t_dir, "script.js"))
        if html_ok and css_ok and js_ok:
            print(f"  [OK] tools/{t} (HTML, CSS, JS 全部就緒)")
        else:
            print(f"  [FAIL] tools/{t} [Missing files: HTML:{html_ok}, CSS:{css_ok}, JS:{js_ok}]")
            passed = False

    # 3. 塔羅牌 78 張卡牌資產完整性
    print("\n[3] 檢查 78 張塔羅牌與卡背圖片資源:")
    with open("tarot/tarot-data.json", encoding="utf-8") as f:
        data = json.load(f)
    cards = data["cards"]
    
    missing_web = []
    missing_thumb = []
    missing_master = []
    
    for c in cards:
        cid = c["id"]
        if not os.path.exists(f"images/tarot/web/{cid}.webp"):
            missing_web.append(cid)
        if not os.path.exists(f"images/tarot/thumb/{cid}.webp"):
            missing_thumb.append(cid)
        if not os.path.exists(f"images/tarot/master/{cid}.png"):
            missing_master.append(cid)

    card_back_ok = os.path.exists("images/tarot/web/card_back.webp") and os.path.exists("images/tarot/thumb/card_back.webp")
    
    print(f"  • 牌卡總數: {len(cards)} 張")
    print(f"  • Master 原圖遺漏: {len(missing_master)}")
    print(f"  • Web WebP 遺漏: {len(missing_web)}")
    print(f"  • Thumb WebP 遺漏: {len(missing_thumb)}")
    print(f"  • 牌背圖片 (Card Back): {'[OK] 正常' if card_back_ok else '[FAIL] 遺漏'}")

    if missing_web or missing_thumb or missing_master or not card_back_ok:
        passed = False

    print("\n========================================")
    if passed:
        print("  🎉 全部檢查通過！所有工具與塔羅資源 100% 完整無缺！")
    else:
        print("  ⚠️ 部份檢查未通過，請參閱上方錯誤訊息。")
    print("========================================")

if __name__ == "__main__":
    verify()
