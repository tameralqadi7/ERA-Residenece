import re

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

menu_matches = re.findall(r'<[^>]*data-modal-menu-btn[^>]*>', html)
for m in menu_matches:
    print(m)

btn_menu = re.findall(r'<[^>]*btn-menu[^>]*>', html)
for b in btn_menu:
    print(b)
