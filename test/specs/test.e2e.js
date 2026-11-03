import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'


describe('My Login application', () => {
    it('should login with valid credentials', async () => {
     for (const user of LoginPage.credentials.users) {
        await browser.deleteCookies()
        await LoginPage.open()
        await LoginPage.login(user, LoginPage.credentials.password)
        await expect(browser).toHaveUrl(/inventory/)
  
     }
    
    })
})

