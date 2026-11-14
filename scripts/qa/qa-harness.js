const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.resolve(__dirname, '../../reports/screenshots');
const NETWORK_LOG_PATH = path.resolve(__dirname, '../../reports/network-errors.md');
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3030';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

class QAHarness {
  constructor(testName) {
    this.testName = testName;
    this.logs = [];
    this.networkErrors = [];
    this.consoleErrors = [];
    this.testResults = [];
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async setup(options = {}) {
    const { viewport = { width: 1440, height: 900 }, storageState = null } = options;
    this.browser = await chromium.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
    });

    this.context = await this.browser.newContext({
      viewport,
      storageState: storageState || undefined,
    });

    this.page = await this.context.newPage();

    this.page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        this.consoleErrors.push({ url: this.page.url(), text, time: new Date().toISOString() });
      }
    });

    this.page.on('pageerror', (err) => {
      this.consoleErrors.push({ url: this.page.url(), text: err.message, stack: err.stack, time: new Date().toISOString() });
    });

    this.page.on('response', (resp) => {
      const status = resp.status();
      const url = resp.url();
      if (status >= 400 && !url.includes('/favicon.ico')) {
        this.networkErrors.push({
          status,
          method: resp.request().method(),
          url,
          time: new Date().toISOString(),
        });
      }
    });
  }

  async captureScreenshot(filename) {
    const filePath = path.join(SCREENSHOT_DIR, filename);
    await this.page.screenshot({ path: filePath, fullPage: false });
    return filePath;
  }

  recordResult(feature, scenario, status, evidence, severity = 'Medium', notes = '') {
    const item = { feature, scenario, status, evidence, severity, notes, time: new Date().toISOString() };
    this.testResults.push(item);
    console.log(`[${status}] [${feature}] ${scenario}: ${notes || evidence}`);
  }

  async teardown() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  appendNetworkLog() {
    let content = `\n### Test Suite: ${this.testName} (${new Date().toISOString()})\n\n`;
    if (this.networkErrors.length === 0 && this.consoleErrors.length === 0) {
      content += `*No network or console errors recorded.*\n\n`;
    } else {
      if (this.networkErrors.length > 0) {
        content += `#### Network Responses (>= 400)\n`;
        content += `| Status | Method | URL | Time |\n|---|---|---|---|\n`;
        for (const err of this.networkErrors) {
          content += `| ${err.status} | ${err.method} | \`${err.url}\` | ${err.time} |\n`;
        }
        content += `\n`;
      }
      if (this.consoleErrors.length > 0) {
        content += `#### Console Errors\n`;
        for (const c of this.consoleErrors) {
          content += `- **[${c.time}]** on \`${c.url}\`: \`${c.text}\`\n`;
        }
        content += `\n`;
      }
    }
    fs.appendFileSync(NETWORK_LOG_PATH, content, 'utf8');
  }
}

module.exports = { QAHarness, SCREENSHOT_DIR, NETWORK_LOG_PATH, BASE_URL };
