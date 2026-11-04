const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Scroll down to the cards
  await page.evaluate(() => {
    window.scrollTo({ top: 1200, behavior: 'instant' });
  });
  await page.waitForTimeout(500);

  const cardOpacities = await page.evaluate(() => {
    const layer2 = document.querySelector('[data-webloom-dark-replica]');
    const sections = layer2 ? Array.from(layer2.querySelectorAll('section')) : [];
    const sec2 = sections[2]; // What you can build
    if (!sec2) return 'Section 2 not found';
    const all = Array.from(sec2.querySelectorAll('*'));
    return all.map(el => ({
      tag: el.tagName,
      text: el.textContent ? el.textContent.trim().slice(0, 25) : '',
      style: el.getAttribute('style') || '',
      opacity: window.getComputedStyle(el).opacity,
      display: window.getComputedStyle(el).display,
      visibility: window.getComputedStyle(el).visibility,
    })).filter(x => x.opacity === '0' || x.display === 'none' || x.visibility === 'hidden');
  });

  console.log('Zero opacity elements in Layer 2 Section 2:');
  console.log(JSON.stringify(cardOpacities, null, 2));

  // Now move mouse to (400, 400) and take a screenshot of what's rendered in the browser!
  await page.mouse.move(400, 400);
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'C:/Users/DELL/.gemini/antigravity/brain/28fe387d-6327-4ce4-b070-7bcefae1cb53/debug-actual-reveal.png' });
  console.log('Saved debug-actual-reveal.png');

  await browser.close();
})();
