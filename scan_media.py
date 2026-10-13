import re
from urllib.parse import urlparse

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

urls = set()

# Find all src, href, poster
for attr in ['src', 'srcset', 'poster', 'href']:
    matches = re.findall(rf'{attr}=["\']([^"\']+)["\']', html)
    for m in matches:
        # Handle srcset which has "url 500w, url 800w"
        if ',' in m and ('w' in m or 'x' in m):
            parts = m.split(',')
            for p in parts:
                url_part = p.strip().split(' ')[0]
                if url_part.startswith('http'):
                    urls.add(url_part)
        elif m.startswith('http'):
            urls.add(m)

# Filter to image / video / svg / webp / jpg / png
media_urls = [u for u in urls if any(ext in u.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp4', '.webm', '.gif'])]

print(f"Total media URLs found: {len(media_urls)}")
for u in sorted(media_urls):
    print(" -", u)
