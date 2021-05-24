const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('feedback form test', () => {
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

    it('display feedback form', async function() {
        await page.goto('http://zero.webappsecurity.com/')
        await page.waitForSelector('#feedback')
        await page.click('#feedback')
    })

    it('submit feedback form', async function() {
        await page.waitForSelector('form')
        await page.type('#name', 'Name')
        await page.type('#email', 'test@email.com')
        await page.type('#subject', 'Subject')
        await page.type('#comment', 'This is my comment')
        await page.click('input[type="submit"]')

    })

    it('displays results page', async function() {
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('/sendFeedback.html')
    })
})