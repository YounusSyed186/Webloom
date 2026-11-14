// tests/e2e/runner.js
// Master Autonomous Playwright Test Harness for Webloom E2E

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const { testAuthAndOnboarding } = require('./auth-and-onboarding.spec');
const { testCoreFeaturesCrud } = require('./core-features-crud.spec');
const { testLivePreviewSync } = require('./live-preview-sync.spec');
const { testResponsiveAndA11y } = require('./responsive-and-a11y.spec');

async function runAllE2ETests() {
  console.log('===========================================================');
  console.log('WEBLOOM: AUTONOMOUS END-TO-END (E2E) BROWSER TEST HARNESS');
  console.log('===========================================================');

  const baseUrl = 'http://localhost:3000';
  const screenshotsDir = path.join(__dirname, '..', '..', 'reports', 'webloom', 'screenshots', 'e2e');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const allResults = [];

  try {
    const authResults = await testAuthAndOnboarding(browser, baseUrl, screenshotsDir);
    allResults.push(...authResults);

    const crudResults = await testCoreFeaturesCrud(browser, baseUrl, screenshotsDir);
    allResults.push(...crudResults);

    const previewResults = await testLivePreviewSync(browser, baseUrl, screenshotsDir);
    allResults.push(...previewResults);

    const a11yResults = await testResponsiveAndA11y(browser, baseUrl, screenshotsDir);
    allResults.push(...a11yResults);
  } finally {
    await browser.close();
  }

  const total = allResults.length;
  const passed = allResults.filter(r => r.status === 'PASS').length;
  const failed = allResults.filter(r => r.status === 'FAIL').length;
  const passRate = ((passed / total) * 100).toFixed(1);

  console.log('===========================================================');
  console.log(`E2E TEST SUMMARY: ${passed}/${total} PASSED (${passRate}%) | ${failed} FAILED`);
  console.log('===========================================================');

  allResults.forEach((r, idx) => {
    console.log(`[${String(idx + 1).padStart(2, '0')}] ${r.test.padEnd(35)} : ${r.status} - ${r.details}`);
  });

  const resultsPath = path.join(__dirname, '..', '..', 'reports', 'webloom', 'e2e-test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify({ summary: { total, passed, failed, passRate }, results: allResults }, null, 2));
  console.log(`Results saved to ${resultsPath}`);
}

runAllE2ETests().catch(console.error);

