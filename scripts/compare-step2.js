const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  const step2Heading = page.locator('h3:has-text("Arrange your world")').first();
  await step2Heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const box3 = await step2Heading.boundingBox();
  if (box3) {
    await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2);
    await page.waitForTimeout(600);
  }

  const comparison = await page.evaluate(() => {
    const baseH3 = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Arrange your world') && !h.closest('[data-webloom-dark-replica]'));
    const repH3 = Array.from(document.querySelectorAll('[data-webloom-dark-replica] h3')).find(h => h.textContent.includes('Arrange your world'));

    const baseBox = baseH3 ? baseH3.getBoundingClientRect() : null;
    const repBox = repH3 ? repH3.getBoundingClientRect() : null;

    const baseCs = baseH3 ? window.getComputedStyle(baseH3) : null;
    const repCs = repH3 ? window.getComputedStyle(repH3) : null;

    // Check parent transform and styles
    const baseParent = baseH3?.parentElement;
    const repParent = repH3?.parentElement;

    return {
      base: {
        text: baseH3?.textContent,
        box: baseBox,
        color: baseCs?.color,
        opacity: baseCs?.opacity,
        transform: baseCs?.transform,
        parentTransform: baseParent ? window.getComputedStyle(baseParent).transform : null,
      },
      replica: {
        text: repH3?.textContent,
        box: repBox,
        color: repCs?.color,
        opacity: repCs?.opacity,
        transform: repCs?.transform,
        parentTransform: repParent ? window.getComputedStyle(repParent).transform : null,
      },
      deltaY: repBox && baseBox ? repBox.y - baseBox.y : null,
      deltaX: repBox && baseBox ? repBox.x - baseBox.x : null,
    };
  });

  console.log('Step 2 comparison:', JSON.stringify(comparison, null, 2));
  await page.screenshot({ path: 'reports/screenshots/perfect-step2-reveal.png' });
  await browser.close();
})();
