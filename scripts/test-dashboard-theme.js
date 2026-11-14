const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030/dashboard', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'reports/screenshots/dashboard-light.png' });

  // Toggle theme to dark
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.querySelector('svg.lucide-moon') || b.querySelector('svg.lucide-sun'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'reports/screenshots/dashboard-dark.png' });

  await browser.close();
})();

