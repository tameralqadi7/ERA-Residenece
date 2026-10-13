const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to live site...');
    await page.goto('https://www.era-residence.com/', { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for preloader to finish or 5s
    await new Promise(r => setTimeout(r, 6000));

    const shotPath = path.join(__dirname, 'live_1440.png');
    await page.screenshot({ path: shotPath });
    console.log(`Live site screenshot saved to ${shotPath}`);

    await browser.close();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
