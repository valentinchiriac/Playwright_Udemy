export class LoginPage{
    constructor(page){
        this.page = page

        //locator for Register button
        this.moveToSignupButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    moveToSignup = async () => {
        await this.moveToSignupButton.waitFor()
        await this.moveToSignupButton.click()
        await this.page.waitForURL(/\/signup/gm, {timeout: 3000})
    }
}