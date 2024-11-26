class MallPage {
  constructor(page) {
    this.title = "Mall Page";
    this.page = page;
    this.BuXiangShangBan_xpath = "//div[@class='goods-name' and text()='不想上班了']"

  }

  async openProductBuXiangShangBan() {
    await this.page.locator(this.BuXiangShangBan_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }
}


module.exports = MallPage;