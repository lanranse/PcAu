
class MainPage {
  constructor(page) {
    this.title = "Main Page";
    this.page = page;
    this.mall_xpath = "//div[@class=\'win-title-inner\']/div[@class=\'right\']/div[2]/div[2]"
    this.guild_panda_xpath = "//img[@alt='熊猫星']"
    this.guild_var_xpath = "//img[@alt='%s']"
    this.voice_channel_xpath = "//span[text()='%s']"
    this.control_earphone_xpath = '//div[@class="audio-controller-icos"]/div[3]/*[name()="svg"]/*[name()="g"]/*[name()="g"]/*[name()="g"]'
    this.voicemeeter_input_xpath = "//span[text()='Voicemeeter Input (VB-Audio Voicemeeter VAIO)']"
    this.voicemeeter_input_check_xpath = "//span[text()='Voicemeeter Input (VB-Audio Voicemeeter VAIO)']/following-sibling::div[1]"
    this.add_channel_xpath = "//div[@class= 'ctrl-ico kookiconfont kookiconfont-add']"
    this.select_type_channel_xpath = "//div[@class= 'block-selector']/a['%s']"
    this.voice_name_input_xpath = "//input[@placeholder='输入频道名称']"
    this.create_channel_button_xpath = "//span[text()='创建频道']"
    this.finds_xpath = "//a[@id='icon-server-search']"
    this.preview_tip_xpath = "//div[text()='预览模式']"
    this.join_guild_xpath = "//a[@id='icon-server-add']"
    this.join_other_guild_xpath = "//div[text()='加入他人服务器']"
    this.invite_link_input_xpath = "//input[@placeholder='输入即时邀请链接或服务器ID']"
    this.join_button_xpath = "//span[text()='加入']"

    this.create_guild_1_xpath = "//div[text()='自己创建服务器']"
    this.create_guild_2_xpath = "//span[text()='选择']"
    this.input_guild_name_3_xpath = "//input[@placeholder='输入服务器名称']"
    this.create_guild_4_xpath = "//span[text()='创建']"
  }

  async wait(timeout) {
    await this.page.waitForTimeout()
  }

  async openMall() {
    await this.page.locator(this.mall_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async clickGuildPanda() {
    await this.page.locator(this.guild_panda_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }
  async clickGuildVar(name) {
    const dynamic_guild_var_xpath = this.guild_var_xpath.replace('%s', name)
    await this.page.locator(dynamic_guild_var_xpath).click()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }


  async dblclickVoiceChannel(name) {
    const dynamic_voice_channel_xpath = this.voice_channel_xpath.replace('%s', name)
    await this.page.locator(dynamic_voice_channel_xpath).dblclick()
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async rtclickEarPhone() {
    await this.page.locator(this.control_earphone_xpath).click({ button: 'right', force: true })
    // await this.page.locator(this.control_earphone_xpath).click()
  }

  async clickVoicemeeterInput() {
    this.page.waitForSelector(this.voicemeeter_input_xpath)
    await this.page.locator(this.voicemeeter_input_xpath).click()
  }

  async timewait(time) {
    await this.page.waitForTimeout(time);
  }

  async getVoicemeeterCheckStatus() {
    return await this.page.locator(this.voicemeeter_input_check_xpath).getAttribute('class')
  }

  async clickAddChannel() {
    const targetElement = this.page.locator(this.add_channel_xpath).first()//获取第一个匹配的元素
    await targetElement.hover({ force: true })//增加force，否则无效
    await targetElement.click()
  }

  async clickSelectTypeChannel(number) {
    const dynamic_type_channel_xpath = this.select_type_channel_xpath.replace('%s', number)
    await this.page.locator(dynamic_type_channel_xpath).click();
  }

  async inputVoiceNameInput() {
    await this.page.locator(this.voice_name_input_xpath).fill('JFla')
  }

  async createTextChannel() {
    await this.clickAddChannel()
    await this.clickSelectTypeChannel(1)
    await this.inputVoiceNameInput('TextChannelAuto')
    await this.clickCreateChannelButton()
  }

  async createVoiceChannel() {
    await this.clickAddChannel()
    await this.clickSelectTypeChannel(2)
    await this.inputVoiceNameInput('VoiceChannelAuto')
    await this.clickCreateChannelButton()
  }

  async createNoteChannel() {
    await this.clickAddChannel()
    await this.clickSelectTypeChannel(3)
    await this.inputVoiceNameInput('NoteChannelAuto')
    await this.clickCreateChannelButton()
  }

  async clickCreateChannelButton() {
    await this.page.locator(this.create_channel_button_xpath).click()
  }

  async clickfinds() {
    await this.page.locator(this.finds_xpath).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async existPreviewTip() {
    await this.page.waitForSelector(this.preview_tip_xpath, { timeout: 5000 }) // 设置合理的超时时间
  }

  async clickJoinGuild() {
    await this.page.locator(this.join_guild_xpath).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async clickJoinOtherGuild() {
    await this.page.locator(this.join_other_guild_xpath).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async inputInviteLinkInput() {
    await this.page.locator(this.invite_link_input_xpath).fill('https://kook.vip/pyzIr8');
  }

  async clickJoinButton() {
    await this.page.locator(this.join_button_xpath).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async clickCreateGuild() {
    await this.page.locator(this.create_guild_1_xpath).click();
    await this.page.locator(this.create_guild_2_xpath).click();
    await this.page.locator(this.input_guild_name_3_xpath).fill('喵喵');
    await this.page.locator(this.create_guild_4_xpath).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

}

module.exports = MainPage;
