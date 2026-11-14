const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Scroll to 'Portfolio' card
  const card = page.locator('text=Portfolio').first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const box = await card.boundingBox();
  console.log('Portfolio box:', box);
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);
  }

  await page.screenshot({ path: 'reports/screenshots/test-hover-portfolio.png' });

  const info = await page.evaluate(() => {
    const replica = document.querySelector('[data-webloom-dark-replica="true"]');
    if (!replica) return { error: 'NO REPLICA' };

    const rect = replica.getBoundingClientRect();
    const computed = window.getComputedStyle(replica);
    const vars = {
      cursorRadius: document.documentElement.style.getPropertyValue('--cursor-radius'),
      cursorDocX: document.documentElement.style.getPropertyValue('--cursor-doc-x'),
      cursorDocY: document.documentElement.style.getPropertyValue('--cursor-doc-y'),
      cursorWinX: document.documentElement.style.getPropertyValue('--cursor-win-x'),
      cursorWinY: document.documentElement.style.getPropertyValue('--cursor-win-y'),
    };

    const replicaCards = Array.from(replica.querySelectorAll('h3')).map(h => {
      const hRect = h.getBoundingClientRect();
      const cs = window.getComputedStyle(h);
      return {
        text: h.textContent,
        rect: { x: Math.round(hRect.x), y: Math.round(hRect.y), w: Math.round(hRect.width), h: Math.round(hRect.height) },
        opacity: cs.opacity,
        color: cs.color,
        visibility: cs.visibility,
        display: cs.display,
      };
    });

    const replicaImages = Array.from(replica.querySelectorAll('img')).map(img => {
      const iRect = img.getBoundingClientRect();
      const cs = window.getComputedStyle(img);
      return {
        src: img.src,
        rect: { x: Math.round(iRect.x), y: Math.round(iRect.y), w: Math.round(iRect.width), h: Math.round(iRect.height) },
        opacity: cs.opacity,
        display: cs.display,
      };
    });

    return {
      replicaRect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
      clipPath: computed.clipPath,
      vars,
      replicaCards: replicaCards.slice(0, 10),
      replicaImages: replicaImages.slice(0, 10),
    };
  });

  console.log('Replica info:', JSON.stringify(info, null, 2));
  await browser.close();
})();
