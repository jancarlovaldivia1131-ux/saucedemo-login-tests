import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'

describe('SauceDemo Login Application - Positive and Negative Testing', () => {

// POSITIVE TEST: Standard User Login
it('should login successfully with standard user and verify expected inventory page', async () => {
await LoginPage.open();
await LoginPage.login('standard_user', 'secret_sauce');

await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
await expect($('.title')).toHaveText('Products');
});

// NEGATIVE TEST 1: Locked Out User
it('should show error message when logging in with a locked out user', async () => {
await LoginPage.open();
await LoginPage.login('locked_out_user', 'secret_sauce');

const errorMessage = await $('[data-test="error"]');
await expect(errorMessage).toBeDisplayed();
await expect(errorMessage).toHaveText(expect.stringContaining('Epic sadface: Sorry, this user has been locked out.'));
});

// NEGATIVE TEST 2: Invalid Password
it('should show error message when logging in with incorrect password', async () => {
await LoginPage.open();
await LoginPage.login('standard_user', 'wrong_password');

const errorMessage = await $('[data-test="error"]');
await expect(errorMessage).toBeDisplayed();
await expect(errorMessage).toHaveText(expect.stringContaining('Epic sadface: Username and password do not match any user in this service'));
});

// NEGATIVE TEST 3: Empty Credentials
it('should show error message when logging in with empty credentials', async () => {
await LoginPage.open();
await $('#login-button').click();

const errorMessage = await $('[data-test="error"]');
await expect(errorMessage).toBeDisplayed();
await expect(errorMessage).toHaveText(expect.stringContaining('Epic sadface: Username is required'));
});
});
