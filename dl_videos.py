import urllib.request

video_urls = [
    'https://assets.era-residence.com/flowers/bougainvillea-flowers_01.webm',
    'https://assets.era-residence.com/flowers/bougainvillea-flowers_02.webm',
    'https://assets.era-residence.com/flowers/bougainvillea-flowers_03.webm',
    'https://assets.era-residence.com/flowers/bougainvillea-flowers_04.webm',
    'https://assets.era-residence.com/flowers/bougainvillea-flowers_05.webm',
    'https://assets.era-residence.com/flowers/bougainvillea-flowers_06.webm',
    'https://assets.era-residence.com/flowers/bougainvillea-flowers_07.webm',
]

for u in video_urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            filename = u.split('/')[-1]
            with open(f'era-residence/assets/{filename}', 'wb') as out:
                out.write(data)
            print(f'Downloaded {filename}: {len(data)} bytes')
    except Exception as e:
        print(f'{u}: {e}')
