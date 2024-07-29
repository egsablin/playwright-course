import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstName = page.locator('[data-qa="delivery-first-name"]')
        this.lastName = page.locator('[data-qa="delivery-last-name"]')
        this.street = page.locator('[data-qa="delivery-address-street"]')
        this.postcode = page.locator('[data-qa="delivery-postcode"]')
        this.city = page.locator('[data-qa="delivery-city"]')
        this.country = page.locator('[data-qa="country-dropdown"]')
        this.saveButton = page.locator('[data-qa="save-address-button"]')
        this.savedContainer = page.locator('[data-qa="saved-address-container"]')
        this.continueButton = page.locator('[data-qa="continue-to-payment-button"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
    }

    fillDetails = async (userAddress) => {

        await this.firstName.waitFor()
        await this.firstName.click()
        await this.firstName.fill(userAddress.firstName)
    
        await this.lastName.waitFor()
        await this.lastName.click()
        await this.lastName.fill(userAddress.lastName)

        await this.street.waitFor()
        await this.street.click()
        await this.street.fill(userAddress.street)

        await this.postcode.waitFor()
        await this.postcode.click()
        await this.postcode.fill(userAddress.postcode)

        await this.city.waitFor()
        await this.city.click()
        await this.city.fill(userAddress.city)

        await this.country.waitFor()
        await this.country.selectOption(userAddress.country)
    }

    saveDetails = async() => {
        const addressSavedBefore = await this.savedContainer.count()
        await this.saveButton.waitFor()
        await this.saveButton.click()
        await this.savedContainer.waitFor()
        await expect(this.savedContainer).toHaveCount(addressSavedBefore + 1)
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstName.inputValue())
        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastName.inputValue())
        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.street.inputValue())
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postcode.inputValue())
        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.city.inputValue())
        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.country.inputValue())
    }
    
    continueToPayment = async() => {
        await this.continueButton.waitFor()
        await this.continueButton.click()
        await this.page.waitForURL(/\/payment/)
    }



}