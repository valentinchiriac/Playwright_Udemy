import { expect } from "@playwright/test"

export class PaymentPage {
  constructor(page) {
    this.page = page;

    //locator pentru discount code
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = page.getByPlaceholder('Discount code')

    //locator pentru butonul de discount
    this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')

    this.totalValue = page.locator('[data-qa="total-value"]')
    this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
    this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')

    //writing the locators for the credit card fields
    // ex this.totalValue = page.locator('[data-qa="total-value"]')
    this.creditCardOwnerField = page.locator('[data-qa="credit-card-owner"]')
    this.creditCardNumberField = page.locator('[data-qa="credit-card-number"]')
    this.validUntillField = page.locator('[data-qa="valid-until"]')
    this.creditCardCVVField = page.locator('[data-qa="credit-card-cvc"]')

    this.payButton = page.locator('[data-qa="pay-button"]')
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText()
    await this.discountInput.waitFor()
    // Option 1 with await and expect: fill in the discount input
    await this.discountInput.fill(code)
    //compare the value entered with the input
    await expect(this.discountInput).toHaveValue(code)

    // //Option 2 with slow typing
    // await this.discountInput.focus()
    // await this.page.keyboard.type(code, {delay: 1000})
    // expect(await this.discountInput.inputValue()).toBe(code)

    expect(await this.discountedValue.isVisible()).toBe(false)
    expect(await this.discountActivatedMessage.isVisible()).toBe(false)
    await this.activateDiscountButton.waitFor()
    await this.activateDiscountButton.click()

    //check that the Discount Activated message is shown
    await this.discountActivatedMessage.waitFor()

    //check that there is a discount shown
    await this.discountedValue.waitFor()

    //check that the discounted price is smaller than the original one
    //first turn the string (342$) into a number by placing it into a constant
    const discountedvalueText = await this.discountedValue.innerText()
    const discountedValueOnlyStringNumber = discountedvalueText.replace("$", "")
    const discountValueNumber = parseInt(discountedValueOnlyStringNumber, 10)

    //check that the total price is smaller 
    const totalvalueText = await this.totalValue.innerText()
    const totalValueOnlyStringNumber = totalvalueText.replace("$", "")
    const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)

    //compare the two values before and after discount
    expect(discountValueNumber).toBeLessThan(totalValueNumber)
  };

  //creating another method for filling the payment details
  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerField.waitFor()
    await this.creditCardOwnerField.fill(paymentDetails.creditCardOwner)
    await this.creditCardNumberField.waitFor()
    await this.creditCardNumberField.fill(paymentDetails.creditCardNumber)
    await this.validUntillField.waitFor()
    await this.validUntillField.fill(paymentDetails.validUntill)
    await this.creditCardCVVField.waitFor()
    await this.creditCardCVVField.fill(paymentDetails.creditCardCVV)
    //await this.page.pause()
    
  }

  //create method for complete Payment used in the E2E
  completePayment = async () => {
    await this.payButton.waitFor()
    await this.payButton.click()
    await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
  }
}
