import { expect } from "@playwright/test"
export class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = page.getByRole('link', { name: 'Checkout' })
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    goToCheckOut = async () => {
        await this.checkOutLink.waitFor()
        await this.checkOutLink.click()
        await this.page.waitForURL("/basket")
    }
}