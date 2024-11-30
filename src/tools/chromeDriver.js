const { chromium } = require('playwright');

class ChromeDriver{
  constructor(){
    this.context = null;
    this.page = null;
    this.isIninitialized = false;
  }

  async init(){
    if (this.isIninitialized) {
      console.log("chromeDriver already inited, skipping");
    }
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({locale: 'zh-CN'});
    await context.grantPermissions(['microphone'])  // 允许麦克风权限
    this.page = await context.newPage();
    this.context = context;
    this.isIninitialized = true;
    console.log('chromeDriver initialized successfully.')
  }

  async close(){
    if(this.context){
      await this.context.close();
      this.context = null;
      this.page = null;
      this.isIninitialized = false;
      console.log('chromeDriver closed.')
    }
  }


}

module.exports = ChromeDriver;