import re

with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Replace CSS links in head:
# Replace webflow CSS link with fonts.css, webflow.css, lenis.css, custom.css
old_css_pattern = r'<link href="https://cdn.prod.website-files.com/[^"]+/css/era-residence\.webflow\.shared\.[^"]+\.css"[^>]*>'
new_css = '''<link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/webflow.css">
    <link rel="stylesheet" href="css/lenis.css">
    <link rel="stylesheet" href="css/custom.css">'''

html = re.sub(old_css_pattern, new_css, html)

# Remove redundant lenis css link from the bottom if present
html = re.sub(r'<link rel="stylesheet" href="https://unpkg.com/lenis@[^"]+/dist/lenis\.css">', '', html)

# 2. Replace scripts at the bottom:
# Replace the jquery script:
html = re.sub(
    r'<script src="https://d3e54v103j8qbb\.cloudfront\.net/js/jquery-[^"]+\.js[^"]*"[^>]*></script>',
    '<script src="js/jquery.min.js"></script>',
    html
)

# Replace webflow.js:
html = re.sub(
    r'<script src="https://cdn\.prod\.website-files\.com/[^"]+/js/webflow\.[^"]+\.js"[^>]*></script>',
    '<script src="js/webflow.js"></script>',
    html
)

# Replace barba:
html = re.sub(
    r'<script src="https://unpkg\.com/@barba/core"[^>]*></script>',
    '<script src="js/barba.umd.js"></script>',
    html
)

# Replace gsap and plugins:
html = re.sub(
    r'<script src="https://cdn\.jsdelivr\.net/npm/gsap@[^"]+/dist/gsap\.min\.js"[^>]*></script>',
    '<script src="js/gsap.min.js"></script>',
    html
)
html = re.sub(
    r'<script src="https://cdn\.jsdelivr\.net/npm/gsap@[^"]+/dist/ScrollTrigger\.min\.js"[^>]*></script>',
    '<script src="js/ScrollTrigger.min.js"></script>',
    html
)
html = re.sub(
    r'<script src="https://cdn\.jsdelivr\.net/npm/gsap@[^"]+/dist/SplitText\.min\.js"[^>]*></script>',
    '<script src="js/SplitText.min.js"></script>',
    html
)
html = re.sub(
    r'<script src="https://cdn\.jsdelivr\.net/npm/gsap@[^"]+/dist/CustomEase\.min\.js"[^>]*></script>',
    '<script src="js/CustomEase.min.js"></script>',
    html
)

# Replace lenis js:
html = re.sub(
    r'<script src="https://unpkg\.com/lenis@[^"]+/dist/lenis\.min\.js"[^>]*></script>',
    '<script src="js/lenis.min.js"></script>',
    html
)

# Replace lottie:
html = re.sub(
    r'<script src="https://cdn\.jsdelivr\.net/npm/lottie-web@[^"]+/build/player/lottie\.min\.js"[^>]*></script>',
    '<script src="js/lottie.min.js"></script>',
    html
)

# Replace slater dynamic loader script with direct main.js:
slater_loader_pattern = r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\',\s*function\s*\(\)\s*\{[\s\S]*?loadtwc\(src\);\s*\}\);\s*</script>'
html = re.sub(
    slater_loader_pattern,
    '<script src="js/main.js"></script>',
    html
)

# Also update the Lottie json attribute to point to local assets/tftl-logo_white.json with fallback:
html = html.replace(
    'data-json="https://pub-157506367d4c4fa1825d7a6d26b687a2.r2.dev/tftl-logo_white.json"',
    'data-json="assets/tftl-logo_white.json"'
)

# Also for flower videos, ensure local webm works seamlessly
# Keep CDN urls or add local fallbacks if needed.
# Since local webm exists, we can replace or keep CDN:
for i in range(1, 8):
    cdn_webm = f'https://assets.era-residence.com/flowers/bougainvillea-flowers_0{i}.webm'
    local_webm = f'assets/bougainvillea-flowers_0{i}.webm'
    html = html.replace(cdn_webm, local_webm)

with open('era-residence/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Generated era-residence/index.html successfully!")
