describe("Google Test", () => {
    it("should open google homepage", async () => {
        await page.goto('https://google.com')
        await page.waitForTimeout(5000)
    }, 15000);
});
