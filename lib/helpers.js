module.exports = {
	click: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			await page.click(selector)
		} catch (error) {
			throw new Error('Could not clikc on selector:  ${selector}')
		}
	},

	getText: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			let e = await page.$eval(selector, element => element.innerHTML)
			console.log(e)
			return e
		} catch (error) {
			throw new Error('Cannot get text from selector: ${selector}')
		}
	},

	getCount: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			let e = await page.$$eval(selector, element => element.length)
			console.log(e)
			return e
		} catch (error) {
			throw new Error('Cannot get count of selector: ${selector}')
		}
	},

	typeText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.type(selector, text)
		} catch (error) {
			throw new Error('Could not type into selector: ${selector}')
		}
	},

	waitForText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.waitForSelector((selector, text) => {
				document.querySelector(selector).innerText.includes(text),
					{},
					selector,
					text
			})
		} catch (error) {
			throw new Error('Text: ${text} not found for selector: ${selector}')
		}
	},

	shouldNotExists: async function (page, selector) {
		try {
			//await page.waitFor(() => !document.querySelector(selector))
			await page.waitForSelector(selector, { hidden: true })
		} catch (error) {
			throw new Error('Selector: ${selector} is visible, but it should not be')
		}
	},
}
