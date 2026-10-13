with open('era-residence/app_main.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re
print("Has import:", bool(re.search(r'\bimport\b', js)))
print("Has export:", bool(re.search(r'\bexport\b', js)))
