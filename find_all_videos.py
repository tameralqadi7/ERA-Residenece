import re

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

videos = re.findall(r'<video[^>]*>([\s\S]*?)</video>', html)
print(f"Total videos: {len(videos)}")
for i, v in enumerate(videos):
    sources = re.findall(r'src=["\']([^"\']+)["\']', v)
    print(f"Video #{i+1}: {sources}")
