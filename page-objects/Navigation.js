import { isDesktonViewport } from "../utils/checkViewport.js"
export class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = page.getByRole('link', { name: 'Checkout' })
        this.burgerButton = page.locator('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    goToCheckOut = async () => {

        if (!isDesktonViewport(this.page)) {
            await this.burgerButton.waitFor()
            await this.burgerButton.click()
        }
        await this.checkOutLink.waitFor()
        await this.checkOutLink.click()
        await this.page.waitForURL("/basket")
    }
}