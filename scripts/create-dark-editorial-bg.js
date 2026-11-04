const sharp = require('sharp');
const path = require('path');

/**
 * Generates a single continuous 1920x1200 dark, cinematic, editorial photograph
 * (`public/generated/dark-cinematic-editorial.jpg`) with rich nocturnal studio depth,
 * chiaroscuro golden window light, and botanical foliage across the entire frame.
 */
async function createDarkEditorialBg() {
  const W = 1920;
  const H = 1200;

  const studioPath = path.join(process.cwd(), 'public', 'generated', 'hero-studio-bg.jpg');
  const botanicalPath = path.join(process.cwd(), 'public', 'generated', 'botanical-leaves-dark.jpg');
  const villaPath = path.join(process.cwd(), 'public', 'generated', 'villa-courtyard.jpg');

  // 1. Nocturnal studio workspace base
  const studioRaw = await sharp(studioPath)
    .resize(W, H, { fit: 'cover' })
    .modulate({ brightness: 0.36, saturation: 0.65 })
    .linear(1.22, -12)
    .ensureAlpha()
    .raw()
    .toBuffer();

  // 2. Dark botanical leaves (right & upper center)
  const botanicalRaw = await sharp(botanicalPath)
    .resize(W, H, { fit: 'cover' })
    .modulate({ brightness: 1.05, saturation: 0.95 })
    .linear(1.18, -8)
    .ensureAlpha()
    .raw()
    .toBuffer();

  // 3. Subtle architectural courtyard texture for the center-left negative space
  const villaRaw = await sharp(villaPath)
    .resize(W, H, { fit: 'cover' })
    .modulate({ brightness: 0.3, saturation: 0.55 })
    .linear(1.15, -10)
    .ensureAlpha()
    .raw()
    .toBuffer();

  const outBuf = Buffer.alloc(W * H * 4);

  for (let y = 0; y < H; y++) {
    const ny = y / H;
    for (let x = 0; x < W; x++) {
      const nx = x / W;
      const idx = (y * W + x) * 4;

      const sr = studioRaw[idx];
      const sg = studioRaw[idx + 1];
      const sb = studioRaw[idx + 2];

      const br = botanicalRaw[idx];
      const bg = botanicalRaw[idx + 1];
      const bb = botanicalRaw[idx + 2];

      const vr = villaRaw[idx];
      const vg = villaRaw[idx + 1];
      const vb = villaRaw[idx + 2];

      // Blend center architectural detail so the middle of the wall has rich nocturnal texture
      const centerDist = Math.abs(nx - 0.42);
      const centerWeight = Math.max(0, 1 - centerDist * 2.4) * 0.48;

      const botWeight = Math.min(1, Math.max(0.28, (nx - 0.1) * 0.98));

      const r = Math.min(
        255,
        Math.round(sr * 0.72 + vr * centerWeight + br * 0.72 * botWeight)
      );
      const g = Math.min(
        255,
        Math.round(sg * 0.72 + vg * centerWeight + bg * 0.76 * botWeight)
      );
      const b = Math.min(
        255,
        Math.round(sb * 0.68 + vb * centerWeight + bb * 0.65 * botWeight)
      );

      outBuf[idx] = r;
      outBuf[idx + 1] = g;
      outBuf[idx + 2] = b;
      outBuf[idx + 3] = 255;
    }
  }

  const outPath = path.join(process.cwd(), 'public', 'generated', 'dark-cinematic-editorial.jpg');
  await sharp(outBuf, { raw: { width: W, height: H, channels: 4 } })
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
    .toFile(outPath);

  console.log('Updated public/generated/dark-cinematic-editorial.jpg');
}

createDarkEditorialBg().catch(console.error);
