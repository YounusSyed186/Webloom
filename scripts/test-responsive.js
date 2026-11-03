const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testResponsive() {
  const compDir = path.join(process.cwd(), 'public', 'comparison');
  if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  // 1. Capture Branded Preloader Snapshot on fresh session
  const preloaderContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const preloaderPage = await preloaderContext.newPage();
  await preloaderPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await preloaderPage.waitForTimeout(180);
  await preloaderPage.screenshot({
    path: path.join(compDir, 'preloader-capture.png'),
  });
  console.log('Saved preloader-capture.png');
  await preloaderContext.close();

  // 2. Test Viewports & Full Scroll Choreography
  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'desktop-1024', width: 1024, height: 800 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-375', width: 375, height: 812 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Wait for preloader exit (520ms + 580ms transition)
    await page.waitForTimeout(1250);

    // Simulate cursor movement on desktop to verify 3D hero responsiveness
    if (vp.width >= 1024) {
      await page.mouse.move(vp.width * 0.65, 360, { steps: 10 });
      await page.waitForTimeout(150);
      await page.mouse.move(vp.width * 0.5, 340, { steps: 10 });
    }

    // Scroll down progressively to trigger all whileInView animations
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= totalHeight; y += 450) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(90);
    }
    // Scroll back to top and wait for springs to settle
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);

    // Check for horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);

    console.log(
      `Viewport ${vp.name} (${vp.width}x${vp.height}): overflow=${hasHorizontalOverflow}, totalHeight=${pageHeight}px, consoleErrors=${consoleErrors.length}`
    );
    if (consoleErrors.length > 0) {
      console.log('Console errors:', consoleErrors);
    }

    await page.screenshot({
      path: path.join(compDir, `responsive-${vp.name}.png`),
      fullPage: true,
    });
    console.log(`Saved screenshot responsive-${vp.name}.png`);

    await context.close();
  }

  await browser.close();
}

testResponsive().catch(console.error);
