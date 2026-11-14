// scripts/capture-ux-audit.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureUxAuditScreenshots() {
  const screenshotsDir = path.resolve(__dirname, '../reports/ux-audit/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:3000';

  console.log('Capturing UX Audit Screenshots...');

  // 1. Landing Page Hero
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, '01-landing-hero.png') });

  // 2. Landing Pricing Section
  const pricingSection = page.locator('#pricing, section:has-text("Simple, Transparent Pricing"), section:has-text("Seed · Free")').first();
  if (await pricingSection.count() > 0) {
    await pricingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, '02-landing-pricing.png') });
  }

  // 3. Auth Modal (refreshed)
  await page.evaluate(() => window.scrollTo(0, 0));
  const ctaBtn = page.locator('button:has-text("Log in"), button:has-text("Sign in"), button:has-text("Get Started")').first();
  if (await ctaBtn.count() > 0) {
    await ctaBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, '03-auth-modal-clean.png') });
  }

  // 4. Instant Demo Login to enter Dashboard
  const demoBtn = page.locator('button:has-text("Demo Workspace"), button:has-text("Instant Demo")').first();
  if (await demoBtn.count() > 0) {
    await demoBtn.click();
    await page.waitForTimeout(1200);
  } else {
    await page.evaluate(() => {
      localStorage.setItem('webloom_auth_user', JSON.stringify({ id: 'usr_demo', email: 'demo@webloom.site', username: 'demo', name: 'Demo Creator' }));
    });
    await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle' });
  }

  // 5. Dashboard Overview
  await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '04-dashboard-overview.png') });

  // 6. Links Manager
  await page.goto(`${baseUrl}/dashboard/links`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '05-links-manager.png') });

  // 7. Blocks Studio
  await page.goto(`${baseUrl}/dashboard/blocks`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '06-blocks-studio.png') });

  // 8. Storefront Manager
  await page.goto(`${baseUrl}/dashboard/store`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '07-storefront-manager.png') });

  // 9. Bookings Calendar
  await page.goto(`${baseUrl}/dashboard/bookings`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '08-bookings-manager.png') });

  // 10. Audience CRM
  await page.goto(`${baseUrl}/dashboard/audience`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '09-audience-crm.png') });

  // 11. Appearance Studio & Layout Switcher
  await page.goto(`${baseUrl}/dashboard/appearance`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '10-appearance-studio.png') });

  // 12. Analytics
  await page.goto(`${baseUrl}/dashboard/analytics`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '11-analytics-dashboard.png') });

  // 13. Settings & Billing
  await page.goto(`${baseUrl}/dashboard/settings`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '12-settings-billing.png') });

  // 14. Public Profile (/demo)
  await page.goto(`${baseUrl}/demo`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, '13-public-profile-demo.png') });

  console.log('Successfully captured all 13 UX Audit Screenshots in reports/ux-audit/screenshots!');
  await browser.close();
}

captureUxAuditScreenshots().catch(err => {
  console.error(err);
  process.exit(1);
});
