const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\28fe387d-6327-4ce4-b070-7bcefae1cb53';

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Hover right on the "Designs that feel like you" templates
  const monogramThumbRect = await page.evaluate(() => {
    const baseMain = document.querySelector('div.relative.z-10.w-full main');
    const imgs = Array.from(baseMain ? baseMain.querySelectorAll('img[alt*="monogram"]') : []);
    if (imgs.length === 0) return null;
    imgs[0].scrollIntoView({ behavior: 'instant', block: 'center' });
    const rect = imgs[0].getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });

  if (monogramThumbRect) {
    await page.mouse.move(monogramThumbRect.x, monogramThumbRect.y, { steps: 8 });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'revealed-monogram-thumbnail.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved revealed-monogram-thumbnail.png at x:', monogramThumbRect.x, 'y:', monogramThumbRect.y);
  }

  await browser.close();
})();
