class MallPage {
  constructor(page) {
    this.title = "Mall Page";
    this.page = page;
    this.BuXiangShangBan_xpath = "//div[@class='goods-name' and text()='不想上班了']"
    this.Product_detail_xpath = "//div[@class='modal-body goods-modal theme-abled']"
    this.ToBuy_xpath = "//span[text()='购买']/.."
  }

  async clickProductBuXiangShangBan() {
    await this.page.locator(this.BuXiangShangBan_xpath).click()
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    await this.page.waitForTimeout(2000)
  }

  async Product_detail_Locate() {
    return await this.page.locator(this.Product_detail_xpath);
  }

  async clickToBuy() {
    await this.page.locator(this.ToBuy_xpath).click();
    await this.page.waitForTimeout(2000)
  }

}


module.exports = MallPage;