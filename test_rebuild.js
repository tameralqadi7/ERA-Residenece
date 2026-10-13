const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const errors = [];
    const failedRequests = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('requestfailed', req => {
      failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
    });

    console.log('Navigating to http://localhost:3000/ ...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for preloader to complete
    try {
      await page.waitForFunction(() => {
        const preloader = document.querySelector('[data-preloader]');
        return !preloader || preloader.style.display === 'none' || getComputedStyle(preloader).display === 'none';
      }, { timeout: 15000 });
      console.log('Preloader finished successfully!');
    } catch (e) {
      console.log('Preloader wait timed out, continuing...');
    }

    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(__dirname, 'rebuild_hero.png') });
    console.log('Saved rebuild_hero.png');

    // Test Day/Night toggle
    try {
      const nightBtn = await page.$('[data-tab-trigger="night"]');
      if (nightBtn) {
        await nightBtn.click();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: path.join(__dirname, 'rebuild_hero_night.png') });
        console.log('Saved rebuild_hero_night.png');
      }
    } catch (e) {
      console.log('Night toggle error:', e);
    }

    // Test Book a Call popup
    try {
      const callBtn = await page.$('[data-modal-cta-btn="book-a-call"]');
      if (callBtn) {
        await callBtn.click();
        await new Promise(r => setTimeout(r, 1200));
        await page.screenshot({ path: path.join(__dirname, 'rebuild_modal_call.png') });
        console.log('Saved rebuild_modal_call.png');
        await page.keyboard.press('Escape');
        await new Promise(r => setTimeout(r, 800));
      }
    } catch (e) {
      console.log('Call modal error:', e);
    }

    // Scroll to benefits
    await page.evaluate(() => {
      const el = document.querySelector('.benefits-w') || document.querySelector('.benefits-intro-w');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(__dirname, 'rebuild_benefits.png') });
    console.log('Saved rebuild_benefits.png');

    // Scroll to apartments
    await page.evaluate(() => {
      const el = document.querySelector('.apart-type-w') || document.querySelector('.apart-info-w');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(__dirname, 'rebuild_apartments.png') });
    console.log('Saved rebuild_apartments.png');

    // Scroll to footer
    await page.evaluate(() => {
      const el = document.querySelector('.footer-w');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(__dirname, 'rebuild_footer.png') });
    console.log('Saved rebuild_footer.png');

    // Now test mobile viewport
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });

    try {
      await mobilePage.waitForFunction(() => {
        const preloader = document.querySelector('[data-preloader]');
        return !preloader || preloader.style.display === 'none' || getComputedStyle(preloader).display === 'none';
      }, { timeout: 15000 });
    } catch (e) {}

    await new Promise(r => setTimeout(r, 2000));
    await mobilePage.screenshot({ path: path.join(__dirname, 'rebuild_mobile_hero.png') });
    console.log('Saved rebuild_mobile_hero.png');

    const menuBtn = await mobilePage.$('[data-modal-menu-btn="mob"]');
    if (menuBtn) {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 1200));
      await mobilePage.screenshot({ path: path.join(__dirname, 'rebuild_mobile_menu.png') });
      console.log('Saved rebuild_mobile_menu.png');
    }

    console.log('\n--- DIAGNOSTICS ---');
    console.log('Errors:', errors);
    console.log('Failed requests:', failedRequests);

  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
})();
