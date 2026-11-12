import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
 // every user SauceDemo lists as accepted
 allUsers=['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
 // users that CAN log in (everyone except locked_out_user)
 validUsers=['standard_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
 lockedOutUser='locked_out_user';
 password='secret_sauce';

    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
get errorMessage () {
    return $('[data-test="error"]');
}
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return browser.url('https://www.saucedemo.com');
    }
}

export default new LoginPage();