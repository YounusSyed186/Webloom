const { chromium } = require('playwright');
const path = require('path');

async function test3DHero() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1300);

  // Move cursor across the 3D hero to trigger perspective response
  await page.mouse.move(480, 440, { steps: 12 });
  await page.waitForTimeout(200);

  await page.screenshot({
    path: path.join(process.cwd(), 'public', 'comparison', 'hero-3d-showcase-1440.png'),
    clip: { x: 0, y: 0, width: 1440, height: 830 },
  });
  console.log('Saved hero-3d-showcase-1440.png');

  // Click the floating left-mid 3D browser panel ("Botanical Portfolio") to verify interactive studio preview switch
  await page.click('div[title*="Botanical Portfolio"]');
  await page.waitForTimeout(380);

  await page.screenshot({
    path: path.join(process.cwd(), 'public', 'comparison', 'hero-3d-interactive-switch.png'),
    clip: { x: 0, y: 0, width: 1440, height: 830 },
  });
  console.log('Saved hero-3d-interactive-switch.png');

  await browser.close();
}

test3DHero().catch(console.error);

