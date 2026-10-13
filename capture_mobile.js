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
    // Mobile viewport: iPhone 14 / standard mobile
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    console.log('Navigating to live site on mobile...');
    await page.goto('https://www.era-residence.com/', { waitUntil: 'networkidle2', timeout: 45000 });

    try {
      await page.waitForFunction(() => {
        const preloader = document.querySelector('[data-preloader]');
        return !preloader || preloader.style.display === 'none' || getComputedStyle(preloader).display === 'none';
      }, { timeout: 15000 });
      console.log('Mobile preloader finished!');
    } catch (e) {
      console.log('Mobile preloader timed out, proceeding...');
    }

    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(__dirname, 'live_mobile_hero.png') });
    console.log('Saved live_mobile_hero.png');

    // Click mobile menu
    const menuBtn = await page.$('[data-modal-menu-btn="mob"]');
    if (menuBtn) {
      console.log('Clicking mobile menu...');
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({ path: path.join(__dirname, 'live_mobile_menu.png') });
      console.log('Saved live_mobile_menu.png');
    }

    await browser.close();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
