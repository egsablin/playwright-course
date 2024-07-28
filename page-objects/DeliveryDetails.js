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
        this.savedContainer = page.locator('[saved-address-container]')
        this.continueButton = page.locator('[data-qa="continue-to-payment-button"]')
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

        await this.saveButton.waitFor()
        await this.saveButton.click()

        await this.continueButton.waitFor()
        await this.continueButton.click()
    }
}