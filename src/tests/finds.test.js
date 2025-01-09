const driver = require('../tools/Driver.js');
const MainPage = require('../pages/MainPage.js');
const MallPage = require('../pages/MallPage.js');
const FindsPage = require('../pages/FindsPage.js');
const {test, expect } = require('playwright/test');
const path = require('path');
const fs = require('fs');


test.describe('test suite finds', () => {
  let mainPage;
  let mallPage;
  let findsPage;

  test.beforeAll(async () => {
    await driver.init()
    mainPage = new MainPage(driver.page);
    mallPage = new MallPage(driver.page);
    findsPage = new FindsPage(driver.page);
  })

  test.afterAll(async () => {
    await driver.close();
  })

  test('test case finds-1', async ({}, testInfo) => {
    // 必须使用解构模式 {}
    // 如果不需要 Playwright 自动注入的 page、browser 等对象，使用空解构 {} 占位
    console.log('case1:打开发现页，截图');
    console.log(testInfo);
    await mainPage.clickfinds();
    const shot = await driver.page.screenshot({path:'../screenShot/finds.png'})
    await testInfo.attach('finds-1', { body: shot, contentType: 'image/png' });
    console.log('截图完成');

  });

  test('test case finds-2', async () => {
    console.log('case2:打开发现页，搜索第10个默认搜素搜词');
    await mainPage.clickfinds();
    await findsPage.clickDefault10AndWaitResult()
    await driver.page.screenshot({path:'../screenShot/finds_default10.png'})
    console.log('截图完成');

  })

  test('test case finds-3', async () => {
    console.log('case3:打开发现页选择第一个推荐服务器，进入预览');
    await findsPage.inputSearchKey()
    await findsPage.clickResultFirst()
    await mainPage.existPreviewTip()
    await driver.page.screenshot({path:'../screenShot/finds_previews.png'})


  })
});




