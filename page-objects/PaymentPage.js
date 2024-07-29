import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const dicountCodeText = await this.discountCode.innerText();
        await this.discountInput.waitFor()
        await this.discountInput.click()
        await this.discountInput.fill(dicountCodeText)
        await expect(this.discountInput).toHaveValue(dicountCodeText)
    }
}