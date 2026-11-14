const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to How it works (setup-steps)
  await page.evaluate(() => {
    const el = document.getElementById('setup-steps');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);

  const report = await page.evaluate(() => {
    const replica = document.querySelector('[data-webloom-dark-replica="true"]');
    if (!replica) return { error: 'No replica found' };

    const replicaStepSection = replica.querySelector('#setup-steps');
    if (!replicaStepSection) return { error: 'No setup-steps in replica' };

    const nodes = Array.from(replicaStepSection.querySelectorAll('*'));
    return nodes.map(n => {
      const cs = window.getComputedStyle(n);
      const rect = n.getBoundingClientRect();
      return {
        tag: n.tagName,
        classes: n.className?.toString?.().slice(0, 50),
        id: n.id,
        text: n.childNodes.length === 1 && n.childNodes[0].nodeType === 3 ? n.textContent.trim() : undefined,
        opacity: cs.opacity,
        visibility: cs.visibility,
        display: cs.display,
        transform: cs.transform,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.w || rect.width), h: Math.round(rect.h || rect.height) }
      };
    }).filter(item => item.text || item.tag === 'IMG' || item.tag === 'SVG');
  });

  console.log(JSON.stringify(report.slice(0, 25), null, 2));
  await browser.close();
})();

