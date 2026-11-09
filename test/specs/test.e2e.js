import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'

describe('My Login application', () => {
    it('should login with multiple users using a loop', async () => {
        for (const username of LoginPage.users) {
            await LoginPage.open()
            await LoginPage.login(username, LoginPage.password)
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        }
    })
})