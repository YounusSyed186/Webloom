const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\28fe387d-6327-4ce4-b070-7bcefae1cb53';

async function testCursorReveal() {
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
  await page.waitForTimeout(1400);

  // 1. Hero Section: Move cursor over the MacBook workspace, floating 3D cards & CTA
  await page.mouse.move(580, 560, { steps: 18 });
  await page.waitForTimeout(500);

  const heroRevealPath = path.join(ARTIFACT_DIR, 'cursor-reveal-hero-1440.png');
  await page.screenshot({
    path: heroRevealPath,
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });
  console.log('Saved cursor-reveal-hero-1440.png');

  // 2. Scroll to "More than a website" (#product) Deckle-Edge Cards
  await page.evaluate(() => {
    const el = document.getElementById('product');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(400);

  // Move cursor to Position 1: (380, 320) directly over the left deckle-edge paper cards
  await page.mouse.move(380, 320, { steps: 16 });
  await page.waitForTimeout(500);

  const posAPath = path.join(ARTIFACT_DIR, 'cursor-reveal-pos1-1440.png');
  await page.screenshot({
    path: posAPath,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('Saved cursor-reveal-pos1-1440.png');

  // 3. Move cursor to Position 2: (880, 320) directly over the right deckle-edge paper cards
  await page.mouse.move(880, 320, { steps: 18 });
  await page.waitForTimeout(500);

  const posBPath = path.join(ARTIFACT_DIR, 'cursor-reveal-pos2-1440.png');
  await page.screenshot({
    path: posBPath,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('Saved cursor-reveal-pos2-1440.png');

  // 4. Scroll to "Designs that feel like you" (#templates) 3D Browser Stack
  await page.evaluate(() => {
    const el = document.getElementById('templates');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(400);

  await page.mouse.move(540, 260, { steps: 16 });
  await page.waitForTimeout(500);

  const templatesPath = path.join(
    ARTIFACT_DIR,
    'cursor-reveal-templates-1440.png'
  );
  await page.screenshot({
    path: templatesPath,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('Saved cursor-reveal-templates-1440.png');

  // 5. Scroll to Audience 3D Watercolor Diorama ("A home for your audience")
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const target = headings.find(
      (h) =>
        h.textContent &&
        h.textContent.includes('home for') &&
        !h.closest('[aria-hidden="true"]')
    );
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollBy(0, -60);
    }
  });
  await page.waitForTimeout(450);

  // Move cursor over the 3D Watercolor Cottage & Rolling Countryside Hills
  await page.mouse.move(480, 520, { steps: 18 });
  await page.waitForTimeout(500);

  const dioramaPath = path.join(ARTIFACT_DIR, 'cursor-reveal-diorama-1440.png');
  await page.screenshot({
    path: dioramaPath,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('Saved cursor-reveal-diorama-1440.png');

  // 6. Scroll to Finale Lavender Botanical Ribbon & FAQ bottom
  await page.evaluate(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - 1050,
      behavior: 'instant',
    });
  });
  await page.waitForTimeout(450);

  // Move cursor right over the Lavender Botanical Ribbon ("Create your Webloom today.")
  await page.mouse.move(680, 740, { steps: 18 });
  await page.waitForTimeout(500);

  const finalePath = path.join(ARTIFACT_DIR, 'cursor-reveal-finale-1440.png');
  await page.screenshot({
    path: finalePath,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('Saved cursor-reveal-finale-1440.png');

  console.log('Console errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log(consoleErrors);
  }
  await browser.close();
}

testCursorReveal().catch(console.error);
