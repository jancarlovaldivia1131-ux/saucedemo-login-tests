import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'

const BASE_URL = 'https://www.saucedemo.com';

describe('SauceDemo Login Application - Positive and Negative Testing', () => {

    // POSITIVE TESTS: every user that is allowed to log in
    describe('Positive testing - valid login for ALL users', () => {
        for (const username of LoginPage.validUsers) {
            it(`should login successfully as ${username}`, async () => {
                await LoginPage.open();
                await LoginPage.login(username, LoginPage.password);

                await expect(browser).toHaveUrl(`${BASE_URL}/inventory.html`, { wait: 15000 });
                await expect($('.title')).toHaveText('Products');
            });
        }
    });

    // NEGATIVE TESTS: run against ALL users
    describe('Negative testing - invalid login for ALL users', () => {

        // locked_out_user has the correct password but is still blocked
        it('should show locked out error for locked_out_user with a valid password', async () => {
            await LoginPage.open();
            await LoginPage.login(LoginPage.lockedOutUser, LoginPage.password);

            await expect(LoginPage.errorMessage).toBeDisplayed();
            await expect(LoginPage.errorMessage).toHaveText(
                expect.stringContaining('Epic sadface: Sorry, this user has been locked out.'));
        });

        // wrong password, every user
        for (const username of LoginPage.allUsers) {
            it(`should show error for ${username} with an incorrect password`, async () => {
                await LoginPage.open();
                await LoginPage.login(username, 'wrong_password');

                await expect(LoginPage.errorMessage).toBeDisplayed();
                await expect(LoginPage.errorMessage).toHaveText(
                    expect.stringContaining('Epic sadface: Username and password do not match any user in this service'));
                await expect(browser).toHaveUrl(`${BASE_URL}/`);
            });
        }

        // empty password, every user
        for (const username of LoginPage.allUsers) {
            it(`should show error for ${username} with an empty password`, async () => {
                await LoginPage.open();
                await LoginPage.login(username, '');

                await expect(LoginPage.errorMessage).toBeDisplayed();
                await expect(LoginPage.errorMessage).toHaveText(
                    expect.stringContaining('Epic sadface: Password is required'));
            });
        }

        // empty username with a password
        it('should show error when the username is empty', async () => {
            await LoginPage.open();
            await LoginPage.login('', LoginPage.password);

            await expect(LoginPage.errorMessage).toBeDisplayed();
            await expect(LoginPage.errorMessage).toHaveText(
                expect.stringContaining('Epic sadface: Username is required'));
        });

        // both fields empty
        it('should show error when both credentials are empty', async () => {
            await LoginPage.open();
            await LoginPage.btnSubmit.click();

            await expect(LoginPage.errorMessage).toBeDisplayed();
            await expect(LoginPage.errorMessage).toHaveText(
                expect.stringContaining('Epic sadface: Username is required'));
        });
    });
});