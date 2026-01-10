import { test } from "@playwright/test"
import { MyAccountPage } from "./../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js"

test.only("My account using cookie injection", async ({page}) => {
    //make a request to get login token
    const loginToken = await getLoginToken()
    console.warn({loginToken})
    //inject the login token into the browser
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
})