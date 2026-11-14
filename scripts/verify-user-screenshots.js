const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // 1. Move to Portfolio card (user screenshot 1)
  const card1 = page.locator('h3:has-text("Portfolio")').first();
  await card1.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const box1 = await card1.boundingBox();
  console.log('Portfolio box:', box1);
  if (box1) {
    // Hover at the bottom-left of the Portfolio card exactly as in user screenshot 1
    await page.mouse.move(box1.x - 20, box1.y + 60);
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: 'reports/screenshots/fix-verify-portfolio.png' });

  // 2. Move to Designs that feel like you (user screenshot 2)
  const templatesSection = page.locator('text=Designs that feel like you').first();
  await templatesSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const box2 = await templatesSection.boundingBox();
  if (box2) {
    // Move between laptop and template cards
    await page.mouse.move(box2.x - 200, box2.y + 200);
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: 'reports/screenshots/fix-verify-designs.png' });

  // 3. Move to Step 02 card (user screenshot 3)
  const step2Heading = page.locator('h3:has-text("Arrange your world")').first();
  await step2Heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const box3 = await step2Heading.boundingBox();
  console.log('Step 2 box:', box3);
  if (box3) {
    // Exactly center of Step 02 card
    await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2);
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: 'reports/screenshots/fix-verify-step2.png' });

  console.log('Finished capturing fix verification screenshots.');
  await browser.close();
})();

