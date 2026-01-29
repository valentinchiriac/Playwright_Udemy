
import { expect } from "@playwright/test"
import { BasePage } from "./BasePage.js"

export class DeliveryDetailsPage extends BasePage{
    constructor(page){
        super(page)

        this.firstNameInput = page.getByRole('textbox', { name: 'First name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' })
        this.streetInput = page.getByRole('textbox', { name: 'Street' })
        this.postcodeInput = page.getByRole('textbox', { name: 'Post code' })
        this.cityInput = page.getByRole('textbox', { name: 'City' })
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        //locator chosen from playwright Inspector for Save Address button
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.continueButton = page.getByRole('button', { name: 'Continue to Payment' })
        //locator for Address Container
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        //6 locators for the elements on the saved address container
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
        //locator for the Continue to Payment button
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async (deliveryDetails) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(deliveryDetails.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(deliveryDetails.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(deliveryDetails.street)
        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill(deliveryDetails.postcode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(deliveryDetails.city)
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(deliveryDetails.country)
    }

    //creating another method for saving the details of the user
    saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        //await this.savedAddressContainer.waitFor()
        //below we are expecting that the count of saved address containers is increased by 1 after saving
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        //wait for the first (new) address box to be filled
        
        await this.savedAddressFirstName.first().waitFor()
        // verify dinamicaly that the first name input is the one we inserted
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        
        // verify dinamicaly that the rest of elements are the ones inputed
        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        
        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        
        await this.savedAddressPostcode.first().waitFor()
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())
        
        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        
        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }

    //method for Continue to Payment
    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/,{ timeout: 3000 })
    }
}