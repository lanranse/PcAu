const driver = require('../tools/Driver.js');
const MainPage = require('../pages/MainPage.js');
const MallPage = require('../pages/MallPage.js');
const FindsPage = require('../pages/FindsPage.js');
const {test, expect } = require('playwright/test');
const path = require('path');
const fs = require('fs');


test.describe('TestSuite广告', () => {
  let mainPage;

  test.beforeAll(async () => {
    await driver.init()
    mainPage = new MainPage(driver.page);
  })

  test.afterAll(async () => {
    await driver.close();
  })

  test('test case ad-1', async ({}, testInfo) => {
    // 必须使用解构模式 {}
    // 如果不需要 Playwright 自动注入的 page、browser 等对象，使用空解构 {} 占位
    console.log('case1:打开广告页 截图');
    console.log(testInfo);
    await mainPage.clickAd();
    const shot = await driver.page.screenshot({path:'../screenShot/ads.png'})
    await testInfo.attach('ads-1', { body: shot, contentType: 'image/png' });
    console.log('截图完成');

  });
});




