const sharp = require('sharp');
const path = require('path');

async function makeLavenderRibbonTransparent() {
  const inputPath = path.join(process.cwd(), 'public', 'generated', 'lavender-ribbon-banner.jpg');
  const outputPath = path.join(process.cwd(), 'public', 'generated', 'lavender-ribbon-clean.png');

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width; // 1376
  const H = info.height; // 768
  const C = info.channels; // 4

  const out = Buffer.from(data);

  const smoothstep = (edge0, edge1, x) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  // Step 1: Seamlessly heal the right side (stamp + postmark + wavy lines)
  // Sample directly from the clean central lavender paper at the exact same y coordinate
  for (let y = 232; y <= 525; y++) {
    for (let x = 965; x <= 1308; x++) {
      const idx = (y * W + x) * C;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Clean sample from center-left of the ribbon at the exact same vertical row y
      const srcX = x - 520;
      const srcY = y - 4;
      const srcIdx = (srcY * W + srcX) * C;
      const sr = data[srcIdx];
      const sg = data[srcIdx + 1];
      const sb = data[srcIdx + 2];

      const maskLeft = smoothstep(965, 1025, x);
      const maskRight = 1 - smoothstep(1288, 1308, x);
      const maskTop = smoothstep(234, 254, y);
      const maskBot = 1 - smoothstep(502, 524, y);
      const blend = maskLeft * maskRight * maskTop * maskBot;

      if (blend > 0) {
        out[idx] = Math.round(r * (1 - blend) + sr * blend);
        out[idx + 1] = Math.round(g * (1 - blend) + sg * blend);
        out[idx + 2] = Math.round(b * (1 - blend) + sb * blend);
      }
    }
  }

  // Step 2: True Alpha Extraction around the entire deckle-edge silhouette
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * C;
      const r = out[idx];
      const g = out[idx + 1];
      const b = out[idx + 2];

      if (x < 45 || x > 1335 || y < 200 || y > 552) {
        out[idx + 3] = 0;
        continue;
      }

      // Pressed flower & masking tape interior safety zone
      const inFlowerCore = x >= 92 && x <= 305 && y >= 248 && y <= 506;
      // Central paper interior safety zone
      const inPaperCore = x >= 92 && x <= 1275 && y >= 254 && y <= 498;

      if (inFlowerCore || inPaperCore) {
        out[idx + 3] = 255;
        continue;
      }

      const purpleIdx = (r - g) + (b - g);

      // Filter out dark grey drop shadow speckles below y = 532 that aren't strongly purple
      const minPurple = y > 528 ? 20 : 12;
      const maxPurple = y > 528 ? 30 : 24;

      if (purpleIdx <= minPurple) {
        out[idx + 3] = 0;
      } else if (purpleIdx >= maxPurple) {
        out[idx + 3] = 255;
      } else {
        const alphaNorm = (purpleIdx - minPurple) / (maxPurple - minPurple);
        const alpha = Math.round(smoothstep(0, 1, alphaNorm) * 255);
        out[idx] = Math.min(218, r);
        out[idx + 1] = Math.min(200, g);
        out[idx + 2] = Math.min(224, b);
        out[idx + 3] = alpha;
      }
    }
  }

  const cropLeft = 42;
  const cropTop = 205;
  const cropWidth = 1293;
  const cropHeight = 350;

  await sharp(out, {
    raw: { width: W, height: H, channels: C },
  })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Saved spotless transparent deckle-edge ribbon to ${outputPath}`);
}

makeLavenderRibbonTransparent().catch(console.error);
