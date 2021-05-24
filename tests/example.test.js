const puppeteer = require('puppeteer')
const expect = require('chai').expect

const { click, getCount, getText, shouldNotExists } = require('../lib/helpers')

describe('My First Puppeteer Test', () => {
	it('should launch the browser', async function () {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()
		await page.setDefaultTimeout(10000) // by default it is 30 seconds
		await page.setDefaultTimeout(20000)
		await page.goto('https://example.com/')
		await page.waitForXPath('//h1')

		const actualTitle = await page.title()
		const actualUrl = await page.url()
		// $eval(<element>, <callback function>) returns one element
		//const actualText = await page.$eval('h1', element => element.textContent)
		const actualText = await getText(page, 'h1')
		// $$eval returns multiple elements
		//const actualCount = await page.$$eval('p', element => element.length)
		const actualCount = await getCount(page, 'p')

		// assertions using chai
		expect(actualTitle).to.be.a('string', 'Example Domain')
		expect(actualUrl).to.include('example.com')
		expect(actualText).to.be.a('string', 'Example Domain')
		expect(actualCount).to.eq(2)

		await page.goto('http://zero.webappsecurity.com/index.html')
		await click(page, '#signin_button')
		await page.waitForTimeout(2000)
		await shouldNotExists(page, '#signin_button')
		await browser.close()
	})
})
