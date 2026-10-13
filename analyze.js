const fs = require('fs');
const html = fs.readFileSync('era-residence/raw_index.html', 'utf8');

const cssRegex = /<link[^>]+rel=["']stylesheet["'][^>]*>/gi;
console.log('--- CSS ---');
let m;
while ((m = cssRegex.exec(html)) !== null) {
  console.log(m[0]);
}

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
console.log('\n--- SCRIPTS ---');
while ((m = scriptRegex.exec(html)) !== null) {
  const attrs = m[1];
  const content = m[2].trim();
  const srcMatch = attrs.match(/src=["']([^"']+)["']/);
  if (srcMatch) {
    console.log('SRC:', srcMatch[1]);
  } else {
    console.log('INLINE:', content.slice(0, 100).replace(/\r?\n/g, ' '));
  }
}
