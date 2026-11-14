const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testNewLayouts() {
  console.log('=== Testing New Layouts & Responsive Designs ===');

  const screenshotsDir = path.join(__dirname, '..', 'reports', 'webloom', 'screenshots', 'layouts');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  // 1. Test Dashboard Appearance Layouts
  console.log('Testing Appearance Layout Studio...');
  const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctxDesktop.newPage();

  await page.goto('http://localhost:3000/dashboard/appearance', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard-appearance-layouts.png') });
  console.log('✓ Captured dashboard-appearance-layouts.png');

  // Test selecting Bento layout
  console.log('Applying Bento layout...');
  const bentoBtn = page.locator('button:has-text("Modern Creator Bento Grid")');
  if (await bentoBtn.count() > 0) {
    await bentoBtn.first().click();
    await page.waitForTimeout(500);
  }

  // Test live preview desktop mode switch
  const monitorBtn = page.locator('button[aria-label="Switch to PC Desktop preview"]');
  if (await monitorBtn.count() > 0) {
    await monitorBtn.first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, 'dashboard-live-preview-desktop-mode.png') });
    console.log('✓ Captured dashboard-live-preview-desktop-mode.png');
  }

  // 2. Test Public Profile in Bento Mode (Desktop 1440px)
  console.log('Testing Public Profile in Bento Mode (Desktop)...');
  await page.goto('http://localhost:3000/younus', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, 'bento-desktop.png') });
  console.log('✓ Captured bento-desktop.png');

  // 3. Test Public Profile in Bento Mode (Mobile 390px)
  console.log('Testing Public Profile in Bento Mode (Mobile)...');
  const ctxMobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pageMobile = await ctxMobile.newPage();
  await pageMobile.goto('http://localhost:3000/younus', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(800);
  await pageMobile.screenshot({ path: path.join(screenshotsDir, 'bento-mobile.png') });
  console.log('✓ Captured bento-mobile.png');

  // 4. Test Storefront Layout
  console.log('Testing Storefront Layout...');
  await page.goto('http://localhost:3000/dashboard/appearance', { waitUntil: 'networkidle' });
  const storeBtn = page.locator('button:has-text("Digital Commerce & Goods")');
  if (await storeBtn.count() > 0) {
    await storeBtn.first().click();
    await page.waitForTimeout(500);
  }
  await page.goto('http://localhost:3000/younus', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, 'storefront-desktop.png') });
  console.log('✓ Captured storefront-desktop.png');

  // 5. Test Editorial Split Layout
  console.log('Testing Editorial Split-Screen Layout...');
  await page.goto('http://localhost:3000/dashboard/appearance', { waitUntil: 'networkidle' });
  const editBtn = page.locator('button:has-text("Split-Screen Magazine Studio")');
  if (await editBtn.count() > 0) {
    await editBtn.first().click();
    await page.waitForTimeout(500);
  }
  await page.goto('http://localhost:3000/younus', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, 'editorial-desktop.png') });
  console.log('✓ Captured editorial-desktop.png');

  // 6. Test Booking First Layout
  console.log('Testing Booking First Layout...');
  await page.goto('http://localhost:3000/dashboard/appearance', { waitUntil: 'networkidle' });
  const bookBtn = page.locator('button:has-text("Consultant & 1-on-1 Suite")');
  if (await bookBtn.count() > 0) {
    await bookBtn.first().click();
    await page.waitForTimeout(500);
  }
  await page.goto('http://localhost:3000/younus', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, 'booking-desktop.png') });
  console.log('✓ Captured booking-desktop.png');

  await browser.close();
  console.log('=== All Layout Tests Completed Successfully! ===');
}

testNewLayouts().catch(console.error);

