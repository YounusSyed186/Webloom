const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\28fe387d-6327-4ce4-b070-7bcefae1cb53';

async function verifyAllReveals() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // 1. Scroll to "More than a website" Section (User Screenshot 1)
  await page.evaluate(() => {
    const el = document.getElementById('product') || document.querySelectorAll('section')[2];
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy(0, -50);
  });
  await page.waitForTimeout(400);

  // Move cursor right over the "Portfolio" card (User Screenshot 1)
  // Let's get the card's bounding box
  const card1Rect = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Portfolio'));
    if (!h3) return null;
    const rect = h3.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });

  if (card1Rect) {
    await page.mouse.move(card1Rect.x, card1Rect.y, { steps: 10 });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'revealed-card-portfolio.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved revealed-card-portfolio.png at x:', card1Rect.x, 'y:', card1Rect.y);
  }

  // 2. Scroll to "Designs that feel like you" Section (User Screenshot 2)
  await page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Designs that feel'));
    if (h2) {
      h2.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await page.waitForTimeout(400);

  const templateRect = await page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Designs that feel'));
    if (!h2) return null;
    const rect = h2.getBoundingClientRect();
    return { x: rect.left - 250, y: rect.top + 50 };
  });

  if (templateRect) {
    await page.mouse.move(templateRect.x, templateRect.y, { steps: 10 });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'revealed-template-showcase.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved revealed-template-showcase.png');
  }

  // 3. Scroll to "How it works" Steps (User Screenshot 3)
  await page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('blank page'));
    if (h2) {
      h2.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await page.waitForTimeout(400);

  const step2Rect = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('span, div')).filter(el => el.textContent.trim() === 'Step 02');
    if (cards.length === 0) return null;
    const rect = cards[0].getBoundingClientRect();
    return { x: rect.left + 50, y: rect.top + 80 };
  });

  if (step2Rect) {
    await page.mouse.move(step2Rect.x, step2Rect.y, { steps: 10 });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'revealed-step2-card.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved revealed-step2-card.png');
  }

  // 4. Test Navbar Theme Toggle to Dark Mode
  await page.evaluate(() => {
    const btn = document.querySelector('button[title*="Switch to dark mode"]');
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);

  // In dark mode, move over the "Step 02" card to see light card revealed
  if (step2Rect) {
    await page.mouse.move(step2Rect.x, step2Rect.y, { steps: 10 });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'dark-mode-revealed-light-step2.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved dark-mode-revealed-light-step2.png');
  }

  await browser.close();
  console.log('Finished all visual verifications successfully!');
}

verifyAllReveals().catch(console.error);

