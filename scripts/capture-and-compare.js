const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const compDir = path.join(process.cwd(), 'public', 'comparison');
  if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1024, height: 1536 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Wait a moment for animations
  await page.waitForTimeout(1000);

  const renderedPath = path.join(compDir, 'current-render.png');
  await page.screenshot({
    path: renderedPath,
    clip: { x: 0, y: 0, width: 1024, height: 1536 }
  });
  console.log('Captured current-render.png at 1024x1536');

  await browser.close();

  // Compare with reference
  const refPath = path.join(process.cwd(), 'public', 'reference-1024x1536.png');
  if (!fs.existsSync(refPath)) {
    console.error('Reference image not found:', refPath);
    return;
  }

  const refBuffer = await sharp(refPath).raw().toBuffer({ resolveWithObject: true });
  const renBuffer = await sharp(renderedPath).raw().toBuffer({ resolveWithObject: true });

  const refData = refBuffer.data;
  const renData = renBuffer.data;
  const len = Math.min(refData.length, renData.length);
  const diffData = Buffer.alloc(len);

  let diffPixels = 0;
  let totalPixels = len / 3; // or 4 if alpha
  const channels = renBuffer.info.channels;
  const refChannels = refBuffer.info.channels;

  for (let i = 0; i < len; i += channels) {
    const rDiff = Math.abs(refData[i] - renData[i]);
    const gDiff = Math.abs(refData[i + 1] - renData[i + 1]);
    const bDiff = Math.abs(refData[i + 2] - renData[i + 2]);
    const delta = (rDiff + gDiff + bDiff) / 3;

    if (delta > 25) {
      diffPixels++;
      diffData[i] = 255;     // Red highlight for diff
      diffData[i + 1] = 50;
      diffData[i + 2] = 50;
    } else {
      // Dimmed grayscale background
      const gray = Math.floor((refData[i] + refData[i+1] + refData[i+2]) / 6);
      diffData[i] = gray;
      diffData[i + 1] = gray;
      diffData[i + 2] = gray;
    }
    if (channels === 4) {
      diffData[i + 3] = 255;
    }
  }

  const diffPercent = ((diffPixels / (1024 * 1536)) * 100).toFixed(2);
  console.log(`Comparison finished: ${diffPercent}% pixels differing (>25 delta)`);

  await sharp(diffData, {
    raw: {
      width: 1024,
      height: 1536,
      channels: channels
    }
  }).toFile(path.join(compDir, 'diff.png'));

  // Create side-by-side: Reference | Current Render
  const sideBySide = await sharp({
    create: {
      width: 2048,
      height: 1536,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  }).composite([
    { input: refPath, left: 0, top: 0 },
    { input: renderedPath, left: 1024, top: 0 }
  ]).png().toFile(path.join(compDir, 'side-by-side.png'));

  console.log('Saved diff.png and side-by-side.png in public/comparison/');
}

main().catch(console.error);

