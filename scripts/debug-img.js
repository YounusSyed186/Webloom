const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure()));
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const imgState = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')).map(img => {
      const rect = img.getBoundingClientRect();
      const style = window.getComputedStyle(img);
      return {
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        visibility: style.visibility,
        display: style.display,
        opacity: style.opacity,
        zIndex: style.zIndex
      };
    });
    return imgs;
  });
  
  console.log('ALL IMAGES IN DOM:', JSON.stringify(imgState, null, 2));
  await browser.close();
})();

