import os
import sys
import subprocess

# Ensure stdout and stderr use utf-8 to avoid encoding issues in Windows
if sys.stdout.encoding != 'utf-8':
    try:
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    except Exception:
        pass

def install_pillow():
    print("正在檢查並安裝 Pillow 庫...")
    pip_path = os.path.join(os.path.dirname(sys.executable), "pip.exe")
    if not os.path.exists(pip_path):
        pip_path = "pip"
    try:
        subprocess.check_call([pip_path, "install", "pillow"])
        print("Pillow 安裝成功！")
    except Exception as e:
        print(f"安裝 Pillow 失敗: {e}")
        sys.exit(1)

try:
    from PIL import Image
except ImportError:
    install_pillow()
    from PIL import Image

def convert_png_to_webp(directory, quality=80, delete_original=False):
    print(f"開始掃描目錄: {directory}")
    if not os.path.exists(directory):
        print(f"目錄不存在: {directory}")
        return

    converted_count = 0
    total_saved = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                input_path = os.path.join(root, file)
                # Skip files that are already webp or the card_back/card_frame if we want, but let's convert all
                base_name = os.path.splitext(file)[0]
                output_path = os.path.join(root, f"{base_name}.webp")
                
                try:
                    # Get original size
                    orig_size = os.path.getsize(input_path)
                    
                    # Open and convert
                    with Image.open(input_path) as img:
                        # WebP supports RGBA
                        img.save(output_path, "WEBP", quality=quality)
                    
                    new_size = os.path.getsize(output_path)
                    saved = orig_size - new_size
                    total_saved += saved
                    converted_count += 1
                    
                    print(f"轉換成功: {file} -> {base_name}.webp (大小: {orig_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB, 節省 {saved/1024/1024:.2f}MB)")
                    
                    if delete_original:
                        os.remove(input_path)
                        print(f"已刪除原檔: {file}")
                        
                except Exception as e:
                    print(f"轉換失敗 {file}: {e}")

    print("\n--- 轉換完成 ---")
    print(f"共轉換了 {converted_count} 張圖片")
    print(f"總共節省了 {total_saved/1024/1024:.2f} MB 的空間")

if __name__ == "__main__":
    # Get current script directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(current_dir, "images")
    img_dir = os.path.join(current_dir, "img")
    
    # Run conversion
    print("開始轉換 images 目錄下的圖片...")
    convert_png_to_webp(images_dir, quality=80, delete_original=True)
    
    print("\n開始轉換 img 目錄下的圖片...")
    convert_png_to_webp(img_dir, quality=80, delete_original=True)
