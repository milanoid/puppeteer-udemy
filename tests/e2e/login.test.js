const puppeteer = require('puppeteer')

describe('login test', () => {
    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch({
            headless: false, 
            slowMo: 0, 
            devtools: false,
            ignoreHTTPSErrors: true
    })

    page = await browser.newPage()
    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)
    })

    after(async function() {
        await browser.close()
    })

    it('invalid credentials', async function() {
        await page.goto('http://zero.webappsecurity.com/')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'invalid@creds.com')
        await page.type('#user_password', 'invalidpassword')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        await page.waitForSelector('.alert-error')
    })

    it('valid crdentials', async function() {
        await page.goto('http://zero.webappsecurity.com/')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        await page.waitForSelector('#settingsBox')
    })
})