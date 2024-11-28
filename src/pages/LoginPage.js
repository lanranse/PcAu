

class LoginPage {
    constructor(page) {
        this.title = "Login Page";
        this.page = page;
        this.login_button_xpath = "//div[@class='login-button']"
        this.username_input_xpath = "//input[@placeholder='请输入手机号']"
        this.password_input_xpath = "//input[@placeholder='密码为数字、英文、符号的组合']"
        this.pwd_way_xpath = "//div[text()='账号登录']"
    }

    async goto(url) {
        await this.page.goto(url)
    }

    async clickLoginButton() {
        await this.page.locator(this.login_button_xpath).click()
    }
    async clickPwdWay() {
        await this.page.locator(this.pwd_way_xpath).click()
    }
    async inputUsername(username) {
        await this.page.locator(this.username_input_xpath).fill(username)
    }

    async inputPassword(password) {
        await this.page.locator(this.password_input_xpath).fill(password)
    }
}

module.exports = LoginPage;
