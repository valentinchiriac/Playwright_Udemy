export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('e-mail')
    this.passwordInput = page.getByPlaceholder('password')
    this.registerButton = page.getByRole('button', { name: 'Register' })
  }

  signUpNewUser = async () => {
    await this.page.pause()
    //fill email field
    await this.emailInput.waitFor()
    await this.emailInput.fill(`testuser${Date.now()}@mail.com`)
    //fill password field
    await this.passwordInput.waitFor()
    await this.passwordInput.fill("TestPassword123!")
    //click submit button
    await this.registerButton.waitFor()
    await this.registerButton.click()
    await this.page.pause()
  }
}
