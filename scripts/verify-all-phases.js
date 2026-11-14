const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\28fe387d-6327-4ce4-b070-7bcefae1cb53';

async function verifyAllPhases() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('1. Testing Public Profile Page with Modular Blocks (/younus)...');
  await page.goto('http://localhost:3000/younus', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'public-profile-younus.png'),
    fullPage: true,
  });
  console.log('Saved public-profile-younus.png');

  console.log('2. Testing Dashboard Blocks Studio (/dashboard/blocks)...');
  await page.goto('http://localhost:3000/dashboard/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'dashboard-blocks-studio.png'),
    fullPage: false,
  });
  console.log('Saved dashboard-blocks-studio.png');

  console.log('3. Testing Dashboard Storefront (/dashboard/store)...');
  await page.goto('http://localhost:3000/dashboard/store', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'dashboard-storefront.png'),
    fullPage: false,
  });
  console.log('Saved dashboard-storefront.png');

  console.log('4. Testing Dashboard Audience CRM (/dashboard/audience)...');
  await page.goto('http://localhost:3000/dashboard/audience', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'dashboard-audience.png'),
    fullPage: false,
  });
  console.log('Saved dashboard-audience.png');

  console.log('5. Testing Dashboard Bookings (/dashboard/bookings)...');
  await page.goto('http://localhost:3000/dashboard/bookings', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'dashboard-bookings.png'),
    fullPage: false,
  });
  console.log('Saved dashboard-bookings.png');

  console.log('6. Testing AI Creator Studio (/dashboard/ai)...');
  await page.goto('http://localhost:3000/dashboard/ai', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'dashboard-ai-studio.png'),
    fullPage: false,
  });
  console.log('Saved dashboard-ai-studio.png');

  console.log('7. Testing Enterprise Admin Console (/admin)...');
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'admin-portal-overview.png'),
    fullPage: false,
  });
  console.log('Saved admin-portal-overview.png');

  console.log('All verification screenshots captured successfully!');
  await browser.close();
}

verifyAllPhases().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});

