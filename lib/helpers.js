module.exports = {
    click: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error("Could not clikc on selector:  $(selector)")
        }
    },

    getText: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            let e = await page.$eval(selector, element => element.innerHTML)
            console.log(e)
            return e
        } catch (error) {
            throw new Error("Cannot get text from selector: $(selector)")
        }
    },

    getCount: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            let e = await page.$$eval(selector, element => element.length)
            console.log(e);
            return e
        } catch (error) {
            throw new Error("Cannot get count of selector: $(selector)")
        }
    }
}