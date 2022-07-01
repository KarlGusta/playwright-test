const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
        dir: `videos`
    }
  });

  // Open new page
  const page = await context.newPage();

  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');

  // Click text=Wikipedia The Free Encyclopedia English 6 458 000+ articles 日本語 1 314 000+ 記事 Ру
  await page.locator('text=Wikipedia The Free Encyclopedia English 6 458 000+ articles 日本語 1 314 000+ 記事 Ру').click();

  // Click strong:has-text("English")
  await page.locator('strong:has-text("English")').click();
  await page.waitForURL('https://en.wikipedia.org/wiki/Main_Page');

  // Click text=Contents
  await page.locator('text=Contents').click();
  await page.waitForURL('https://en.wikipedia.org/wiki/Wikipedia:Contents');

  await page.screenshot({ path: `wiki_screen.png` })

  // ---------------------
  await context.close();
  await browser.close();
})();