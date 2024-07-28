export class RegisterPage {
    constructor(page) {
        this.page = page
        this.username = page.getByPlaceholder('E-Mail')
        this.password = page.getByPlaceholder('Password')
        this.registerButton = page.getByRole('button', { name: "Register"})
    }

    signUpAsNewUser = async (email, password) => {
        await this.username.waitFor()
        await this.username.click()
        await this.username.fill(`${email}@gmail.com`)
        await this.password.waitFor()
        await this.password.click()
        await this.password.fill(password)
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL('/delivery-details')
    }
}