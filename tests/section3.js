const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('My Second Puppeteer Test', () => {
    let browser
    let page
    
    before(async function() {
        browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		page = await browser.newPage()   
        await page.setDefaultTimeout(10000)
		await page.setDefaultTimeout(20000)
    })

    after(async function() {
        await browser.close()
    })

    beforeEach(async function() {
        // runs before each test step
    })

    afterEach(async function() {
        // runs after each test step
    })


	it('should launch the browser', async function () {
		
		await page.goto('https://example.com/')
		await page.waitForXPath('//h1')

		const actualTitle = await page.title()
		const actualUrl = await page.url()
		// $eval(<element>, <callback function>) returns one element
		const actualText = await page.$eval('h1', element => element.textContent)
		// $$eval returns multiple elements
		const actualCount = await page.$$eval('p', element => element.length)

		// assertions using chai
		expect(actualTitle).to.be.a('string', 'Example Domain')
		expect(actualUrl).to.include('example.com')
		expect(actualText).to.be.a('string', 'Example Domain')
		expect(actualCount).to.eq(2)

		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#signin_button')
		await page.click('#signin_button')
		await page.waitForFunction(() => !document.querySelector('#signin_button'))
		await page.waitForSelector('#signin_button', {
			hidden: true,
			timeout: 3000,
		})
	})
})
