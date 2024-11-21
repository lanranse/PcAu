const driver = require('./Driver.js');
const MainPage = require('./MainPage.js');

describe('Test Suite 1', () => {
    let mainPage;

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
        const viewportHeight = await driver.page.evaluate(() => window.innerHeight);
        console.log(`height is :${viewportHeight}`);
        await driver.page.mouse.wheel(0, viewportHeight)
        await driver.page.evaluate(() =>{
            driver.page.scrollTo(0, 1000); // 滚动到页面垂直位置 1000
        });
        await driver.page.waitForTimeout(3000)
        await driver.page.screenshot({path:'mallPage.png', fullPage: true});

    })
});




