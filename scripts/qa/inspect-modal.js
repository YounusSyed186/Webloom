const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3030');
  await page.waitForTimeout(1000);
  const btn = await page.$('header button:has-text("Get Started")');
  await btn.click();
  await page.waitForTimeout(500);

  const switchBtn = await page.$('button:has-text("Create one for free")');
  if (switchBtn) {
    await switchBtn.click();
    await page.waitForTimeout(500);
  }

  const modalText = await page.evaluate(() => {
    const dialog = document.querySelector('.fixed.inset-0.z-50');
    return dialog ? dialog.innerText : 'null';
  });
  console.log('--- SIGNUP MODAL TEXT ---');
  console.log(modalText);

  const inputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.fixed.inset-0.z-50 input')).map(i => ({
      id: i.id,
      placeholder: i.placeholder,
      type: i.type,
      name: i.name
    }));
  });
  console.log('Inputs in signup modal:', inputs);

  await browser.close();
})();
