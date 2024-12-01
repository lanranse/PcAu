
class MainPage {
  constructor(page) {
    this.title = "Main Page";
    this.page = page;
    this.mall_xpath = "//div[@class=\'win-title-inner\']/div[@class=\'right\']/div[2]/div[2]"
    this.guild_panda_xpath = "//img[@alt='熊猫星']"
    this.voice_channel_xpath = "//span[text()='%s']"
    this.control_earphone_xpath = '//div[@class="audio-controller-icos"]/div[3]/*[name()="svg"]/*[name()="g"]/*[name()="g"]/*[name()="g"]'
    this.voicemeeter_input_xpath = "//span[text()='Voicemeeter Input (VB-Audio Voicemeeter VAIO)']"
    this.voicemeeter_input_check_xpath = "//span[text()='Voicemeeter Input (VB-Audio Voicemeeter VAIO)']/following-sibling::div[1]"
    this.add_channel_xpath = "//div[@class= 'ctrl-ico kookiconfont kookiconfont-add']"
    this.select_voice_channel_xpath = "//div[@class= 'block-selector']/a[2]"
    this.voice_name_input_xpath = "//input[@placeholder='输入频道名称']"
    this.create_channel_button_xpath = "//span[text()='创建频道']"
  }

  async openMall() {
    await this.page.locator(this.mall_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async clickGuildPanda() {
    await this.page.locator(this.guild_panda_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
}

  async dblclickVoiceChannel(name) {
    const dynamic_voice_channel_xpath = this.voice_channel_xpath.replace('%s', name)
    await this.page.locator(dynamic_voice_channel_xpath).dblclick()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async rtclickEarPhone() {
    await this.page.locator(this.control_earphone_xpath).click({ button: 'right', force: true})
    // await this.page.locator(this.control_earphone_xpath).click()
  }

  async clickVoicemeeterInput() {
    this.page.waitForSelector(this.voicemeeter_input_xpath)
    await this.page.locator(this.voicemeeter_input_xpath).click()
  }

  async timewait(time) {
    await this.page.waitForTimeout(time);
  }

  async getVoicemeeterCheckStatus(){
    return await this.page.locator(this.voicemeeter_input_check_xpath).getAttribute('class')
  }

  async clickAddChannel() {
    const targetElement = this.page.locator(this.add_channel_xpath).first()//获取第一个匹配的元素
    await targetElement.hover({force: true})//增加force，否则无效
    await targetElement.click()
  }
  async clickSelectVoiceChannel() {
    await this.page.locator(this.select_voice_channel_xpath).click();
  }
  async inputVoiceNameInput(){
    await this.page.locator(this.voice_name_input_xpath).fill('JFla')
  }
  async clickCreateChannelButton() {
    await this.page.locator(this.create_channel_button_xpath).click()
  }
}


module.exports = MainPage;
