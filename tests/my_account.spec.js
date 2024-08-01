import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"

test.only("My account using cokie injection", async ({ page }) => {

     const loginToken = await getLoginToken()
     console.warn({loginToken})
     const myAccount = new MyAccountPage(page)
     await myAccount.visit()
})