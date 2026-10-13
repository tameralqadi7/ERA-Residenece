import re

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("HTML length:", len(html))

# Check Swiper
print("Swiper matches in HTML:", re.findall(r'[^"\'>\s]*swiper[^"\'>\s]*', html, re.I))

# Check external scripts
scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
print("\nExternal scripts:")
for s in scripts:
    print(" -", s)

# Check all images / assets
imgs = re.findall(r'src=["\']([^"\']+\.(?:png|jpg|jpeg|webp|svg|mp4|webm))["\']', html)
print(f"\nUnique media sources ({len(set(imgs))}):")
for img in sorted(set(imgs))[:15]:
    print(" -", img)

# Check Lottie
lotties = re.findall(r'data-json=["\']([^"\']+)["\']', html)
print("\nLottie files:", set(lotties))

# Check videos
videos = re.findall(r'<video[^>]*>[\s\S]*?</video>', html)
print(f"\nVideos ({len(videos)}):")
for v in videos:
    print(" -", v[:150].replace('\n', ' '))
