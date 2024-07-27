import { expect } from "@playwright/test"

export class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')

    }

    removeCheapestProduct = async () => {

        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const justNumbers = allPriceTexts.map(element => {
            return parseInt(element);
        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        await this.basketItemRemoveButton.nth(smallestPriceIndex).waitFor()
        await this.basketItemRemoveButton.nth(smallestPriceIndex).click()
        await this.basketCards.first().waitFor()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }
}