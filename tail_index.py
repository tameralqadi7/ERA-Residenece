with open('era-residence/raw_index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
for i, line in enumerate(lines[-80:]):
    print(f"{len(lines)-80+i+1}: {line.rstrip()[:120]}")
