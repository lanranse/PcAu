const path = require('path');
const fs = require('fs');
const driver = require('../tools/Driver.js');
const api = require('../tools/requests.js');
const { test } = require('playwright/test');
const MainPage = require('../pages/MainPage');

test.describe('test suite GuildBaseFuc', () => {
  let mainPage;

  test.beforeAll(async () => {
    await driver.init()
    await api.init();
    mainPage = new MainPage(driver.page);
  })

  test.afterAll(async () => {
    await driver.close();
  })

  test('test case create-123', async ({}, testInfo) => {
    await mainPage.clickGuildVar('茉莉');
    await mainPage.createTextChannel()
    await mainPage.createVoiceChannel()
    await mainPage.createNoteChannel()
    await mainPage.timewait(1000)
    const shot_create123 = await driver.page.screenshot({path:'../screenShot/joinAndQuit.png'})
    await testInfo.attach('create-123', { body: shot_create123, contentType: 'image/png' });
  })})