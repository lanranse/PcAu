const driver = require('./Driver.js');
const MainPage = require('./MainPage.js');
const MallPage = require('./MallPage.js');
const {test, expect } = require('playwright/test');
const path = require('path');
const fs = require('fs');


test.describe('test suite 2', () => {
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
        console.log('case1-step1:进入语音频道');
        await mainPage.clickGuildPanda();
        await mainPage.dblclickVoiceChannel();
        await driver.page.waitForTimeout(3000)



    })
})