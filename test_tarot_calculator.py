# -*- coding: utf-8 -*-
import os
import sys

# Force stdout to UTF-8
if sys.stdout.encoding != 'utf-8':
    try:
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    except Exception:
        pass

def calculate_birth_cards(year, month, day):
    """Python implementation of our JS birth card calculation logic"""
    total_sum = year + month + day
    
    # Sum digits of total_sum
    digits_sum = sum(int(d) for d in str(total_sum))
    
    # Keep summing digits if > 22
    while digits_sum > 22:
        digits_sum = sum(int(d) for d in str(digits_sum))
        
    personality_num = digits_sum
    soul_num = digits_sum
    
    if digits_sum == 19:
        personality_num = 19
        soul_num = 10
    elif digits_sum == 22:
        personality_num = 0
        soul_num = 4
    elif 10 <= digits_sum <= 21:
        personality_num = digits_sum
        soul_num = sum(int(d) for d in str(digits_sum))
        
    return personality_num, soul_num

def run_tests():
    print("=== 開始執行塔羅牌單一測試檔案 ===")
    
    tests_passed = 0
    tests_failed = 0
    
    # Test cases mapping: (date tuple) -> (expected personality, expected soul)
    test_cases = {
        (1992, 11, 2): (7, 7),       # Sum = 2005 -> 7
        (1989, 10, 25): (8, 8),     # Sum = 2024 -> 8
        (1998, 9, 29): (11, 2),     # Sum = 2036 -> 11 -> 1+1=2
        (1970, 1, 1): (19, 10),     # Sum = 1972 -> 19 (Special)
        (1979, 5, 9): (0, 4),       # Sum = 1993 -> 22 (Special)
    }
    
    for birth, expected in test_cases.items():
        y, m, d = birth
        p, s = calculate_birth_cards(y, m, d)
        if (p, s) == expected:
            print(f"  [PASS] 生日 {y:04d}-{m:02d}-{d:02d} -> 個性牌: {p}, 靈魂牌: {s}")
            tests_passed += 1
        else:
            print(f"  [FAIL] 生日 {y:04d}-{m:02d}-{d:02d} -> 預期 ({expected[0]}, {expected[1]}), 得到 ({p}, {s})")
            tests_failed += 1
            
    print("\n--- 檢查檔案圖片與載入路徑 ---")
    
    # Check if images directory exists
    images_dir = "images"
    if not os.path.exists(images_dir):
        print("  [FAIL] images 目錄不存在！")
        tests_failed += 1
    else:
        # Check specific webp files
        required_webp = ["card_back.webp", "card_frame.webp", "Fool_I.webp", "Magician_II.webp", "World.webp"]
        for f in required_webp:
            path = os.path.join(images_dir, f)
            if os.path.exists(path):
                print(f"  [PASS] 關鍵優化圖片存在: {f} ({os.path.getsize(path)/1024:.1f} KB)")
                tests_passed += 1
            else:
                print(f"  [FAIL] 找不到關鍵優化圖片: {f}")
                tests_failed += 1

    print("\n--- 掃描專案程式碼是否有殘留 PNG 圖片路徑 ---")
    active_pages = [
        "components/navigation.js",
        "tools/the-tarot/index.html",
        "tools/the-tarot/script.js",
        "tools/the-tarot/style.css"
    ]
    
    for page in active_pages:
        if not os.path.exists(page):
            print(f"  [WARNING] 找不到檔案: {page}")
            continue
        try:
            with open(page, "r", encoding="utf-8") as f:
                content = f.read()
                if ".png" in content and "convert_images.py" not in page:
                    print(f"  [FAIL] 檔案 {page} 含有舊的 .png 圖片引用")
                    tests_failed += 1
                else:
                    print(f"  [PASS] 檔案 {page} 沒有殘留的 .png 引用")
                    tests_passed += 1
        except Exception as e:
            print(f"  [FAIL] 讀取檔案 {page} 失敗: {e}")
            tests_failed += 1

    print("\n=== 測試結果總結 ===")
    print(f"通過項目: {tests_passed}")
    print(f"失敗項目: {tests_failed}")
    
    if tests_failed > 0:
        print("❌ 測試未完全通過！請檢查上述錯誤。")
        sys.exit(1)
    else:
        print("✅ 所有測試項目均順利通過！")
        sys.exit(0)

if __name__ == "__main__":
    run_tests()
