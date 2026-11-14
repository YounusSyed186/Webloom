const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/28fe387d-6327-4ce4-b070-7bcefae1cb53';

async function capture() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Switch back to light mode first
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('webloom-theme-mode', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // 1. Light Mode Appearance
  await page.goto('http://localhost:3000/dashboard/appearance', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'dashboard-light-appearance.png') });
  console.log('Captured dashboard-light-appearance.png');

  // 2. Light Mode Analytics
  await page.goto('http://localhost:3000/dashboard/analytics', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'dashboard-light-analytics.png') });
  console.log('Captured dashboard-light-analytics.png');

  await browser.close();
  console.log('Additional captures done!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
