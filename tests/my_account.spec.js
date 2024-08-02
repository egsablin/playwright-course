import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { userDetails } from "../data/userDetails.js"

test.only("My account using cokie injection and mocking network requests", async ({ page, context }) => {

    const loginToken = await getLoginToken(userDetails.username, userDetails.password)

    // Mocking network requests

    await page.route('**/api/user**', async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ message: "Playwright message for mocking"})
        })
    })


    // Injecting cookie

    const cookie = {
        name: 'token',
        value: loginToken.token,
        domain: 'localhost',
        path: '/'
    }

    await context.addCookies([cookie]);

    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()

    // Solution from the course, which doesn't work. I found better one.
    //  await page.evaluate(([loginTokenWithIn]) => {
    //     document.cookie = "token=" + loginTokenWithIn
    //  }, [loginToken])
    //  await myAccount.visit()

    
})