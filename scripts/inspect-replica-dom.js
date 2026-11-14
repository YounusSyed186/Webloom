const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Scroll to "More than a website"
  await page.evaluate(() => {
    const el = document.getElementById('product') || document.querySelectorAll('section')[2];
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy(0, -50);
  });
  await page.waitForTimeout(500);

  // Move mouse over Portfolio card
  const card1Rect = await page.evaluate(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Portfolio'));
    if (!h3) return null;
    const rect = h3.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });

  if (card1Rect) {
    await page.mouse.move(card1Rect.x, card1Rect.y, { steps: 5 });
    await page.waitForTimeout(400);
  }

  const result = await page.evaluate(() => {
    const replica = document.querySelector('[data-webloom-dark-replica="true"]');
    if (!replica) return { error: 'No replica found' };

    const replicaH3s = Array.from(replica.querySelectorAll('h3'));
    const baseH3s = Array.from(document.querySelectorAll('main:not([data-webloom-dark-replica="true"] main) h3'));

    const sample = replicaH3s.find(h => h.textContent.includes('Portfolio'));
    let sampleInfo = null;
    if (sample) {
      const rect = sample.getBoundingClientRect();
      const cs = window.getComputedStyle(sample);
      const parent = sample.parentElement;
      const parentCs = parent ? window.getComputedStyle(parent) : null;
      const grandParent = parent?.parentElement;
      const grandParentCs = grandParent ? window.getComputedStyle(grandParent) : null;

      sampleInfo = {
        text: sample.textContent.trim(),
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        style: {
          opacity: cs.opacity,
          visibility: cs.visibility,
          display: cs.display,
          transform: cs.transform,
          color: cs.color
        },
        parentStyle: parentCs ? {
          opacity: parentCs.opacity,
          visibility: parentCs.visibility,
          transform: parentCs.transform,
          display: parentCs.display
        } : null,
        grandParentStyle: grandParentCs ? {
          opacity: grandParentCs.opacity,
          visibility: grandParentCs.visibility,
          transform: grandParentCs.transform,
          display: grandParentCs.display
        } : null,
      };
    }

    return {
      replicaH3Count: replicaH3s.length,
      baseH3Count: baseH3s.length,
      cursorRadius: getComputedStyle(document.documentElement).getPropertyValue('--cursor-radius'),
      cursorDocX: getComputedStyle(document.documentElement).getPropertyValue('--cursor-doc-x'),
      cursorDocY: getComputedStyle(document.documentElement).getPropertyValue('--cursor-doc-y'),
      sampleInfo
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();

