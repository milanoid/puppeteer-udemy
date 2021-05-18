const puppeteer = require('puppeteer')

describe('My First Puppeteer Test', () => {
    it('should launch the browser', async function(){
        const browser = await puppeteer.launch({
            headless: false, 
            slowMo: 10, 
            devtools: false, 
        })
        const page = await browser.newPage()
        await page.goto('https://example.com/')
        const actualTitle = await page.title()
        const actualUrl = await page.url()
        // $eval(<element>, <callback function>)
        const actualText = await page.$eval('h1', element => element.textContent)
        const actualCount = await page.$$eval('p', element => element.length)
        console.log('Text in the H1: ' + actualTitle)
        console.log('Actual number of <p> tags: ' + actualCount)
        await browser.close()
    })
})