import os
from PIL import Image

def generate_icons():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(base_dir, "public")
    app_dir = os.path.join(base_dir, "src", "app")
    
    mark_path = os.path.join(public_dir, "the-intelliverse-mark.png")
    if not os.path.exists(mark_path):
        print(f"Error: {mark_path} not found")
        return
        
    src_img = Image.open(mark_path).convert("RGBA")
    w, h = src_img.size
    print(f"Loaded source mark: {w}x{h}")
    
    def make_square_icon(target_size, padding_ratio=0.06, bg_color=(0, 0, 0, 0)):
        canvas = Image.new("RGBA", (target_size, target_size), bg_color)
        avail = int(target_size * (1.0 - 2 * padding_ratio))
        scale = min(avail / w, avail / h)
        new_w = max(1, int(w * scale))
        new_h = max(1, int(h * scale))
        resized = src_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        offset_x = (target_size - new_w) // 2
        offset_y = (target_size - new_h) // 2
        canvas.paste(resized, (offset_x, offset_y), resized)
        return canvas

    # Standard browser favicons
    icon_16 = make_square_icon(16, padding_ratio=0.02)
    icon_16.save(os.path.join(public_dir, "favicon-16x16.png"), "PNG", optimize=True)

    icon_32 = make_square_icon(32, padding_ratio=0.03)
    icon_32.save(os.path.join(public_dir, "favicon-32x32.png"), "PNG", optimize=True)

    # Google Search favicon (48x48)
    icon_48 = make_square_icon(48, padding_ratio=0.04)
    icon_48.save(os.path.join(public_dir, "favicon-48x48.png"), "PNG", optimize=True)
    icon_48.save(os.path.join(public_dir, "icon.png"), "PNG", optimize=True)
    icon_48.save(os.path.join(app_dir, "icon.png"), "PNG", optimize=True)

    # 96x96, 192x192, 512x512
    icon_96 = make_square_icon(96, padding_ratio=0.05)
    icon_96.save(os.path.join(public_dir, "logo-96.png"), "PNG", optimize=True)

    icon_192 = make_square_icon(192, padding_ratio=0.05)
    icon_192.save(os.path.join(public_dir, "logo-192.png"), "PNG", optimize=True)
    icon_192.save(os.path.join(public_dir, "icon-192.png"), "PNG", optimize=True)

    icon_512 = make_square_icon(512, padding_ratio=0.05)
    icon_512.save(os.path.join(public_dir, "logo-512.png"), "PNG", optimize=True)
    icon_512.save(os.path.join(public_dir, "icon-512.png"), "PNG", optimize=True)

    # Apple Touch Icon: 180x180
    apple_canvas = Image.new("RGBA", (180, 180), (11, 21, 48, 255))
    avail_apple = int(180 * 0.78)
    scale_a = min(avail_apple / w, avail_apple / h)
    aw = int(w * scale_a)
    ah = int(h * scale_a)
    resized_a = src_img.resize((aw, ah), Image.Resampling.LANCZOS)
    apple_canvas.paste(resized_a, ((180 - aw) // 2, (180 - ah) // 2), resized_a)
    
    apple_canvas.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG", optimize=True)
    apple_canvas.save(os.path.join(public_dir, "apple-touch-icon-precomposed.png"), "PNG", optimize=True)
    apple_canvas.save(os.path.join(public_dir, "apple-icon.png"), "PNG", optimize=True)
    apple_canvas.save(os.path.join(app_dir, "apple-icon.png"), "PNG", optimize=True)

    # Standard Windows/GitHub root favicon.ico containing 16, 32, 48
    ico_path_public = os.path.join(public_dir, "favicon.ico")
    ico_path_app = os.path.join(app_dir, "favicon.ico")
    icon_48.save(ico_path_public, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    icon_48.save(ico_path_app, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("✓ All standard icons generated successfully!")

if __name__ == "__main__":
    generate_icons()
