export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('e-mail')
    this.passwordInput = page.getByPlaceholder('password')
    this.registerButton = page.getByRole('button', { name: 'Register' })
  }

  signUpNewUser = async (email, password) => {
    //fill email field
    await this.emailInput.waitFor()
    //create a unique emailaddress based on uuid
    //const emailId = uuidv4()
    //const email = emailId + "@gmail.com"
    await this.emailInput.fill(email)
    //create a email address unique, based on 'now' date
    //await this.emailInput.fill(`testuser${Date.now()}@mail.com`)
    //fill password field
    //const password = uuidv4()
    await this.passwordInput.waitFor()
    await this.passwordInput.fill(password)
    //click submit button
    await this.registerButton.waitFor()
    await this.registerButton.click()
    //await this.page.pause()
  }
}
