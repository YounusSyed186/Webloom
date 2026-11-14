const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(1000);

  // Without scrolling or anything, check all elements inside [data-webloom-dark-replica]
  const hiddenElements = await page.evaluate(() => {
    const replica = document.querySelector('[data-webloom-dark-replica="true"]');
    if (!replica) return { error: 'No replica' };

    const all = Array.from(replica.querySelectorAll('*'));
    const zeroOpacity = [];
    for (const el of all) {
      const cs = window.getComputedStyle(el);
      const op = parseFloat(cs.opacity);
      if (op < 0.5 || cs.visibility === 'hidden' || cs.display === 'none') {
        zeroOpacity.push({
          tag: el.tagName,
          classes: el.className?.toString?.().slice(0, 40),
          id: el.id,
          style: el.getAttribute('style')?.slice(0, 80),
          computedOpacity: cs.opacity,
          computedVisibility: cs.visibility,
          computedDisplay: cs.display,
          text: el.textContent?.slice(0, 30),
        });
      }
    }
    return {
      totalInReplica: all.length,
      zeroOpacityCount: zeroOpacity.length,
      sampleZeroOpacity: zeroOpacity.slice(0, 20),
    };
  });

  console.log('Replica hidden elements without scrolling:');
  console.log(JSON.stringify(hiddenElements, null, 2));

  await browser.close();
})();

