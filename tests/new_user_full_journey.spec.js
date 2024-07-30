import { test, expect } from "@playwright/test"
import { v4 as uuidv4 } from 'uuid';
import { ProductPage } from "../page-objects/ProductPage"
import { Navigation } from "../page-objects/Navigation"
import { Checkout } from "../page-objects/Checkout"
import { Login } from "../page-objects/Login"
import { RegisterPage } from "../page-objects/RegisterPage"
import { DeliveryDetails } from "../page-objects/DeliveryDetails"
import { userAddress } from "../data/deliveryDetails.js"
import { PaymentPage } from "../page-objects/PaymentPage"
import { paymentDetails } from "../data/paymentDetails.js"

test.only('new user full end-to-end journey', async ({ page }) => {
    
    const productPage = new ProductPage(page)
    await productPage.visit()
    await productPage.sortByAscending()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckOut()
    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.goToCheckoutPage()
    const login = new Login(page)
    await login.register()

    const register = new RegisterPage(page)
    const email = uuidv4()
    const password = uuidv4()
    await register.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completePayment()
})