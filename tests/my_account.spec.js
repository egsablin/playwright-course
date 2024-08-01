import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { userDetails } from "../data/userDetails.js"

test.only("My account using cokie injection", async ({ page, context }) => {

    const loginToken = await getLoginToken(userDetails.username, userDetails.password)
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

    // Solution from the course, which doesn't work. I found better one.
    //  await page.evaluate(([loginTokenWithIn]) => {
    //     document.cookie = "token=" + loginTokenWithIn
    //  }, [loginToken])
    //  await myAccount.visit()

    
})