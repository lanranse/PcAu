const driver = require('./Driver.js');
const MainPage = require('./MainPage.js');
const MallPage = require('./MallPage.js');
const {test, expect } = require('playwright/test');
const path = require('path');
const fs = require('fs');


test.describe('test suite 1', () => {
    let mainPage;
    let mallPage;

    test.beforeAll(async () => {
        await driver.init()
        mainPage = new MainPage(driver.page);
        mallPage = new MallPage(driver.page);
    })

    test.afterAll(async () => {
        await driver.close();
    })

    test('test case 1', async () => {
        console.log('case1-step1:打开商城，对比1，对比2');
        await mainPage.openMall();
        await expect(driver.page).toHaveScreenshot('mallPage-1.png',{maxDiffPixels:2000})
        await driver.page.evaluate(() => {
          const malls = document.getElementsByClassName('setting-page-main theme-scroll-bar');
          if (malls.length > 0) {
              malls[0].scrollTo(0, 500);
          }});

        // await driver.page.waitForTimeout(3000)
        await expect(driver.page).toHaveScreenshot('mallPage-2.png',{maxDiffPixels:1000})
    });

    test('test case 2', async () => {
        console.log('case1-step2:商详页')
        await driver.page.keyboard.press('Escape')
        await driver.page.keyboard.press('Escape')
        await mainPage.openMall();
        await driver.page.evaluate(() => {
            const malls = document.getElementsByClassName('setting-page-main theme-scroll-bar');
            if (malls.length > 0) {
                malls[0].scrollTo(0, 500);
            }});
        //打开 不想上班 商详页
        await mallPage.clickProductBuXiangShangBan()
        const element = await mallPage.Product_detail_Locate();
        // 使用 Playwright 的 expect 进行像素对比
        await expect(element).toHaveScreenshot('Suite1Case2Expect.png');

        await mallPage.clickToBuy();
        const element2 = await mallPage.Product_detail_Locate();
        await expect(element2).toHaveScreenshot('Suite2Case2ToBuyExpect.png',{maxDiffPixels:2000});


    })
});




