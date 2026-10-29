const { By } = require('selenium-webdriver');

class LocatorHelper {
  static getBy(locatorObj) {
    if (locatorObj.type === 'id') return By.id(locatorObj.value);
    if (locatorObj.type === 'css') return By.css(locatorObj.value);
    if (locatorObj.type === 'xpath') return By.xpath(locatorObj.value);
    if (locatorObj.type === 'name') return By.name(locatorObj.value);
    return By.css(locatorObj.value);
  }
}

module.exports = LocatorHelper;