import { Page, expect } from '@playwright/test';
import m from 'gm';

export async function expandSideNav(page: Page) {
  const sideNav = page.locator('[aria-label="Side Navigation"]');
  if (await sideNav.getAttribute('data-test-hook') === "side-nav-collapsed") {
    // Click [aria-label="Side Navigation"] button
    await page.locator('[aria-label="Side Navigation"] button').click({delay: 500});
  }
  await expect(sideNav).toHaveAttribute('data-test-hook', 'side-nav-expanded');
}

export async function hideTemplateList(page: Page) {
  const showTemplates = page.locator('[aria-label="View Devices Devices"]');
  if (await showTemplates.getAttribute('title') === 'Collapse') {
    // Click [aria-label="View Devices Devices"]
    await showTemplates.click({delay: 500});
  }
  await expect(showTemplates).toHaveAttribute('title', 'Expand');
}

export async function drawRectangleOnImage(inputImage: string, outputImage: string, x0: number, y0: number, x1: number, y1: number) {
	return new Promise(function(resolve, reject) {
		m.subClass({imageMagick: true})(inputImage).stroke('red',4).fill('none')
      .drawRectangle(x0,y0,x1,y1)
			.write(outputImage, err => {
				if (err) {
					reject(err);
				} else {
					resolve(outputImage);
				}
			});
	});
};