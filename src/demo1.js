import {_electron as electron, chromium} from 'playwright';

(async () => {
  // Launch Electron app.
  const electronApp = await electron.launch({
    executablePath: 'C:\\Users\\lovedj\\AppData\\Local\\KOOK\\app-0.89.2\\KOOK.exe',
    args: ['--remote-debugging-port=9222']
  })
  // const context = await electronApp.context();
  const window = await electronApp.firstWindow();
  if (window) {
    console.log('Window title:', await window.title());
    // 等待窗口加载完成
    await window.waitForLoadState('load');
    await window.waitForTimeout(5)
    await window.screenshot({ path: 'intro.png' });
    await window.locator('//img[@alt="熊猫星"]').click()

    mall = '//div[@class=\'win-title-inner\']/div[@class=\'right\']/div[2]/div[2]'

  } else {
    console.error('No window detected!');
  }



  // 等待足够长的时间以捕获窗口
  await new Promise(resolve => setTimeout(resolve, 10000));

  await electronApp.close();
})();


