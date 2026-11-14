const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  const colors = await page.evaluate(() => {
    const replica = document.querySelector('[data-webloom-dark-replica="true"]');
    if (!replica) return { error: 'No replica' };

    // Find all h3, p, span, div text in replica
    const step2Heading = Array.from(replica.querySelectorAll('h3')).find(h => h.textContent.includes('Arrange your world'));
    const step2P = step2Heading ? step2Heading.nextElementSibling : null;
    const portfolioH3 = Array.from(replica.querySelectorAll('h3')).find(h => h.textContent.includes('Portfolio'));
    const portfolioP = portfolioH3 ? portfolioH3.nextElementSibling : null;

    const getColor = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        text: el.textContent.trim(),
        color: cs.color,
        fontSize: cs.fontSize,
        opacity: cs.opacity,
        visibility: cs.visibility,
        classes: el.className,
      };
    };

    return {
      portfolioH3: getColor(portfolioH3),
      portfolioP: getColor(portfolioP),
      step2Heading: getColor(step2Heading),
      step2P: getColor(step2P),
    };
  });

  console.log('Replica colors:', JSON.stringify(colors, null, 2));
  await browser.close();
})();

