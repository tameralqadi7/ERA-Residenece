import re

with open('era-residence/app_main.js', 'r', encoding='utf-8') as f:
    js = f.read()

keywords = ['location', 'domain', 'origin', 'host', 'api', 'fetch', 'ajax', 'http', 'breakPoint']
for kw in keywords:
    matches = [m.start() for m in re.finditer(re.escape(kw), js, re.I)]
    print(f"Keyword '{kw}': {len(matches)} occurrences")
    for pos in matches[:5]:
        snippet = js[max(0, pos-40):min(len(js), pos+60)]
        print("   ...", snippet.replace('\n', ' '), "...")
