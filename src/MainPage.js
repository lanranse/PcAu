
class MainPage {
  constructor(page) {
    this.title = "Main Page";
    this.page = page;
    this.mall_xpath = "//div[@class=\'win-title-inner\']/div[@class=\'right\']/div[2]/div[2]"
    this.guild_panda_xpath = "//img[@alt='熊猫星']"
    this.voice_channel_xpath = "//span[text()='star']"

  }

  async openMall() {
    await this.page.locator(this.mall_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async clickGuildPanda() {
    await this.page.locator(this.guild_panda_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
}

  async dblclickVoiceChannel() {
    await this.page.locator(this.voice_channel_xpath).dblclick()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }
}


module.exports = MainPage;
