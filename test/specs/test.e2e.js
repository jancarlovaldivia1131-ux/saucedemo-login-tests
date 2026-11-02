import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'


describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login(LoginPage.username, LoginPage.password)
        await expect(browser).toHaveUrl(/inventory/)
    })
})

