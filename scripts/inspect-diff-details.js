const sharp = require('sharp');
const path = require('path');

async function inspectDiff() {
  const diffPath = path.join(process.cwd(), 'public', 'comparison', 'diff.png');
  const diffBuffer = await sharp(diffPath).raw().toBuffer({ resolveWithObject: true });
  const data = diffBuffer.data;
  const w = 1024;
  const ch = diffBuffer.info.channels;

  // Let's inspect per 50px slice down the image
  for (let y = 0; y < 1536; y += 80) {
    let diffs = 0;
    const sliceH = Math.min(80, 1536 - y);
    for (let sy = y; sy < y + sliceH; sy++) {
      for (let x = 0; x < w; x++) {
        const idx = (sy * w + x) * ch;
        // In our diff script, diff pixels are marked with R=255, G=50, B=50
        if (data[idx] === 255 && data[idx+1] === 50) {
          diffs++;
        }
      }
    }
    const pct = ((diffs / (w * sliceH)) * 100).toFixed(1);
    console.log(`y=[${y}..${y+sliceH}]: ${pct}% diff`);
  }
}

inspectDiff().catch(console.error);

