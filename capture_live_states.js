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
    await page.goto('https://www.era-residence.com/', { waitUntil: 'networkidle2', timeout: 45000 });

    // Wait until preloader is hidden or 10s
    try {
      await page.waitForFunction(() => {
        const preloader = document.querySelector('[data-preloader]');
        return !preloader || preloader.style.display === 'none' || getComputedStyle(preloader).display === 'none';
      }, { timeout: 15000 });
      console.log('Preloader finished!');
    } catch (e) {
      console.log('Preloader wait timed out, proceeding...');
    }

    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(__dirname, 'live_hero.png') });
    console.log('Saved live_hero.png');

    // Click Day/Night toggle
    try {
      const nightBtn = await page.$('[data-tab-trigger="night"]');
      if (nightBtn) {
        await nightBtn.click();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: path.join(__dirname, 'live_hero_night.png') });
        console.log('Saved live_hero_night.png');
      }
    } catch (e) {
      console.log('Night toggle error:', e);
    }

    // Open Book a Call popup
    try {
      const callBtn = await page.$('[data-modal-cta-btn="book-a-call"]');
      if (callBtn) {
        await callBtn.click();
        await new Promise(r => setTimeout(r, 1200));
        await page.screenshot({ path: path.join(__dirname, 'live_modal_call.png') });
        console.log('Saved live_modal_call.png');
        // Close modal
        await page.keyboard.press('Escape');
        await new Promise(r => setTimeout(r, 800));
      }
    } catch (e) {
      console.log('Modal call error:', e);
    }

    // Open Menu
    try {
      const menuBtn = await page.$('[data-modal-menu-btn="mob"]');
      if (menuBtn) {
        await menuBtn.click();
        await new Promise(r => setTimeout(r, 1200));
        await page.screenshot({ path: path.join(__dirname, 'live_modal_menu.png') });
        console.log('Saved live_modal_menu.png');
        await page.keyboard.press('Escape');
        await new Promise(r => setTimeout(r, 800));
      }
    } catch (e) {
      console.log('Modal menu error:', e);
    }

    // Scroll to benefits
    await page.evaluate(() => {
      const el = document.querySelector('.benefits-w') || document.querySelector('.benefits-intro-w');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(__dirname, 'live_benefits.png') });
    console.log('Saved live_benefits.png');

    // Scroll to apartments
    await page.evaluate(() => {
      const el = document.querySelector('.apart-type-w') || document.querySelector('.apart-info-w');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(__dirname, 'live_apartments.png') });
    console.log('Saved live_apartments.png');

    // Scroll to footer
    await page.evaluate(() => {
      const el = document.querySelector('.footer-w');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(__dirname, 'live_footer.png') });
    console.log('Saved live_footer.png');

    await browser.close();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
