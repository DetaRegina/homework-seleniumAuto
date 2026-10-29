const { By, until } = require('selenium-webdriver');
const LOGIN_LOCATORS = require('../locator/loginPage.locator');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  // Helper internal untuk mengubah {type, value} jadi By Selenium
  getBy(locator) {
    if (locator.type === 'id') return By.id(locator.value);
    if (locator.type === 'css') return By.css(locator.value);
    if (locator.type === 'xpath') return By.xpath(locator.value);
    return By.css(locator.value);
  }

  async usernameInput() {
    return await this.driver.findElement(this.getBy(LOGIN_LOCATORS.selectors.usernameInput));
  }

  async passwordInput() {
    return await this.driver.findElement(this.getBy(LOGIN_LOCATORS.selectors.passwordInput));
  }

  async loginButton() {
    return await this.driver.findElement(this.getBy(LOGIN_LOCATORS.selectors.loginButton));
  }

  // Actions
  async open() {
    await this.driver.get(LOGIN_LOCATORS.url);
  }

  async enterUsername(username) {
    const element = await this.usernameInput();
    await element.clear();
    await element.sendKeys(username);
  }

  async enterPassword(password) {
    const element = await this.passwordInput();
    await element.clear();
    await element.sendKeys(password);
  }

  async clickLogin() {
    const element = await this.loginButton();
    await element.click();
  }

  // Getters untuk Assertions
  async getErrorMessage() {
    const by = this.getBy(LOGIN_LOCATORS.selectors.errorMessage);
    const element = await this.driver.wait(until.elementLocated(by), 5000);
    return await element.getText();
  }

  async getAppLogoText() {
    const by = this.getBy(LOGIN_LOCATORS.selectors.appLogo);
    const element = await this.driver.wait(until.elementLocated(by), 5000);
    return await element.getText();
  }
}

module.exports = LoginPage;