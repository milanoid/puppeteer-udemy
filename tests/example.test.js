const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('My First Puppeteer Test', () => {
    it('should launch the browser', async function(){
        const browser = await puppeteer.launch({
            headless: true, 
            slowMo: 10, 
            devtools: false, 
        })
        const page = await browser.newPage()
        await page.goto('https://example.com/')
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

        await browser.close()
    })
})