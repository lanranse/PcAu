const { expect } = require('playwright/test')

class FindsPage{
  constructor(page){
    this.title = "Finds Page";
    this.page = page;
    this.defalt10 = "//div[@class= 'default-keyword-list']/a[10]"
    this.defalt10_check = "//div[@class='grid-item-premium']"
    this.search_place_xpath = "//div[@class='kook-markdown-editor']/div"
    this.search_check_xpath = "//div[@class='guild-list']/div"
    this.key = '乌冬拉面馆'
  }

  async clickDefault10AndWaitResult() {
    // 点击第10个默认搜索词 等待结果
    await this.page.locator(this.defalt10).click()
    await this.page.waitForTimeout(500)
    // await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.defalt10_check, {timeout:5000})
    await this.page.waitForTimeout(500) //等待图片加载
  }

  async inputSearchKey(key){
    // 输入搜索词，校验结果数量
    await this.page.locator(this.search_place_xpath).fill(this.key)
    await this.page.waitForTimeout(2000)
    await this.page.waitForSelector(this.search_check_xpath, {timeout:5000})
    const elements = await this.page.locator(this.search_check_xpath)
    const elementCount = await elements.count();
    console.log(`乌冬拉面馆 搜索数量：${elementCount}`)
    expect(elementCount).toBeGreaterThan(0) // Playwright 风格的断言
  }

  async clickResultFirst(){
    //点击第一个搜索结果
    const elements = await this.page.locator(this.search_check_xpath)
    await elements.nth(0).click()//locator().nth(index) 用于定位匹配的第 index 个元素
  }

}


module.exports = FindsPage;
