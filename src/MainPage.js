
class MainPage {
  constructor(page) {
    this.title = "Main Page";
    this.page = page;
    this.mall_xpath = "//div[@class=\'win-title-inner\']/div[@class=\'right\']/div[2]/div[2]"

  }

  async openMall() {
    await this.page.locator(this.mall_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }
}


module.exports = MainPage;
