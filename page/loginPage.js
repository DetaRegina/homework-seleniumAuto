const { until } = require('selenium-webdriver');
const LOGIN_LOCATORS = require('../locator/loginPage.locator');
const LocatorHelper = require('../locator/locatorHelper');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  // Locator Elements
  async usernameInput() {
    return await this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.usernameInput));
  }

  async passwordInput() {
    return await this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.passwordInput));
  }

  async loginButton() {
    return await this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.loginButton));
  }

  async errorMessage() {
    return await this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.errorMessage));
  }

  async appLogo() {
    return await this.driver.findElement(LocatorHelper.getBy(LOGIN_LOCATORS.selectors.appLogo));
  }

  // Actions (Gaya penulisan persis materi)
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

  async getErrorMessageText() {
    const element = await this.errorMessage();
    return await element.getText();
  }

  async getAppLogoText() {
    const element = await this.appLogo();
    return await element.getText();
  }
}

module.exports = LoginPage;