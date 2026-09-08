import { chromium } from '@playwright/test';
import { createApp } from '../server/app.js';
import { mkdir } from 'node:fs/promises';
const server = createApp().listen(0, '127.0.0.1');
await new Promise(resolve => server.once('listening', resolve));
const browser = await chromium.launch();
await mkdir('test-results', { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'test-results/desktop-hero.png' });
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'test-results/desktop-about.png' });
  await page.setViewportSize({ width: 375, height: 850 });
  await page.locator('#home').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'test-results/mobile-hero.png' });
  console.log(JSON.stringify({ consoleErrors: errors, structuredData: await page.locator('script[type="application/ld+json"]').textContent() }));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
