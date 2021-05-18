const puppeteer = require('puppeteer')

describe('My First Puppeteer Test', () => {
    it('should launch the browser', async function(){
        const browser = await puppeteer.launch({
            headless: false, 
            slowMo: 10, 
            devtools: false, 
        })
        const page = await browser.newPage()
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.type('#developer-name', 'Mike', { delay: 500 })      // input box
        await page.click('#tried-test-cafe', { clickCount: 1 })     // readio button
        await page.select('#preferred-interface', 'JavaScript API') // select box
        const myMessage = 'My comment'
        await page.type('#comments', myMessage)
        await page.click('#submit-button')
        await page.waitForTimeout(5000)
        await page.waitForSelector('.result-content')
        await browser.close()
    })
})