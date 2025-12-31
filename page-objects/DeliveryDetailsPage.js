export class DeliveryDetailsPage{
    constructor(page){
        this.page = page

        this.firstNameInput = page.getByRole('textbox', { name: 'First name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' })
        this.streetInput = page.getByRole('textbox', { name: 'Street' })
        this.postcodeInput = page.getByRole('textbox', { name: 'Post code' })
        this.cityInput = page.getByRole('textbox', { name: 'City' })
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')

        this.continueButton = page.getByRole('button', { name: 'Continue to Payment' })
    }

    fillDetails = async () => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill("Ion")
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill("Romanescu")
        await this.streetInput.waitFor()
        await this.streetInput.fill("Che Guevara, 6C")
        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill("707020")
        await this.cityInput.waitFor()
        await this.cityInput.fill("New York")
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption("Bosnia and Herzegovina")
        await this.page.pause()
    }
}