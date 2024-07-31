import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"

test.only("My account using cokie injection", async ({ page }) => {
     const myAccount = new MyAccountPage(page)
     await myAccount.visit()
})