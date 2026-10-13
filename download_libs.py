import urllib.request
import os

os.makedirs('era-residence/js', exist_ok=True)

scripts = {
    'jquery.min.js': 'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js',
    'webflow.js': 'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/js/webflow.a0aa6ca1.b7683852b8a60d8e.js',
    'barba.umd.js': 'https://unpkg.com/@barba/core/dist/barba.umd.js',
    'gsap.min.js': 'https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js',
    'ScrollTrigger.min.js': 'https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js',
    'SplitText.min.js': 'https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js',
    'CustomEase.min.js': 'https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js',
    'lenis.min.js': 'https://unpkg.com/lenis@1.3.21/dist/lenis.min.js',
    'lottie.min.js': 'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js'
}

for name, url in scripts.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            with open(f'era-residence/js/{name}', 'wb') as f:
                f.write(data)
            print(f'Successfully downloaded {name}: {len(data)} bytes')
    except Exception as e:
        print(f'Failed {name}: {e}')
