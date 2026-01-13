import { test } from "@playwright/test"
import { MyAccountPage } from "./../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js"
import { adminDetails } from "./../data/userDetails.js"

test("My account using cookie injection and mocking network request", async ({page}) => {
    //make a request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    
    page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType:"application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FOR MOCKING"}),
        })
    })
    
    //inject the login token into the browser
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.pause()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})