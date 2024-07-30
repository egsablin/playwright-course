import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.activatedDiscountText = page.locator('[data-qa="discount-active-message"]')
        this.regularPrice = page.locator('[data-qa="total-value"]')
        this.discountedPrice = page.locator('[data-qa="total-with-discount-value"]')
        this.ccFullNameInput = page.locator('[data-qa="credit-card-owner"]')
        this.ccNumberInput = page.locator('[name="credit-number"]')
        this.ccExpDateInput = page.locator('[data-qa="valid-until"]')
        this.ccCVVInput = page.locator('[data-qa="credit-card-cvc"]')
        this.paymentButton = page.locator('[data-qa="pay-button"]')
        this.confirmation = page.getByText('Thank you for shopping with us!')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const dicountCodeText = await this.discountCode.innerText();
        await this.discountInput.waitFor()
        await this.discountInput.click()

        // Options 1 for laggy input, using fill() with expect().toHaveValue()
        await this.discountInput.fill(dicountCodeText)
        await expect(this.discountInput).toHaveValue(dicountCodeText)
        // // Options 2 for laggy input, slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(dicountCodeText, { delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(dicountCodeText)
        expect(await this.activatedDiscountText).not.toBeVisible()
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        await this.activatedDiscountText.waitFor()
        expect(await this.activatedDiscountText.innerText()).toBe('Discount activated!')
        await this.regularPrice.waitFor()
        await this.discountedPrice.waitFor()
        const regularPriceNumber = parseInt(await this.regularPrice.innerText())
        const discountedPriceNumber = parseInt(await this.discountedPrice.innerText())
        expect(regularPriceNumber).toBeGreaterThan(discountedPriceNumber)
    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.ccFullNameInput.waitFor()
        await this.ccFullNameInput.fill(paymentDetails.ccFullName)
        await this.ccNumberInput.waitFor()
        await this.ccNumberInput.fill(paymentDetails.ccNumber)
        await this.ccExpDateInput.waitFor()
        await this.ccExpDateInput.fill(paymentDetails.ccExpDate)
        await this.ccCVVInput.waitFor()
        await this.ccCVVInput.fill(paymentDetails.ccCVV)
    }

    completePayment = async () => {
        await this.paymentButton.waitFor()
        await this.paymentButton.click()
        await this.page.waitForURL(/\/thank-you/)
        expect(this.confirmation).toBeVisible()
    }
}