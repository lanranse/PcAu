const driver = require('../tools/Driver.js');
const MainPage = require('../pages/MainPage.js');
const MallPage = require('../pages/MallPage.js');
const {test, expect } = require('playwright/test');
const path = require('path');
const fs = require('fs');
const user1 = require('../tools/user1.js');
const { spawn } = require('child_process');


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
        console.log('case1-:创建语音频道');
        await mainPage.clickGuildPanda();
        await mainPage.clickAddChannel();
        await mainPage.clickSelectVoiceChannel();
        await mainPage.inputVoiceNameInput();
        await mainPage.clickCreateChannelButton();

    })

    test.only('test case 2', async () => {
        console.log('case2：加入语音频道，声音')
        await mainPage.clickGuildPanda();
        await mainPage.dblclickVoiceChannel('star');
        await driver.page.waitForTimeout(3000)
        await user1.user1Login();
        await driver.page.waitForTimeout(3000)
        const pythonProcess = spawn('python', ['C:\\Users\\lovedj\\Pcauto\\pythonProject\\demoo1\\banana_end.py'])
        pythonProcess.stdout.on('data', (data) => {
            console.log('stdout:', data);
        })
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        await driver.page.waitForTimeout(3000)
        pythonProcess.kill()



    })
})