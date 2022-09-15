import { test, expect, ElementHandle } from '@playwright/test';
import {drawRectangleOnImage, expandSideNav, hideTemplateList} from '../utils';
import m, { State, ChannelType } from 'gm';

// test.use({headless: false, launchOptions: {slowMo: 1000}});
// test.use({headless: false});

test('Capture first half of IoT Central quickstart #1', async ({ page }) => {
  await page.goto('/devices');
  await page.setViewportSize({ width: 1200, height: 800 });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/.*Contoso.*/);

  expandSideNav(page);

  hideTemplateList(page);

  await expect(page.locator('[aria-label="New"]')).toBeVisible();
  await page.screenshot({ path: 'screenshots/home-page.png' });

  // Click [aria-label="New"]
  await page.locator('[aria-label="New"]').click();
  // Fill [aria-label="Device name "]
  await page.locator('[aria-label="Device name "]').fill('vpjobceufy');
  // Fill [aria-label="Device ID "]
  await page.locator('[aria-label="Device ID "]').fill('vpjobceufy');
  // Click [aria-label="Create a new device with the given settings"]
  await page.locator('[aria-label="Create a new device with the given settings"]').click({delay: 500});

  await expect(page.locator('span[role="button"]:has-text("Device name")')).toBeVisible();
  await page.screenshot({ path: 'screenshots/device-list.png' });

  // Click [aria-label="Grid content"] a:has-text("vpjobceufy")
  await page.locator('[aria-label="Grid content"] a:has-text("vpjobceufy")').click();
  await expect(page).toHaveURL('/devices/details/vpjobceufy/rawdata');
  // Click [aria-label="Connect"]
  await page.locator('[aria-label="Connect"]').click();
  // Click button[role="tab"]:has-text("QR code")
  await page.locator('button[role="tab"]:has-text("QR code")').click();


  await expect(page.locator('button[role="tab"]:has-text("QR code")')).toHaveClass(/.*is-selected.*/);
  await page.screenshot({ path: 'screenshots/qr-code.png' });

  const handle = await page.$('text=QR code');

  if (handle !== null){
    const box = await handle.boundingBox();
    console.log(box);
    if (box  !== null){
      await drawRectangleOnImage('screenshots/qr-code.png', 'screenshots/qr-code.png', box.x - 5, box.y - 5, box.x + box.width + 5, box.y + box.height + 5);
    }
  }

  await expect(page.locator('button[role="tab"]:has-text("QR code")')).toHaveClass(/.*is-selected.*/);
});

async function processScreenshot() {
  m.subClass({imageMagick: true})('screenshots\\qr-code.png').drawRectangle(230,240,300,300).write('screenshots\\qr-code-2.png', err => {
    if (err) console.log(err);
    console.log('Success!!');
  });
}