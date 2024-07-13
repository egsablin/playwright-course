import { test, expect } from "@playwright/test"
import { ProductPage } from "../page-objects/ProductPage"

test.only('new user full end-to-end journey', async ({ page }) => {
    
    const productPage = new ProductPage(page)
    await productPage.visit()
    await page.pause()
})