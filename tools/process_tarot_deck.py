# -*- coding: utf-8 -*-
"""
process_tarot_deck.py
處理、轉換與生成 78 張高畫質塔羅牌與卡背資產
輸出到:
  - images/tarot/master/ (高品質原圖 PNG, 756x1209)
  - images/tarot/web/ (網站主圖 WebP + PNG, 756x1209)
  - images/tarot/thumb/ (百科縮圖 WebP, 250x400)
  - images/ (相容舊檔名)
"""
import os
import shutil
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

TARGET_WIDTH = 756
TARGET_HEIGHT = 1209
BRAIN_DIR = r"C:\Users\Administrator\.gemini\antigravity\brain\82f9a6dd-3a20-4c50-9ce0-ba5ee8509c0a"

os.makedirs('images/tarot/master', exist_ok=True)
os.makedirs('images/tarot/web', exist_ok=True)
os.makedirs('images/tarot/thumb', exist_ok=True)

# 1. 搬移並處理 AI 生成的 Master 圖片
AI_GENERATED_MAPPING = {
    "tarot_card_back": "card_back",
    "major_00_fool": "major_00",
    "major_01_magician": "major_01",
    "major_02_high_priestess": "major_02",
    "major_03_empress": "major_03",
    "major_04_emperor": "major_04",
    "major_05_hierophant": "major_05",
    "major_06_lovers": "major_06",
    "major_07_chariot": "major_07",
    "major_08_strength": "major_08",
    "major_09_hermit": "major_09",
    "major_10_wheel_of_fortune": "major_10",
    "major_11_justice": "major_11"
}

print("=== 1. 處理已生成之 AI 圖像 ===")
brain_files = os.listdir(BRAIN_DIR) if os.path.exists(BRAIN_DIR) else []
for prefix, target_id in AI_GENERATED_MAPPING.items():
    matched = [f for f in brain_files if f.startswith(prefix) and f.endswith(('.jpg', '.png', '.jpeg'))]
    if matched:
        # 取最新的一張
        latest_file = sorted(matched)[-1]
        src_path = os.path.join(BRAIN_DIR, latest_file)
        dest_master = os.path.join('images/tarot/master', f"{target_id}.png")
        
        with Image.open(src_path) as img:
            img_resized = img.convert('RGBA').resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
            img_resized.save(dest_master, format='PNG', quality=95)
            print(f"  [AI] Processed {target_id} from {latest_file}")

# 2. 映射既有原版大阿爾克那與權杖
EXISTING_MAP = {
    "major_12": "Hanged_Man_XIII.png",
    "major_13": "Death_XIV.png",
    "major_14": "Temperance_XV.png",
    "major_15": "Devil_XVI.png",
    "major_16": "Tower_XVII.png",
    "major_17": "Star_XVIII.png",
    "major_18": "Moon_XIX.png",
    "major_19": "Sun_XX.png",
    "major_20": "Judgement_XXI.png",
    "major_21": "World.png",
    "wands_01": "Wand_1.png",
    "wands_02": "Wand_2.png",
    "wands_03": "Wand_3.png",
    "wands_04": "Wand_4.png",
    "wands_05": "Wand_5.png",
    "wands_06": "Wand_6.png",
    "wands_07": "Wand_7.png",
    "wands_08": "Wand_8.png",
    "wands_09": "Wand_9.png"
}

print("\n=== 2. 處理現有大阿與小阿高畫質素材 ===")
for target_id, legacy_file in EXISTING_MAP.items():
    dest_master = os.path.join('images/tarot/master', f"{target_id}.png")
    # 如果 master 尚未存在，由 legacy 轉換
    if not os.path.exists(dest_master):
        src_path = os.path.join('images', legacy_file)
        if os.path.exists(src_path):
            with Image.open(src_path) as img:
                img_resized = img.convert('RGBA').resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
                img_resized.save(dest_master, format='PNG', quality=95)
                print(f"  [Master] Converted {target_id} from {legacy_file}")

# 3. 為其餘小阿爾克那卡牌建立彩繪玻璃藝術卡面
# 載入 card_frame
frame_img = None
if os.path.exists('images/card_frame.png'):
    frame_img = Image.open('images/card_frame.png').convert('RGBA').resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)

# 嘗試載入微軟正黑體或預設字體
def get_fonts():
    font_paths = ["C:/Windows/Fonts/msjhbd.ttc", "C:/Windows/Fonts/msjh.ttc", "C:/Windows/Fonts/georgiab.ttf", "C:/Windows/Fonts/georgia.ttf"]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                title_font = ImageFont.truetype(fp, 44)
                num_font = ImageFont.truetype(fp, 52)
                sub_font = ImageFont.truetype(fp, 28)
                return title_font, num_font, sub_font
            except Exception:
                pass
    def_font = ImageFont.load_default()
    return def_font, def_font, def_font

title_font, num_font, sub_font = get_fonts()

SUIT_PALETTES = {
    "wands": {
        "nameZh": "權杖", "nameEn": "WANDS", "element": "火",
        "bg_top": (80, 20, 20, 255), "bg_bot": (180, 70, 20, 255),
        "symbol_color": (255, 200, 50, 255), "accent": (255, 100, 30, 255), "symbol": "🔥"
    },
    "cups": {
        "nameZh": "聖杯", "nameEn": "CUPS", "element": "水",
        "bg_top": (15, 30, 80, 255), "bg_bot": (20, 90, 150, 255),
        "symbol_color": (120, 220, 255, 255), "accent": (50, 160, 230, 255), "symbol": "💧"
    },
    "swords": {
        "nameZh": "寶劍", "nameEn": "SWORDS", "element": "風",
        "bg_top": (30, 45, 65, 255), "bg_bot": (80, 110, 140, 255),
        "symbol_color": (230, 240, 255, 255), "accent": (180, 210, 240, 255), "symbol": "⚔️"
    },
    "pentacles": {
        "nameZh": "錢幣", "nameEn": "PENTACLES", "element": "土",
        "bg_top": (20, 60, 35, 255), "bg_bot": (90, 130, 50, 255),
        "symbol_color": (255, 215, 60, 255), "accent": (210, 170, 40, 255), "symbol": "🪙"
    }
}

COURT_NAMES = {
    "page": {"zh": "侍從", "en": "PAGE", "num_rom": "PAGE"},
    "knight": {"zh": "騎士", "en": "KNIGHT", "num_rom": "KNIGHT"},
    "queen": {"zh": "皇后", "en": "QUEEN", "num_rom": "QUEEN"},
    "king": {"zh": "國王", "en": "KING", "num_rom": "KING"}
}

ROMAN_NUMS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

def draw_stained_glass_symbol(draw, center_x, center_y, suit_key, count_or_court, palette):
    """繪製彩繪玻璃風格的幾何與圖騰象徵"""
    # 背景聖光幾何圓盤
    for r in range(260, 40, -40):
        alpha = int(30 + (260 - r) * 0.4)
        col = (palette["symbol_color"][0], palette["symbol_color"][1], palette["symbol_color"][2], alpha)
        draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], outline=col, width=3)
    
    # 放射線
    for angle_deg in range(0, 360, 30):
        rad = math.radians(angle_deg)
        x1 = center_x + int(80 * math.cos(rad))
        y1 = center_y + int(80 * math.sin(rad))
        x2 = center_x + int(240 * math.cos(rad))
        y2 = center_y + int(240 * math.sin(rad))
        draw.line([x1, y1, x2, y2], fill=(255, 230, 140, 70), width=2)

    # 繪製中央核心花色大圖騰
    if suit_key == "wands":
        # 權杖：發芽金色法杖
        staff_w = 28
        staff_h = 360
        draw.rounded_rectangle([center_x - staff_w//2, center_y - staff_h//2, center_x + staff_w//2, center_y + staff_h//2], radius=12, fill=(180, 110, 40, 240), outline=(255, 220, 100, 255), width=4)
        # 頂部發光水晶晶體
        draw.polygon([(center_x, center_y - staff_h//2 - 60), (center_x + 40, center_y - staff_h//2 - 10), (center_x, center_y - staff_h//2 + 40), (center_x - 40, center_y - staff_h//2 - 10)], fill=(255, 230, 80, 250), outline=(255, 255, 200, 255))
        # 葉片
        for off_y in [-80, -20, 40, 100]:
            draw.chord([center_x + 14, center_y + off_y - 20, center_x + 70, center_y + off_y + 20], 0, 180, fill=(100, 200, 60, 230), outline=(220, 255, 160, 255), width=2)
            draw.chord([center_x - 70, center_y + off_y + 10, center_x - 14, center_y + off_y + 50], 180, 360, fill=(100, 200, 60, 230), outline=(220, 255, 160, 255), width=2)

    elif suit_key == "cups":
        # 聖杯：華麗雙層金色高腳杯與溢流甘泉
        cup_w = 200
        # 杯身
        draw.pieslice([center_x - cup_w//2, center_y - 120, center_x + cup_w//2, center_y + 80], 0, 180, fill=(230, 190, 60, 250), outline=(255, 240, 160, 255), width=5)
        # 杯口橢圓
        draw.ellipse([center_x - cup_w//2, center_y - 140, center_x + cup_w//2, center_y - 100], fill=(100, 200, 255, 230), outline=(255, 240, 160, 255), width=4)
        # 杯柱與底座
        draw.rectangle([center_x - 18, center_y + 80, center_x + 18, center_y + 180], fill=(210, 170, 50, 250), outline=(255, 240, 160, 255), width=3)
        draw.ellipse([center_x - 80, center_y + 170, center_x + 80, center_y + 210], fill=(230, 190, 60, 250), outline=(255, 240, 160, 255), width=4)
        # 泉水噴湧
        for i in range(-2, 3):
            arc_x = center_x + i * 32
            draw.arc([arc_x - 20, center_y - 200, arc_x + 20, center_y - 110], 180, 360, fill=(180, 240, 255, 230), width=4)

    elif suit_key == "swords":
        # 寶劍：銀光雙刃劍、金色護手與寶石
        blade_w = 32
        blade_h = 380
        # 劍刃
        draw.polygon([(center_x, center_y - blade_h//2 - 50), (center_x + blade_w//2, center_y - blade_h//2 + 20), (center_x + blade_w//2, center_y + 110), (center_x - blade_w//2, center_y + 110), (center_x - blade_w//2, center_y - blade_h//2 + 20)], fill=(220, 235, 255, 245), outline=(255, 255, 255, 255), width=3)
        # 劍脊中線
        draw.line([center_x, center_y - blade_h//2 - 40, center_x, center_y + 105], fill=(160, 190, 220, 255), width=3)
        # 護手十字
        draw.rounded_rectangle([center_x - 110, center_y + 110, center_x + 110, center_y + 138], radius=8, fill=(230, 180, 50, 255), outline=(255, 230, 130, 255), width=3)
        # 劍柄與劍首
        draw.rounded_rectangle([center_x - 14, center_y + 138, center_x + 14, center_y + 210], radius=4, fill=(80, 60, 40, 255), outline=(200, 160, 60, 255), width=2)
        draw.ellipse([center_x - 28, center_y + 205, center_x + 28, center_y + 250], fill=(230, 180, 50, 255), outline=(255, 230, 130, 255), width=3)

    elif suit_key == "pentacles":
        # 錢幣：金色神聖五角星圓盤
        coin_r = 160
        draw.ellipse([center_x - coin_r, center_y - coin_r, center_x + coin_r, center_y + coin_r], fill=(230, 185, 40, 250), outline=(255, 240, 140, 255), width=8)
        draw.ellipse([center_x - coin_r + 20, center_y - coin_r + 20, center_x + coin_r - 20, center_y + coin_r - 20], fill=(190, 145, 30, 250), outline=(255, 220, 100, 255), width=3)
        # 五角星
        star_points = []
        for k in range(5):
            # 外頂點
            a_out = math.radians(-90 + k * 72)
            star_points.append((center_x + int(115 * math.cos(a_out)), center_y + int(115 * math.sin(a_out))))
            # 內頂點
            a_in = math.radians(-90 + k * 72 + 36)
            star_points.append((center_x + int(48 * math.cos(a_in)), center_y + int(48 * math.sin(a_in))))
        draw.polygon(star_points, fill=(255, 225, 80, 255), outline=(255, 255, 200, 255), width=3)

print("\n=== 3. 渲染並補齊其餘小阿爾克那卡牌 ===")
for suit_key, palette in SUIT_PALETTES.items():
    # 1-10 號牌 + 4 宮廷牌
    all_ranks = [(f"{i:02d}", ROMAN_NUMS[i], str(i)) for i in range(1, 11)] + [
        ("page", "PAGE", "侍從"),
        ("knight", "KNIGHT", "騎士"),
        ("queen", "QUEEN", "皇后"),
        ("king", "KING", "國王")
    ]

    for sfx, num_str, name_sub in all_ranks:
        cid = f"{suit_key}_{sfx}"
        dest_master = os.path.join('images/tarot/master', f"{cid}.png")

        # 若已存在高畫質 master 則跳過
        if os.path.exists(dest_master):
            continue

        card_img = Image.new('RGBA', (TARGET_WIDTH, TARGET_HEIGHT), (0, 0, 0, 255))
        draw = ImageDraw.Draw(card_img)

        # 漸變底色
        for y in range(TARGET_HEIGHT):
            ratio = y / TARGET_HEIGHT
            r = int(palette["bg_top"][0] * (1 - ratio) + palette["bg_bot"][0] * ratio)
            g = int(palette["bg_top"][1] * (1 - ratio) + palette["bg_bot"][1] * ratio)
            b = int(palette["bg_top"][2] * (1 - ratio) + palette["bg_bot"][2] * ratio)
            draw.line([(0, y), (TARGET_WIDTH, y)], fill=(r, g, b, 255))

        # 繪製象徵幾何圖騰
        center_x = TARGET_WIDTH // 2
        center_y = TARGET_HEIGHT // 2 - 10
        draw_stained_glass_symbol(draw, center_x, center_y, suit_key, sfx, palette)

        # 套疊哥德式金色外框 (若有)
        if frame_img:
            card_img.paste(frame_img, (0, 0), frame_img)

        # 繪製頂部標題與羅馬數字標籤
        header_banner_y = 120
        # 頂部半透明銘牌
        draw.rounded_rectangle([center_x - 180, header_banner_y - 25, center_x + 180, header_banner_y + 40], radius=16, fill=(15, 15, 25, 210), outline=(230, 190, 70, 255), width=3)
        draw.text((center_x, header_banner_y + 8), num_str, fill=(255, 235, 140, 255), font=num_font, anchor="mm")

        # 底部雙語銘牌
        zh_title = f"{palette['nameZh']}{name_sub}" if sfx.isdigit() else f"{palette['nameZh']}{COURT_NAMES[sfx]['zh']}"
        en_title = f"{num_str} OF {palette['nameEn']}" if sfx.isdigit() else f"{COURT_NAMES[sfx]['en']} OF {palette['nameEn']}"

        footer_y = TARGET_HEIGHT - 130
        draw.rounded_rectangle([center_x - 240, footer_y - 40, center_x + 240, footer_y + 45], radius=18, fill=(10, 10, 20, 225), outline=(235, 195, 75, 255), width=3)
        draw.text((center_x, footer_y - 12), zh_title, fill=(255, 240, 160, 255), font=title_font, anchor="mm")
        draw.text((center_x, footer_y + 22), en_title, fill=(210, 220, 235, 230), font=sub_font, anchor="mm")

        card_img.save(dest_master, format='PNG', quality=95)
        print(f"  [Rendered] {cid} -> {dest_master}")

# 4. 生成 WebP, Web PNG, Thumbnails 與 Legacy 檔案
print("\n=== 4. 批次生成 WebP 最佳化、縮圖與相容檔案 ===")
all_master_files = [f for f in os.listdir('images/tarot/master') if f.endswith('.png')]
print(f"Total Master files: {len(all_master_files)}")

# 建立 Legacy 檔名對照字典
LEGACY_CONVERSION = {
    "card_back": ["card_back.png"],
    "major_00": ["Fool_I.png"],
    "major_01": ["Magician_II.png"],
    "major_02": ["High_Priestess_III.png"],
    "major_03": ["Empress_IV.png"],
    "major_04": ["Emperor_V.png"],
    "major_05": ["Hierophant_VI.png"],
    "major_06": ["Lovers_VII.png"],
    "major_07": ["Chariot_VIII.png"],
    "major_08": ["Strength_IX.png"],
    "major_09": ["Hermit_X.png"],
    "major_10": ["Wheel_of_Fortune_XI.png"],
    "major_11": ["Justice_XII.png"],
    "major_12": ["Hanged_Man_XIII.png"],
    "major_13": ["Death_XIV.png"],
    "major_14": ["Temperance_XV.png"],
    "major_15": ["Devil_XVI.png"],
    "major_16": ["Tower_XVII.png"],
    "major_17": ["Star_XVIII.png"],
    "major_18": ["Moon_XIX.png"],
    "major_19": ["Sun_XX.png"],
    "major_20": ["Judgement_XXI.png"],
    "major_21": ["World.png"]
}

# 小阿爾克那 Legacy 對應 (Wand_1..10, Page, Knight, Queen, King; Cup_1..; Sword_1..; Pentacle_1..)
suit_prefix_map = {
    "wands": "Wand",
    "cups": "Cup",
    "swords": "Sword",
    "pentacles": "Pentacle"
}
for skey, sprefix in suit_prefix_map.items():
    for i in range(1, 11):
        LEGACY_CONVERSION[f"{skey}_{i:02d}"] = [f"{sprefix}_{i}.png"]
    LEGACY_CONVERSION[f"{skey}_page"] = [f"{sprefix}_Page.png", f"{sprefix}_page.png"]
    LEGACY_CONVERSION[f"{skey}_knight"] = [f"{sprefix}_Knight.png", f"{sprefix}_knight.png"]
    LEGACY_CONVERSION[f"{skey}_queen"] = [f"{sprefix}_Queen.png", f"{sprefix}_queen.png"]
    LEGACY_CONVERSION[f"{skey}_king"] = [f"{sprefix}_King.png", f"{sprefix}_king.png"]

for fname in all_master_files:
    cid = os.path.splitext(fname)[0]
    master_path = os.path.join('images/tarot/master', fname)
    web_webp_path = os.path.join('images/tarot/web', f"{cid}.webp")
    web_png_path = os.path.join('images/tarot/web', f"{cid}.png")
    thumb_webp_path = os.path.join('images/tarot/thumb', f"{cid}.webp")

    with Image.open(master_path) as img:
        img_rgba = img.convert('RGBA').resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
        
        # 1. 輸出 Web PNG
        img_rgba.save(web_png_path, format='PNG', optimize=True)
        # 2. 輸出 Web WebP
        img_rgba.save(web_webp_path, format='WEBP', quality=90)
        # 3. 輸出 Thumb WebP (250x400)
        thumb_img = img_rgba.resize((250, 400), Image.Resampling.LANCZOS)
        thumb_img.save(thumb_webp_path, format='WEBP', quality=85)

        # 4. 同步寫入 images/ 下的 legacy 相容檔案
        legacy_names = LEGACY_CONVERSION.get(cid, [])
        for leg_name in legacy_names:
            leg_path = os.path.join('images', leg_name)
            img_rgba.save(leg_path, format='PNG', optimize=True)

print("\n Deck processing completed successfully!")
