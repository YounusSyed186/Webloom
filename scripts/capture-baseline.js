const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureBaseline() {
  console.log('=== Webloom Baseline QA & Screenshot Capture ===');
  
  const screenshotsDir = path.join(__dirname, '..', 'reports', 'webloom', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const routes = [
    { name: 'landing-desktop-baseline', url: 'http://localhost:3000/', viewport: { width: 1440, height: 900 } },
    { name: 'landing-tablet-baseline', url: 'http://localhost:3000/', viewport: { width: 768, height: 1024 } },
    { name: 'landing-mobile-baseline', url: 'http://localhost:3000/', viewport: { width: 390, height: 844 } },
    { name: 'dashboard-desktop-baseline', url: 'http://localhost:3000/dashboard', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-links-baseline', url: 'http://localhost:3000/dashboard/links', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-blocks-baseline', url: 'http://localhost:3000/dashboard/blocks', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-appearance-baseline', url: 'http://localhost:3000/dashboard/appearance', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-analytics-baseline', url: 'http://localhost:3000/dashboard/analytics', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-store-baseline', url: 'http://localhost:3000/dashboard/store', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-bookings-baseline', url: 'http://localhost:3000/dashboard/bookings', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-audience-baseline', url: 'http://localhost:3000/dashboard/audience', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-ai-baseline', url: 'http://localhost:3000/dashboard/ai', viewport: { width: 1440, height: 900 } },
    { name: 'dashboard-settings-baseline', url: 'http://localhost:3000/dashboard/settings', viewport: { width: 1440, height: 900 } },
    { name: 'public-profile-baseline', url: 'http://localhost:3000/younus', viewport: { width: 1440, height: 900 } },
  ];

  for (const r of routes) {
    try {
      console.log(`Capturing ${r.name} (${r.url})...`);
      const context = await browser.newContext({ viewport: r.viewport });
      const page = await context.newPage();
      await page.goto(r.url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(800);
      
      const filePath = path.join(screenshotsDir, `${r.name}.png`);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`✓ Saved ${r.name}.png`);
      await context.close();
    } catch (err) {
      console.error(`Error capturing ${r.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('=== All Baseline Screenshots Captured ===');
}

captureBaseline();

