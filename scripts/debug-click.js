const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3000/#pricing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const btns = await page.locator('button:has-text("Create your Pro space")').all();
  console.log('Buttons found with text "Create your Pro space":', btns.length);

  for (let i = 0; i < btns.length; i++) {
    const isVisible = await btns[i].isVisible();
    console.log(`Button ${i}: visible = ${isVisible}`);
  }

  // Click the first one
  console.log('Attempting click on first button...');
  await btns[0].scrollIntoViewIfNeeded();
  await btns[0].click({ force: true });
  await page.waitForTimeout(1000);

  const modalCount = await page.locator('text=Activate Creator Pro').count();
  console.log('Modal "Activate Creator Pro" count after click 0:', modalCount);

  if (modalCount === 0 && btns.length > 1) {
    console.log('Attempting click on second button...');
    await btns[1].click({ force: true });
    await page.waitForTimeout(1000);
    const modalCount2 = await page.locator('text=Activate Creator Pro').count();
    console.log('Modal "Activate Creator Pro" count after click 1:', modalCount2);
  }

  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('HTML contains "Activate Creator Pro":', html.includes('Activate Creator Pro'));

  await browser.close();
})();

