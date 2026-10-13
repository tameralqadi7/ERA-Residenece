import re

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

for m in re.finditer(r'<div[^>]*data-modal-menu-btn="mob"[^>]*>', html):
    pos = m.start()
    print("MATCH at", pos)
    print(html[pos-100:pos+300].replace('\n', ' '))
