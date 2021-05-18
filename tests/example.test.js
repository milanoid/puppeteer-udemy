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
        console.log('TITLE: ' + actualTitle)
        console.log('URL: ' + actualUrl)
        await browser.close()
    })
})