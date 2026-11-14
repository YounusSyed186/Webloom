const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const diffs = await page.evaluate(() => {
    const baseMain = document.querySelector('div.relative.z-10.w-full main');
    const replicaMain = document.querySelector('[data-webloom-dark-replica="true"] main');

    if (!baseMain || !replicaMain) return { error: 'mains not found' };

    const baseSections = Array.from(baseMain.children);
    const replicaSections = Array.from(replicaMain.children);

    const sectionComparison = baseSections.map((sec, idx) => {
      const repSec = replicaSections[idx];
      const baseRect = sec.getBoundingClientRect();
      const repRect = repSec ? repSec.getBoundingClientRect() : null;
      return {
        idx,
        tag: sec.tagName,
        id: sec.id,
        baseY: baseRect.top + window.scrollY,
        baseHeight: baseRect.height,
        repY: repRect ? repRect.top + window.scrollY : null,
        repHeight: repRect ? repRect.height : null,
        yDiff: repRect ? (repRect.top - baseRect.top) : null,
        hDiff: repRect ? (repRect.height - baseRect.height) : null,
      };
    });

    return {
      baseMainHeight: baseMain.getBoundingClientRect().height,
      replicaMainHeight: replicaMain.getBoundingClientRect().height,
      sectionComparison
    };
  });

  console.log(JSON.stringify(diffs, null, 2));
  await browser.close();
})();

