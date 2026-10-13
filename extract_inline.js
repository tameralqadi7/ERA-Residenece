const fs = require('fs');
const html = fs.readFileSync('era-residence/raw_index.html', 'utf8');

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let idx = 0;
let m;
while ((m = scriptRegex.exec(html)) !== null) {
  const attrs = m[1];
  const content = m[2].trim();
  if (!attrs.includes('src=')) {
    idx++;
    fs.writeFileSync(`era-residence/inline_script_${idx}.js`, `// Script #${idx} Attrs: ${attrs}\n${content}`);
    console.log(`Saved inline_script_${idx}.js (${content.length} chars)`);
  }
}

const styleRegex = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi;
idx = 0;
while ((m = styleRegex.exec(html)) !== null) {
  idx++;
  const attrs = m[1];
  const content = m[2].trim();
  fs.writeFileSync(`era-residence/inline_style_${idx}.css`, `/* Style #${idx} Attrs: ${attrs} */\n${content}`);
  console.log(`Saved inline_style_${idx}.css (${content.length} chars)`);
}
