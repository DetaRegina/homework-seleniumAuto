const LOGIN_LOCATORS = {
  url: 'https://www.saucedemo.com/',
  selectors: {
    usernameInput: { type: 'id', value: 'user-name' },
    passwordInput: { type: 'id', value: 'password' },
    loginButton: { type: 'id', value: 'login-button' },
    errorMessage: { type: 'css', value: '[data-test="error"]' },
    appLogo: { type: 'css', value: '.app_logo' }
  }
};

module.exports = LOGIN_LOCATORS;