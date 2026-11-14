const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // 1. Move to "Portfolio" deckle card in What You Can Build
  const decklePortfolio = page.locator('h3:has-text("Portfolio")').first();
  await decklePortfolio.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const box1 = await decklePortfolio.boundingBox();
  console.log('Deckle Portfolio box:', box1);
  if (box1) {
    await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2);
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: 'reports/screenshots/actual-deckle-portfolio.png' });

  // 2. Move to Step 02 card
  const step2 = page.locator('text=Arrange your world').first();
  if (await step2.count() > 0) {
    await step2.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const box2 = await step2.boundingBox();
    console.log('Step 2 box:', box2);
    if (box2) {
      await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2);
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: 'reports/screenshots/actual-step2-reveal.png' });
  }

  // Inspect the replica element exact match
  const checkAlignment = await page.evaluate(() => {
    const baseCard = Array.from(document.querySelectorAll('h3')).find(h => h.textContent === 'Portfolio' && !h.closest('[data-webloom-dark-replica]'));
    const repCard = Array.from(document.querySelectorAll('[data-webloom-dark-replica] h3')).find(h => h.textContent === 'Portfolio');

    const baseBox = baseCard ? baseCard.getBoundingClientRect() : null;
    const repBox = repCard ? repCard.getBoundingClientRect() : null;

    return {
      baseBox: baseBox ? { x: Math.round(baseBox.x), y: Math.round(baseBox.y), w: Math.round(baseBox.width), h: Math.round(baseBox.height) } : null,
      repBox: repBox ? { x: Math.round(repBox.x), y: Math.round(repBox.y), w: Math.round(repBox.width), h: Math.round(repBox.height) } : null,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      cursorDocX: document.documentElement.style.getPropertyValue('--cursor-doc-x'),
      cursorDocY: document.documentElement.style.getPropertyValue('--cursor-doc-y'),
      cursorWinX: document.documentElement.style.getPropertyValue('--cursor-win-x'),
      cursorWinY: document.documentElement.style.getPropertyValue('--cursor-win-y'),
    };
  });

  console.log('Alignment check:', JSON.stringify(checkAlignment, null, 2));
  await browser.close();
})();

