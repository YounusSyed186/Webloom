const sharp = require('sharp');
const path = require('path');

async function analyzeSections() {
  const refPath = path.join(process.cwd(), 'public', 'reference-1024x1536.png');
  const renPath = path.join(process.cwd(), 'public', 'comparison', 'current-render.png');

  const refBuffer = await sharp(refPath).raw().toBuffer({ resolveWithObject: true });
  const renBuffer = await sharp(renPath).raw().toBuffer({ resolveWithObject: true });

  const refData = refBuffer.data;
  const renData = renBuffer.data;

  const sections = [
    { name: 'Navbar (0..65)', startY: 0, endY: 65 },
    { name: 'Hero Section (65..625)', startY: 65, endY: 625 },
    { name: 'Trust Strip (625..720)', startY: 625, endY: 720 },
    { name: 'What You Can Build (720..980)', startY: 720, endY: 980 },
    { name: 'Designs Feel Like You (980..1230)', startY: 980, endY: 1230 },
    { name: 'Audience / Home (1230..1420)', startY: 1230, endY: 1420 },
    { name: 'Bottom Ribbon (1420..1536)', startY: 1420, endY: 1536 },
  ];

  const w = 1024;
  const ch = 3;

  for (const sec of sections) {
    let diffCount = 0;
    const total = w * (sec.endY - sec.startY);
    for (let y = sec.startY; y < sec.endY; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * ch;
        const dR = Math.abs(refData[idx] - renData[idx]);
        const dG = Math.abs(refData[idx+1] - renData[idx+1]);
        const dB = Math.abs(refData[idx+2] - renData[idx+2]);
        if ((dR + dG + dB) / 3 > 25) {
          diffCount++;
        }
      }
    }
    const pct = ((diffCount / total) * 100).toFixed(2);
    console.log(`${sec.name}: ${pct}% diff`);
  }
}

analyzeSections().catch(console.error);

