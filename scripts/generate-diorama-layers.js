const sharp = require('sharp');
const path = require('path');

async function generateDioramaLayers() {
  const inputPath = path.join(process.cwd(), 'public', 'generated', 'audience-hills-authentic.jpg');
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width; // 1376
  const H = info.height; // 768
  const C = info.channels; // 4

  const smoothstep = (e0, e1, x) => {
    const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  };

  // 1. Foreground Left Cottage + Cypress Grove + Left Hill Cutout
  const cottageBuf = Buffer.alloc(data.length);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * C;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      if (x > 640 || y < 445) {
        cottageBuf[idx + 3] = 0;
        continue;
      }

      // Solid left hill meadow below y = 665 (for x <= 280) or sloping down to y = 768 at x = 620
      const ridgeY = x <= 270 ? 662 : 662 + ((x - 270) / 350) * 106;
      const inLeftHillBody = y >= ridgeY;

      // Cottage house body & terracotta roof (including the bright sunlit cream gable wall on the right)
      const roofTopY =
        x < 115
          ? 552 + (115 - x) * 1.35
          : x <= 216
            ? 546
            : 552 + (x - 216) * 1.25;
      const inSolidHousePolygon =
        x >= 78 && x <= 256 && y >= roofTopY && y <= 674 && (y >= 596 || r - b > 14 || g < 210);

      // Green cypress trees (strong green relative to blue, darker than cloud: g > b + 14 and g < 195)
      const isGreenTree = x <= 290 && y >= 455 && g > b + 14 && b < 165 && r < 185;

      if (!inLeftHillBody && !inSolidHousePolygon && !isGreenTree) {
        cottageBuf[idx + 3] = 0;
        continue;
      }

      const fadeRight = x > 280 ? (1 - smoothstep(550, 635, x)) * smoothstep(ridgeY - 8, ridgeY + 6, y) : 1;
      cottageBuf[idx] = r;
      cottageBuf[idx + 1] = g;
      cottageBuf[idx + 2] = b;
      cottageBuf[idx + 3] = Math.round(fadeRight * 255);
    }
  }

  await sharp(cottageBuf, { raw: { width: W, height: H, channels: C } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(process.cwd(), 'public', 'generated', 'diorama-cottage-cutout.png'));

  // 2. Foreground Right Meadow & Green Trees Cutout
  const rightBuf = Buffer.alloc(data.length);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * C;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      if (x < 680 || y < 535) {
        rightBuf[idx + 3] = 0;
        continue;
      }

      const frontRidgeY = 768 - ((x - 700) / 676) * 114;
      const inFrontMeadow = y >= frontRidgeY;

      // Right grove trees: green foliage or brown trunks (g > b + 14 and b < 175)
      const isRightTree = x >= 1195 && y >= 540 && ((g > b + 14 && b < 175 && r < 195) || (r < 130 && g < 120 && b < 100));

      if (!inFrontMeadow && !isRightTree) {
        rightBuf[idx + 3] = 0;
        continue;
      }

      const fadeEdge = inFrontMeadow ? smoothstep(frontRidgeY - 6, frontRidgeY + 6, y) : 1;
      rightBuf[idx] = r;
      rightBuf[idx + 1] = g;
      rightBuf[idx + 2] = b;
      rightBuf[idx + 3] = Math.round(fadeEdge * 255);
    }
  }

  await sharp(rightBuf, { raw: { width: W, height: H, channels: C } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(process.cwd(), 'public', 'generated', 'diorama-right-grove-cutout.png'));

  console.log('Regenerated clean diorama-cottage-cutout.png & diorama-right-grove-cutout.png');
}

generateDioramaLayers().catch(console.error);
