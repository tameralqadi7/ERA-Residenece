import re

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

targets = [
    ('Tabs Hero', r'<[^>]+data-tabs-hero[^>]*>'),
    ('Modal CTA', r'<[^>]+data-modal-cta=[^>]*>'),
    ('Modal Menu', r'<[^>]+data-modal-menu=[^>]*>'),
    ('Preloader', r'<[^>]+data-preloader[^>]*>'),
    ('Slider', r'<[^>]+data-slider=[^>]*>'),
    ('Tabs', r'<[^>]+data-tabs[^>]*>')
]

for label, pat in targets:
    matches = list(re.finditer(pat, html))
    print(f"\n=== {label} ({len(matches)} matches) ===")
    for m in matches[:3]:
        start = m.start()
        print(html[start:start+300].replace('\n', ' '))
