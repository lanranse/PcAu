const driver = require('../tools/Driver.js');
const MainPage = require('../pages/MainPage.js');
const {test, expect } = require('playwright/test');
const path = require('path');
const fs = require('fs');
const api = require('../tools/requests.js');

test.describe('test suite JoinGuild', () => {
  let mainPage;

  test.beforeAll(async () => {
    await driver.init()
    await api.init();
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
    await mainPage.timewait(1000) //等一下，否则太快了截图不到想要的页面
    const shot_join = await driver.page.screenshot({path:'../screenShot/joinOthers.png'})
    await testInfo.attach('finds-1', { body: shot_join, contentType: 'image/png' });
    console.log('截图完成');

    // 专门的推出服务器清理动作
    const res = await api.delete('/api/v2/users/guild/9270012507496003')
    console.log('Teardown-推出服务器 结果：',res.code);
    await mainPage.timewait(1000)
    const shot_quit = await driver.page.screenshot({path:'../screenShot/joinAndQuit.png'})
    await testInfo.attach('finds-1', { body: shot_quit, contentType: 'image/png' });


  })

  test('test case create-2', async ({}, testInfo) => {
    console.log('case2:创建服务器');
    await mainPage.clickCreateGuild(); // 这是一堆操作
    await mainPage.timewait(1000)
    const shot_create = await driver.page.screenshot({path:'../screenShot/createGuild.png'})
    await testInfo.attach('create-1', { body: shot_create, contentType: 'image/png' });

    const res = await api.post('/api/v3/guild/delete')
    const payload = {guild_id: "4786705905614597"}
  })

})