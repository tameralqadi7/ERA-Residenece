import re

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for tags like <section ...> or <div class="...-w" or <div class="...-s"
sections = re.findall(r'<section[^>]*class="([^"]+)"[^>]*>|<div[^>]*class="([^"]*(?:section|hero|benefit|amen|apart|loc|arch|contact|footer|modal|header|preloader)[^"]*)"', html, re.I)
found = set()
for s in sections:
    c = s[0] or s[1]
    for cls in c.split():
        if any(cls.endswith(suffix) for suffix in ['-w', '-s', '-area', '-sec', '-wrap']):
            found.add(cls)

print("Major layout blocks:")
for cls in sorted(found):
    print(" -", cls)
