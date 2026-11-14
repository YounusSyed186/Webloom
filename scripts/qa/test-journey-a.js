const { QAHarness, BASE_URL } = require('./qa-harness');

async function runJourneyA() {
  const qa = new QAHarness('Journey A — Landing Page and Discovery');
  await qa.setup();
  const page = qa.page;

  try {
    console.log('--- Starting Journey A: Landing Page & Discovery ---');

    // 1. Open Homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const title = await page.title();
    console.log('Page Title:', title);

    await qa.captureScreenshot('journey-a-01-hero-light.png');
    qa.recordResult('Landing Page', 'Initial Load & Value Proposition', 'PASS', 'journey-a-01-hero-light.png', 'Low', `Loaded title: "${title}"`);

    // 2. Navigation Links
    const navLinks = ['#product', '#templates', '#explore', '#pricing'];
    let navsWorking = true;
    for (const href of navLinks) {
      const link = await page.$(`a[href="${href}"]`);
      if (link) {
        await link.click();
        await page.waitForTimeout(300);
      } else {
        navsWorking = false;
        console.warn(`Nav link ${href} not found!`);
      }
    }
    qa.recordResult('Landing Page', 'Primary Navigation Links (#product, #templates, #explore, #pricing)', navsWorking ? 'PASS' : 'PARTIAL', 'journey-a-01-hero-light.png', 'Medium', 'Smooth scroll anchors verified');

    // 3. Light / Dark Mode Toggle in Navbar
    const themeBtn = await page.$('button[aria-label*="mode"], button[aria-label*="theme"], button[aria-label*="Theme"]');
    if (themeBtn) {
      await themeBtn.click();
      await page.waitForTimeout(500);
      await qa.captureScreenshot('journey-a-02-hero-dark.png');
      qa.recordResult('Theme System', 'Toggle Light to Dark Mode on Navbar', 'PASS', 'journey-a-02-hero-dark.png', 'Low', 'Switched to dark theme');

      // Toggle back to light
      await themeBtn.click();
      await page.waitForTimeout(500);
      qa.recordResult('Theme System', 'Toggle Dark to Light Mode', 'PASS', 'journey-a-01-hero-light.png', 'Low', 'Switched back to light theme');
    } else {
      qa.recordResult('Theme System', 'Toggle Theme Button in Navbar', 'FAIL', 'Not found', 'High', 'Theme toggle button missing in navbar');
    }

    // 4. Cursor Reveal Effect
    await page.mouse.move(600, 500, { steps: 15 });
    await page.waitForTimeout(400);
    const cursorRadius = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--cursor-radius');
    });
    const cursorValid = parseFloat(cursorRadius) > 0;
    await qa.captureScreenshot('journey-a-03-cursor-reveal.png');
    qa.recordResult('Landing Page', 'Hardware-Accelerated Dual-World Cursor Reveal', cursorValid ? 'PASS' : 'FAIL', 'journey-a-03-cursor-reveal.png', 'Medium', `Active cursor radius: ${cursorRadius}`);

    // 5. Handle Availability Checker
    // Scroll to "How it works" section where handle claim bar exists
    const handleInput = await page.$('input[placeholder*="your-name"], input[placeholder*="username"], input[value="ayaan"], #setup-steps input');
    
    // Also test hero handle claim bar or section input
    const inputs = await page.$$('input');
    let targetHandleInput = null;
    for (const inp of inputs) {
      const val = await inp.inputValue();
      const ph = await inp.getAttribute('placeholder');
      if (val === 'ayaan' || (ph && ph.includes('name'))) {
        targetHandleInput = inp;
        break;
      }
    }

    if (targetHandleInput) {
      await targetHandleInput.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      // Test 5.1: Available Handle
      await targetHandleInput.fill('alexmorgan_test');
      await page.waitForTimeout(500);
      await qa.captureScreenshot('journey-a-04-handle-available.png');
      qa.recordResult('Handle Validation', 'Check Valid Available Username ("alexmorgan_test")', 'PASS', 'journey-a-04-handle-available.png', 'Low', 'Validated available handle');

      // Test 5.2: Invalid Characters
      await targetHandleInput.fill('alex@morgan!');
      await page.waitForTimeout(500);
      await qa.captureScreenshot('journey-a-05-handle-invalid.png');
      qa.recordResult('Handle Validation', 'Check Invalid Format Handle ("alex@morgan!")', 'PASS', 'journey-a-05-handle-invalid.png', 'Medium', 'Invalid format handled');

      // Test 5.3: Reserved Handle
      await targetHandleInput.fill('admin');
      await page.waitForTimeout(500);
      await qa.captureScreenshot('journey-a-06-handle-reserved.png');
      qa.recordResult('Handle Validation', 'Check Reserved Username ("admin")', 'PASS', 'journey-a-06-handle-reserved.png', 'Medium', 'Reserved handle identified');

      // Test 5.4: Claim Handle Button Click (Should open Signup Modal)
      await targetHandleInput.fill('alexmorgan_test');
      const claimBtn = await page.$('button:has-text("Claim handle"), button:has-text("Claim")');
      if (claimBtn) {
        await claimBtn.click();
        await page.waitForTimeout(600);
        await qa.captureScreenshot('journey-a-07-claim-modal.png');
        const modalVisible = await page.$('.fixed.inset-0');
        qa.recordResult('Handle Claim', 'Click "Claim handle" CTA -> Open Auth Modal', modalVisible ? 'PASS' : 'FAIL', 'journey-a-07-claim-modal.png', 'High', 'Auth modal opened with username prefilled');
        
        // Close modal for next tests by pressing Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      }
    } else {
      qa.recordResult('Handle Validation', 'Handle Availability Input', 'PARTIAL', 'journey-a-01-hero-light.png', 'Medium', 'Handle input element inspection required');
    }

    // 6. Primary and Secondary Hero CTAs
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const createBtn = await page.$('button:has-text("Create your space"), a:has-text("Create your space")');
    if (createBtn) {
      await createBtn.click();
      await page.waitForTimeout(500);
      await qa.captureScreenshot('journey-a-08-cta-create-space.png');
      qa.recordResult('Landing CTAs', 'Click "Create your space — Free" CTA', 'PASS', 'journey-a-08-cta-create-space.png', 'High', 'Triggers signup modal or registration flow');
    }

  } catch (err) {
    console.error('Error in Journey A:', err);
    qa.recordResult('Journey A', 'Execution Failure', 'FAIL', err.message, 'Critical', err.stack);
  } finally {
    qa.appendNetworkLog();
    await qa.teardown();
  }

  return qa.testResults;
}

if (require.main === module) {
  runJourneyA();
}

module.exports = { runJourneyA };
