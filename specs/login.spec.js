const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../page/loginPage');
const assert = require('assert');
const VisualRegressionHelper = require('../utilities/visualRegressionHelper')

describe('Login Tests', function () {
    this.timeout(5000);

    let driver;
    let loginPage;
    let visualRegression;

    before(async function () {
        const options = new chrome.Options();
        options.addArguments('--disable-notification');
        
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
        visualRegression = new VisualRegressionHelper();
    });

    after(async function () {
        if (driver) {
        await driver.quit();
        }
    });

    beforeEach(async function () {
        await loginPage.open();
    });

    async function handleVisualRegression(imageName) {
        const result = await visualRegression.compareImages(imageName);

        if (!result.hasBaseline) {
            console.log('Baseline created');
        } else if (result.match) {
            console.log('Visual regression passed!');
        } else {
            console.log(`Difference: ${result.matchPercentage}%`);
        }
    }
    
    // Test case positive : Login Success
    it('Should login successfully', async function () {
        await loginPage.open();
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();

        //Assert: successfully redirect to /inventory.html
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes('/inventory.html'), 'URL must redirect to /inventory.html');

        await handleVisualRegression('login_success.png');
    });

    it('[NEG] Invalid Username', async function () {
        await loginPage.enterUsername('invalid_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();

        await driver.sleep(500)

        //Assert: username & password do not match
        const errorMsg = await loginPage.getErrorMessageText();
        assert.ok(errorMsg.includes('Username and password do not match'));

        await handleVisualRegression('invalid_username.png');
    });

    it('[NEG] Wrong Password', async function () {
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('wrongPass');
        await loginPage.clickLogin();

        await driver.sleep(500)

        //Assert: username & password do not match
        const errorMsg = await loginPage.getErrorMessageText();
        assert.ok(errorMsg.includes('Username and password do not match'));

        await handleVisualRegression('wrong_password.png');
    });

    it('[NEG] Locked Out User', async function () {
        await loginPage.enterUsername('locked_out_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();

        await driver.sleep(500)
        //Assert: username & password do not match
        const errorMsg = await loginPage.getErrorMessageText();
        assert.ok(errorMsg.includes('Sorry, this user has been locked out.'));

        await handleVisualRegression('locked_out_user.png');
    });
});