const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR =
  'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\28fe387d-6327-4ce4-b070-7bcefae1cb53';

async function test3DJourney() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1300);

  // 1. Move cursor across the 3D hero to trigger perspective response
  await page.mouse.move(520, 420, { steps: 10 });
  await page.waitForTimeout(200);

  const heroPath = path.join(process.cwd(), 'public', 'comparison', 'hero-3d-showcase-1440.png');
  await page.screenshot({
    path: heroPath,
    clip: { x: 0, y: 0, width: 1440, height: 830 },
  });
  fs.copyFileSync(heroPath, path.join(ARTIFACT_DIR, 'hero-3d-showcase-1440.png'));
  console.log('Saved hero-3d-showcase-1440.png');

  // 2. Click the floating left-mid 3D browser panel ("Botanical Portfolio") to verify interactive studio preview switch
  await page.evaluate(() => {
    const el = document.querySelector('div[title*="Botanical Portfolio"]');
    if (el) el.click();
  });
  await page.waitForTimeout(420);

  const switchPath = path.join(process.cwd(), 'public', 'comparison', 'hero-3d-interactive-switch.png');
  await page.screenshot({
    path: switchPath,
    clip: { x: 0, y: 0, width: 1440, height: 830 },
  });
  fs.copyFileSync(switchPath, path.join(ARTIFACT_DIR, 'hero-3d-interactive-switch.png'));
  console.log('Saved hero-3d-interactive-switch.png');

  // 3. Scroll to Scene 02 / 03 corridor to verify Three.js Textured 3D Polaroids, Petals & Rangefinder Camera HUD
  await page.evaluate(() => {
    const el = document.getElementById('product');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.mouse.move(780, 440, { steps: 12 });
  await page.waitForTimeout(750);

  const corridorPath = path.join(ARTIFACT_DIR, 'scene02-3d-corridor-1440.png');
  await page.screenshot({
    path: corridorPath,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('Saved scene02-3d-corridor-1440.png');

  // 4. Scroll to Scene 06 ("A home for builders, thinkers, creators, and dreamers") to verify the 3D Paper Diorama & Taped Audience Notes
  await page.evaluate(() => {
    const el = document.getElementById('explore');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(600);

  const dioramaEl = await page.$('#explore');
  if (dioramaEl) {
    const dioramaPath = path.join(ARTIFACT_DIR, 'diorama-scene06-1440.png');
    await dioramaEl.screenshot({ path: dioramaPath });
    console.log('Saved diorama-scene06-1440.png');
  }

  console.log('Console errors:', consoleErrors.length);
  await browser.close();
}

test3DJourney().catch(console.error);
