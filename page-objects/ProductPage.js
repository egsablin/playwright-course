import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"

export class ProductPage {
    constructor(page) {
        this.page = page
        this.addButtons = this.page.locator('[data-qa="product-button"]')
        this.selector = this.page.locator('[data-qa="sort-dropdown"]')
        this.productTitles = this.page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
    await this.page.goto('/')
    }

    sortByAscending = async () => {
        await this.selector.waitFor()
        await this.productTitles.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitles.allInnerTexts()
        await this.selector.selectOption('price-asc')
        const productTitlesAfterSorting = await this.productTitles.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)
    }

    addProductToBasket = async(index) => {
        const specificAddButton = this.addButtons.nth(index);
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText('Add to Basket')
        const navigation = new Navigation(this.page)
        const basketCounterBeforeAdding = await navigation.getBasketCount()
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText('Remove from Basket')
        const basketCounterAfterAdding = await navigation.getBasketCount()
        expect(basketCounterAfterAdding - basketCounterBeforeAdding).toBe(1)
    }
}