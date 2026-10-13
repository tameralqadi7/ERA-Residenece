import os

styles = [
    'inline_style_1.css',
    'inline_style_2.css',
    'inline_style_3.css',
    'inline_style_4.css',
    'inline_style_5.css',
    'inline_style_6.css',
    'inline_style_7.css',
    'inline_style_8.css',
    'inline_style_9.css',
    'inline_style_10.css',
    'inline_style_11.css'
]

combined = "/* ==========================================================================\n"
combined += "   ERA RESIDENCE - CUSTOM COMPONENT & ANIMATION STYLES\n"
combined += "   ========================================================================== */\n\n"

for s in styles:
    filepath = os.path.join('era-residence', s)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            # remove comment header if added earlier
            if content.startswith('/* Style #'):
                content = content[content.find('*/')+2:].strip()
            combined += f"/* --- {s} --- */\n" + content + "\n\n"

with open('era-residence/css/custom.css', 'w', encoding='utf-8') as f:
    f.write(combined)

print("custom.css generated:", len(combined), "characters")
