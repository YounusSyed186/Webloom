const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/#pricing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Create your Pro space'));
    return buttons.map((b, i) => {
      const rect = b.getBoundingClientRect();
      const elAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      const isReplica = !!b.closest('[data-webloom-dark-replica]');
      const computed = window.getComputedStyle(b);
      return {
        index: i,
        isReplica,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        pointerEvents: computed.pointerEvents,
        elementOver: elAtPoint ? elAtPoint.tagName + '.' + elAtPoint.className.slice(0, 30) : null,
        parentTags: b.parentElement ? b.parentElement.tagName : null
      };
    });
  });

  console.log('Button DOM inspect:', JSON.stringify(info, null, 2));
  await browser.close();
})();

