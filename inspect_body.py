import re

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

body_match = re.search(r'<body[^>]*>([\s\S]*)</body>', html, re.I)
if not body_match:
    print("No body found")
    exit()

body_content = body_match.group(1)

# Find top level elements under body (or immediate major containers)
# Let's find tags directly inside body or major sections
classes = re.findall(r'<div\s+class="([^"]+)"', body_content[:10000])
print("First 20 div classes:")
for c in classes[:20]:
    print(" -", c)

# Let's search for data attributes that identify major sections
data_attrs = re.findall(r'data-[a-z0-9\-]+', body_content)
print("\nUnique data attributes:")
for a in sorted(set(data_attrs))[:30]:
    print(" -", a)
