const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('exchange test', () => {
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
    
    await page.goto('http://zero.webappsecurity.com/login.html')
    await page.waitForSelector('#login_form')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('#user_remember_me')
    await page.click('input[type="submit"]')
    await page.waitForSelector('#settingsBox')
    
    await page.waitForSelector('.nav-tabs')
    await page.click('#pay_bills_tab')
    await page.waitForSelector('.board')



    })

    after(async function() {
        await browser.close()
    })

    it('display currency exchange form', async function() {
        await page.waitForSelector('#tabs > ul > li:nth-child(3) > a')
        await page.click('#tabs > ul > li:nth-child(3) > a')
        await page.waitForSelector('.board')
    })

    it('exchange currency', async function() {
        await page.waitForSelector('#pc_currency')
        await page.select('#pc_currency', 'GBP')
        await page.type('#pc_amount', '800')
        await page.click("#pc_inDollars_true")
        await page.click("#purchase_cash")
        await page.waitForSelector('#alert_content')
    })
})