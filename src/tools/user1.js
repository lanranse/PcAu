const ChromeDriver  = require('./ChromeDriver.js');
const LoginPage = require('../pages/LoginPage.js');
const MainPage = require('../pages/MainPage');


async function user1Login() {
    const chromedriver = new ChromeDriver();
    await chromedriver.init();
    let loginpage = new LoginPage(chromedriver.page);
    let mainpage = new MainPage(chromedriver.page);

    await loginpage.goto('https://www.kookapp.cn/app/login');
    await loginpage.clickPwdWay();
    await loginpage.inputUsername('19900010001');
    await loginpage.inputPassword('kk123456');
    await loginpage.clickLoginButton();

    await mainpage.clickGuildPanda();
    await mainpage.dblclickVoiceChannel();

}

// 导出函数，方便其他文件调用
module.exports = {
  user1Login
};

// (async () => {
//   try {
//     const result = await user1Login();
//     console.log(result);
//   } catch (error) {
//     console.error('出现错误:', error);
//   }
// })();