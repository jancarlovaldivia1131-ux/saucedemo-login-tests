import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'


describe('My Login application', () => {
    it('should login with valid credentials', async () => {
     for (const user of LoginPage.users) {
        await browser.deleteCookies()
        await LoginPage.open()
        await LoginPage.login(user, LoginPage.password)
        await expect(browser).toHaveUrl(/inventory/)
  
     }
    
    })
})

