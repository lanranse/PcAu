const driver = require('../tools/Driver.js');
const MainPage = require('../pages/MainPage.js');
const {test, expect } = require('playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('test suite JoinGuild', () => {
  let mainPage;

  test.beforeAll(async () => {
    await driver.init()
    mainPage = new MainPage(driver.page);
  })

  test.afterAll(async () => {
    await driver.close();
  })

  test('test case join-1', async ({}, testInfo) => {
    console.log('case1:输入邀请链接加入');
    await mainPage.clickJoinGuild();
    await mainPage.clickJoinOtherGuild();
    await mainPage.inputInviteLinkInput();
    await mainPage.clickJoinButton();
    await mainPage.waitForTimeout(1000) //等一下，否则太快了截图不到想要的页面
    const shot = await driver.page.screenshot({path:'../screenShot/joinOthers.png'})
    await testInfo.attach('finds-1', { body: shot, contentType: 'image/png' });
    console.log('截图完成');
  })

})