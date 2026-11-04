const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\28fe387d-6327-4ce4-b070-7bcefae1cb53';

async function testThemeToggleAndCircle() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  // 1. Move cursor in Hero to show the compact 85px circle in Light mode (revealing Dark)
  await page.mouse.move(560, 420, { steps: 8 });
  await page.waitForTimeout(400);

  const heroCompactCircle = path.join(ARTIFACT_DIR, 'hero-compact-circle.png');
  await page.screenshot({
    path: heroCompactCircle,
    clip: { x: 0, y: 0, width: 1440, height: 850 },
  });
  console.log('Saved hero-compact-circle.png');

  // 2. Click the Dark/Light Mode Toggle button in the navbar
  await page.click('button[title*="Switch to dark mode"]');
  await page.waitForTimeout(600);

  // Take screenshot in Dark Mode
  const darkModeHero = path.join(ARTIFACT_DIR, 'navbar-dark-mode-hero.png');
  await page.screenshot({
    path: darkModeHero,
    clip: { x: 0, y: 0, width: 1440, height: 850 },
  });
  console.log('Saved navbar-dark-mode-hero.png');

  // Move cursor in Dark Mode to reveal the light circle
  await page.mouse.move(680, 520, { steps: 8 });
  await page.waitForTimeout(400);
  const darkModeCircle = path.join(ARTIFACT_DIR, 'navbar-dark-mode-circle.png');
  await page.screenshot({
    path: darkModeCircle,
    clip: { x: 0, y: 0, width: 1440, height: 850 },
  });
  console.log('Saved navbar-dark-mode-circle.png');

  // 3. Toggle back to Light Mode
  await page.click('button[title*="Switch to light mode"]');
  await page.waitForTimeout(500);

  await browser.close();
  console.log('Verification complete successfully!');
}

testThemeToggleAndCircle().catch(console.error);
