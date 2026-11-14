/**
 * Generates the complete art-directed Dark Webloom Asset Library in `public/generated/dark/`
 * with 100% spatial & compositional alignment to the original light assets and
 * continuous, seam-free smoothstep/Gaussian relighting.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC_DIR = path.join(__dirname, '..', 'public', 'generated');
const OUT_DIR = path.join(SRC_DIR, 'dark');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function clamp(v, min = 0, max = 255) {
  return Math.max(min, Math.min(max, Math.round(v)));
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function mix(a, b, t) {
  return a * (1 - t) + b * t;
}

/**
 * 1. HERO STUDIO BACKGROUND -> Nighttime Creative Studio (`hero-studio-bg-dark.jpg`)
 *    Uses continuous Gaussian light fields & smoothstep color weights (zero hard seams).
 */
async function generateHeroStudioDark() {
  const inputPath = path.join(SRC_DIR, 'hero-studio-bg.jpg');
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(data.length);

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // 1. Base nocturnal studio tone (charcoal-espresso wall & dark walnut desk)
      const baseCurve = Math.pow(lum, 1.48);
      // Smooth vertical warmth transition onto the wooden desk at the bottom
      const deskWarmth = smoothstep(0.78, 0.90, ny);
      let nr = 19 + baseCurve * (34 + deskWarmth * 24) + (r - b) * 0.08;
      let ng = 16 + baseCurve * (28 + deskWarmth * 14);
      let nb = 14 + baseCurve * (24 + deskWarmth * 4);

      // 2. Smooth exterior moonlight in the left arched window (smooth Gaussian spatial falloff + bright daylight mask)
      const windowSpatial =
        smoothstep(0.25, 0.14, nx) * smoothstep(0.84, 0.68, ny);
      const windowBright = smoothstep(0.42, 0.68, lum);
      const windowWeight = windowSpatial * windowBright;
      if (windowWeight > 0.001) {
        const moonCurve = Math.pow(lum, 1.25);
        const mr = 16 + moonCurve * 34;
        const mg = 28 + moonCurve * 54;
        const mb = 42 + moonCurve * 78;
        nr = mix(nr, mr, windowWeight);
        ng = mix(ng, mg, windowWeight);
        nb = mix(nb, mb, windowWeight);
      }

      // 3. Smooth botanical foliage tint (ivy on left & houseplant on right)
      const greenExcess = (g - Math.max(r, b)) / 255;
      const foliageWeight = smoothstep(0.02, 0.14, greenExcess);
      if (foliageWeight > 0.001) {
        const leafLum = Math.pow(lum, 1.2);
        const lr = 18 + leafLum * 38;
        const lg = 28 + leafLum * 58;
        const lb = 20 + leafLum * 34;
        nr = mix(nr, lr, foliageWeight * 0.85);
        ng = mix(ng, lg, foliageWeight * 0.85);
        nb = mix(nb, lb, foliageWeight * 0.85);
      }

      // 4. Warm Amber Mushroom Lamp Glow (continuous 2D Gaussian centered on the lamp at nx=0.172, ny=0.72)
      const dxCore = (nx - 0.172) / 0.055;
      const dyCore = (ny - 0.72) / 0.085;
      const lampCore = Math.exp(-0.5 * (dxCore * dxCore + dyCore * dyCore));

      const dxAmbient = (nx - 0.185) / 0.19;
      const dyAmbient = (ny - 0.76) / 0.17;
      const lampAmbient = Math.exp(
        -0.5 * (dxAmbient * dxAmbient + dyAmbient * dyAmbient)
      );

      // Warmness of the physical lamp glass in the original image
      const lampGlassWarmth = smoothstep(0.08, 0.32, (r - b) / 255) * smoothstep(0.45, 0.75, lum);
      const directLampShade = lampCore * (0.45 + 0.55 * lampGlassWarmth);

      nr += directLampShade * 155 + lampAmbient * (0.3 + 0.7 * lum) * 58;
      ng += directLampShade * 102 + lampAmbient * (0.3 + 0.7 * lum) * 36;
      nb += directLampShade * 38 + lampAmbient * (0.3 + 0.7 * lum) * 12;

      out[idx] = clamp(nr);
      out[idx + 1] = clamp(ng);
      out[idx + 2] = clamp(nb);
      if (channels === 4) out[idx + 3] = data[idx + 3];
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .jpeg({ quality: 92 })
    .toFile(path.join(OUT_DIR, 'hero-studio-bg-dark.jpg'));
  console.log('Generated dark/hero-studio-bg-dark.jpg');
}

/**
 * 2. SCRAPBOOK & TEMPLATE PHOTOGRAPHS -> Seam-Free Nocturnal Counterparts
 */
async function generateNocturnalPhoto(filename, outFilename, mode) {
  const inputPath = path.join(SRC_DIR, filename);
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(data.length);

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      let nr = r;
      let ng = g;
      let nb = b;

      if (mode === 'mountain') {
        const curve = Math.pow(lum, 1.35);
        nr = 14 + curve * 52;
        ng = 22 + curve * 74;
        nb = 36 + curve * 108;
      } else if (mode === 'sunset') {
        const horizonGlow = Math.exp(-Math.pow((ny - 0.54) / 0.22, 2));
        const curve = Math.pow(lum, 1.3);
        nr = 18 + curve * (58 + horizonGlow * 88) + (r - b) * 0.22;
        ng = 15 + curve * (38 + horizonGlow * 48);
        nb = 28 + curve * (64 - horizonGlow * 14);
      } else if (mode === 'coastal') {
        // Nighttime Mediterranean coastal village with smooth warm golden harbor glow along the cliffside buildings
        const curve = Math.pow(lum, 1.38);
        const villageGlow =
          Math.exp(
            -0.5 *
              (Math.pow((nx - 0.36) / 0.24, 2) + Math.pow((ny - 0.44) / 0.18, 2))
          ) *
          smoothstep(0.38, 0.78, lum) *
          smoothstep(-0.02, 0.12, (r - b) / 255);

        nr = 14 + curve * 56 + villageGlow * 115;
        ng = 22 + curve * 68 + villageGlow * 74;
        nb = 34 + curve * 92 + villageGlow * 22;
      } else if (mode === 'villa') {
        // Nighttime Mediterranean Villa Courtyard with smooth Gaussian lantern light under the colonnade arches
        const curve = Math.pow(lum, 1.34);
        const lanternGaussian = Math.exp(
          -0.5 *
            (Math.pow((nx - 0.65) / 0.22, 2) + Math.pow((ny - 0.58) / 0.18, 2))
        );
        const warmStoneWeight =
          lanternGaussian *
          smoothstep(0.38, 0.76, lum) *
          smoothstep(0.0, 0.16, (r - b) / 255);

        nr = 16 + curve * 54 + warmStoneWeight * 125;
        ng = 22 + curve * 64 + warmStoneWeight * 82;
        nb = 32 + curve * 82 + warmStoneWeight * 28;
      } else if (mode === 'landscape') {
        const curve = Math.pow(lum, 1.32);
        nr = 14 + curve * 54;
        ng = 24 + curve * 78;
        nb = 32 + curve * 96;
      } else if (mode === 'monogram') {
        const inv = 1 - lum;
        const letterMask = smoothstep(0.35, 0.75, inv);
        const grain = (lum - 0.85) * 36;
        const paperR = 68 + grain;
        const paperG = 48 + grain;
        const paperB = 56 + grain;
        nr = paperR * (1 - letterMask) + 248 * letterMask;
        ng = paperG * (1 - letterMask) + 236 * letterMask;
        nb = paperB * (1 - letterMask) + 224 * letterMask;
      } else if (mode === 'daisy') {
        const curve = Math.pow(lum, 1.18);
        const yellowWeight =
          smoothstep(0.15, 0.45, (r - b) / 255) * smoothstep(0.35, 0.65, lum);
        const baseR = 14 + curve * 150;
        const baseG = 18 + curve * 158;
        const baseB = 16 + curve * 145;
        const goldR = 48 + curve * 195;
        const goldG = 34 + curve * 145;
        const goldB = 14 + curve * 52;
        nr = mix(baseR, goldR, yellowWeight);
        ng = mix(baseG, goldG, yellowWeight);
        nb = mix(baseB, goldB, yellowWeight);
      } else if (mode === 'wave') {
        const curve = Math.pow(lum, 1.12);
        nr = 12 + curve * 195 + (r - b) * 0.25;
        ng = 12 + curve * 135;
        nb = 16 + curve * 78;
      } else if (mode === 'botanical-night') {
        const curve = Math.pow(lum, 1.08);
        nr = 14 + curve * 128 + g * 0.12;
        ng = 17 + curve * 118 + g * 0.08;
        nb = 14 + curve * 76;
      }

      out[idx] = clamp(nr);
      out[idx + 1] = clamp(ng);
      out[idx + 2] = clamp(nb);
      if (channels === 4) out[idx + 3] = data[idx + 3];
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .jpeg({ quality: 92 })
    .toFile(path.join(OUT_DIR, outFilename));
  console.log(`Generated dark/${outFilename}`);
}

/**
 * 3. HANDMADE COTTON-RAG DECKLE-EDGE PAPER CARDS -> Dark Editorial Paper Counterparts (PNG with Alpha)
 */
async function generateDarkDeckleCard(filename, outFilename, palette) {
  const inputPath = path.join(SRC_DIR, filename);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
      continue;
    }

    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const grainDelta = (lum - 0.84) * 64;
    const edgeRim = a < 250 ? (1 - a / 255) * 68 : 0;

    out[i] = clamp(palette.r + grainDelta + edgeRim);
    out[i + 1] = clamp(palette.g + grainDelta + edgeRim);
    out[i + 2] = clamp(palette.b + grainDelta + edgeRim);
    out[i + 3] = a;
  }

  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, outFilename));
  console.log(`Generated dark/${outFilename}`);
}

/**
 * 4. FINALE HANDMADE LAVENDER BOTANICAL BANNER -> Seam-Free Nocturnal Dusty-Plum Banner
 */
async function generateDarkLavenderRibbon() {
  const inputPath = path.join(SRC_DIR, 'lavender-ribbon-clean.png');
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(data.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a === 0) {
        out[idx] = 0;
        out[idx + 1] = 0;
        out[idx + 2] = 0;
        out[idx + 3] = 0;
        continue;
      }

      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const grainDelta = (lum - 0.82) * 58;
      const edgeRim = a < 245 ? (1 - a / 255) * 34 : 0;

      // Base nocturnal dusty-plum handmade paper (#2A2134)
      let nr = 42 + grainDelta + edgeRim;
      let ng = 33 + grainDelta + edgeRim;
      let nb = 52 + grainDelta + edgeRim;

      // Continuous botanical & tape feature weights (zero spatial cutoff lines)
      // 1. Green stem & leaves: green exceeds blue
      const greenStemWeight =
        smoothstep(-2, 14, g - b) * smoothstep(0.76, 0.42, lum);
      if (greenStemWeight > 0.001) {
        nr = mix(nr, 62 + lum * 68, greenStemWeight);
        ng = mix(ng, 96 + lum * 88, greenStemWeight);
        nb = mix(nb, 58 + lum * 54, greenStemWeight);
      }

      // 2. Warm masking tape strip: warm yellow-beige where both R and G exceed B
      const tapeWeight =
        smoothstep(4, 18, (r + g) * 0.5 - b) * smoothstep(0.58, 0.78, lum);
      if (tapeWeight > 0.001) {
        nr = mix(nr, 124 + grainDelta * 0.6, tapeWeight);
        ng = mix(ng, 104 + grainDelta * 0.6, tapeWeight);
        nb = mix(nb, 74 + grainDelta * 0.6, tapeWeight);
      }

      // 3. Pressed wildflower blossoms: darker rose-crimson buds at the top of the stem
      const blossomWeight =
        smoothstep(10, 28, r - g) * smoothstep(0.68, 0.38, lum);
      if (blossomWeight > 0.001) {
        nr = mix(nr, 188 + lum * 55, blossomWeight);
        ng = mix(ng, 108 + lum * 50, blossomWeight);
        nb = mix(nb, 134 + lum * 55, blossomWeight);
      }

      out[idx] = clamp(nr);
      out[idx + 1] = clamp(ng);
      out[idx + 2] = clamp(nb);
      out[idx + 3] = a;
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'lavender-ribbon-dark.png'));
  console.log('Generated dark/lavender-ribbon-dark.png');
}

/**
 * 5. AUDIENCE HOME WATERCOLOR COUNTRYSIDE DIORAMA -> Seam-Free Nighttime Watercolor Countryside
 *    Uses continuous color weights + smooth Gaussian warm window light at the cottage (nx=0.11, ny=0.80).
 */
function transformLandscapePixel(r, g, b, nx, ny) {
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const maxC = Math.max(r, g, b);
  const minC = Math.min(r, g, b);
  const sat = (maxC - minC) / 255;

  // 1. Smooth Gaussian around the cottage on the left hill (centered at nx=0.12, ny=0.80)
  //    Prevents the bright sunlit right gable wall of the cottage from being classified as sky
  const dxCottageWall = (nx - 0.122) / 0.048;
  const dyCottageWall = (ny - 0.805) / 0.058;
  const cottageWallProtect = Math.min(
    1,
    Math.exp(-0.5 * (dxCottageWall * dxCottageWall + dyCottageWall * dyCottageWall)) * 1.6
  );

  // Sky / cream background weight: continuous function of high luminance & low saturation
  const skyWeight =
    smoothstep(0.66, 0.84, lum) *
    smoothstep(0.24, 0.08, sat) *
    (1 - cottageWallProtect);

  // Sky color: blends smoothly from #161310 deep charcoal at top to #1B2129 midnight slate near hills
  const skyGrad = smoothstep(0.0, 0.65, ny);
  const cloudDelta = (lum - 0.90) * 26;
  const skyR = mix(22, 26, skyGrad) + cloudDelta;
  const skyG = mix(19, 31, skyGrad) + cloudDelta;
  const skyB = mix(16, 39, skyGrad) + cloudDelta;

  // 2. Landscape (hills, trees, meadow, cottage) color:
  const hillCurve = Math.pow(lum, 1.28);
  const greenTint = Math.max(0, (g - r) / 255);
  const redTerracotta = Math.max(0, (r - g) / 255);

  let landR = 18 + hillCurve * 44 + redTerracotta * 115;
  let landG = 24 + hillCurve * 58 + greenTint * 32 + redTerracotta * 34;
  let landB = 21 + hillCurve * 46 + greenTint * 14;

  // 3. Smooth Gaussian warm candlelight glow around the cottage on the left hill (centered at nx=0.11, ny=0.80)
  const dxHouse = (nx - 0.108) / 0.048;
  const dyHouse = (ny - 0.80) / 0.065;
  const houseGlow = Math.exp(-0.5 * (dxHouse * dxHouse + dyHouse * dyHouse));

  // Inside the cottage wall region, the dark window panes (lower luminance surrounded by cottage) glow warm amber!
  const dxWin = (nx - 0.105) / 0.032;
  const dyWin = (ny - 0.815) / 0.038;
  const winSpatial = Math.exp(-0.5 * (dxWin * dxWin + dyWin * dyWin));
  const winPaneMask =
    winSpatial * smoothstep(0.58, 0.36, lum) * smoothstep(0.18, 0.28, lum);

  landR += houseGlow * 48 + winPaneMask * 195;
  landG += houseGlow * 30 + winPaneMask * 135;
  landB += houseGlow * 10 + winPaneMask * 35;

  const nr = mix(landR, skyR, skyWeight);
  const ng = mix(landG, skyG, skyWeight);
  const nb = mix(landB, skyB, skyWeight);

  return [clamp(nr), clamp(ng), clamp(nb)];
}

async function generateDarkAudienceDiorama() {
  // 5A. Base Panoramic Landscape (`audience-hills-dark.jpg`)
  {
    const inputPath = path.join(SRC_DIR, 'audience-hills-authentic.jpg');
    const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const out = Buffer.alloc(data.length);

    for (let y = 0; y < height; y++) {
      const ny = y / height;
      for (let x = 0; x < width; x++) {
        const nx = x / width;
        const idx = (y * width + x) * channels;
        const [nr, ng, nb] = transformLandscapePixel(
          data[idx],
          data[idx + 1],
          data[idx + 2],
          nx,
          ny
        );
        out[idx] = nr;
        out[idx + 1] = ng;
        out[idx + 2] = nb;
        if (channels === 4) out[idx + 3] = data[idx + 3];
      }
    }

    await sharp(out, { raw: { width, height, channels } })
      .jpeg({ quality: 92 })
      .toFile(path.join(OUT_DIR, 'audience-hills-dark.jpg'));
    console.log('Generated dark/audience-hills-dark.jpg');
  }

  // 5B & 5C. Midground Cottage Cutout & Foreground Right Grove Cutout
  for (const cutoutName of ['diorama-cottage-cutout.png', 'diorama-right-grove-cutout.png']) {
    const inputPath = path.join(SRC_DIR, cutoutName);
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const out = Buffer.alloc(data.length);

    for (let y = 0; y < height; y++) {
      const ny = y / height;
      for (let x = 0; x < width; x++) {
        const nx = x / width;
        const idx = (y * width + x) * channels;
        const a = data[idx + 3];
        if (a === 0) {
          out[idx] = 0;
          out[idx + 1] = 0;
          out[idx + 2] = 0;
          out[idx + 3] = 0;
          continue;
        }
        const [nr, ng, nb] = transformLandscapePixel(
          data[idx],
          data[idx + 1],
          data[idx + 2],
          nx,
          ny
        );
        out[idx] = nr;
        out[idx + 1] = ng;
        out[idx + 2] = nb;
        out[idx + 3] = a;
      }
    }

    const outName = cutoutName.replace('.png', '-dark.png');
    await sharp(out, { raw: { width, height, channels } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT_DIR, outName));
    console.log(`Generated dark/${outName}`);
  }
}

async function main() {
  await generateHeroStudioDark();
  await generateNocturnalPhoto('photo-mountain.jpg', 'photo-mountain-dark.jpg', 'mountain');
  await generateNocturnalPhoto('photo-sunset.jpg', 'photo-sunset-dark.jpg', 'sunset');
  await generateNocturnalPhoto('photo-coastal.jpg', 'photo-coastal-dark.jpg', 'coastal');
  await generateNocturnalPhoto('villa-courtyard.jpg', 'villa-courtyard-dark.jpg', 'villa');
  await generateNocturnalPhoto('thumb-landscape.jpg', 'thumb-landscape-dark.jpg', 'landscape');
  await generateNocturnalPhoto('thumb-monogram.jpg', 'thumb-monogram-dark.jpg', 'monogram');
  await generateNocturnalPhoto('thumb-daisy.jpg', 'thumb-daisy-dark.jpg', 'daisy');
  await generateNocturnalPhoto('thumb-wave.jpg', 'thumb-wave-dark.jpg', 'wave');
  await generateNocturnalPhoto('botanical-leaves-dark.jpg', 'botanical-leaves-night.jpg', 'botanical-night');

  await generateDarkDeckleCard('card-sage-hd.png', 'card-sage-dark.png', { r: 68, g: 98, b: 80 });
  await generateDarkDeckleCard('card-peach-hd.png', 'card-peach-dark.png', { r: 118, g: 78, b: 66 });
  await generateDarkDeckleCard('card-lavender-hd.png', 'card-lavender-dark.png', { r: 96, g: 76, b: 110 });
  await generateDarkDeckleCard('card-sand-hd.png', 'card-sand-dark.png', { r: 104, g: 88, b: 68 });
  await generateDarkLavenderRibbon();
  await generateDarkAudienceDiorama();

  console.log('All 18 seam-free Dark Webloom assets generated successfully in public/generated/dark/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
