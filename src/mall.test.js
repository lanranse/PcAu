const driver = require('./Driver.js');
const MainPage = require('./MainPage.js');
const { expect } = require('playwright/test');

describe('Test Suite 1', () => {
    let mainPage;
    jest.setTimeout(60000);

    beforeAll(async () => {
        jest.setTimeout(30000);
        await driver.init()
        mainPage = new MainPage(driver.page);
    })

    afterAll(async () => {
        await driver.close();
    })

    it('Tese Case 1', async () => {
        console.log('open mall and screenshot');
        await mainPage.openMall();
        await driver.page.evaluate(() => {
          const malls = document.getElementsByClassName('setting-page-main theme-scroll-bar');
          if (malls.length > 0) {
              malls[0].scrollTo(0, 500);
          }});

        await driver.page.waitForTimeout(3000)
        // await driver.page.screenshot({path:'mallPage.png', fullPage: true});
        await expect(driver.page).toHaveScreenshot('mallPage.png',{fullPage: true})


    })
});




