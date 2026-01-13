import {expect} from "@playwright/test"
import { timeout } from "../playwright.config"

export class Checkout {
  constructor(page) {
    this.page = page

    this.basketCards = page.locator('[data-qa="basket-card"]')
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
    this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
    //locator for "Continue to checkout" button
    this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor()
    const itemsBeforeRemoval = await this.basketCards.count()
    await this.basketItemPrice.first().waitFor()
    const allPriceTexts = await this.basketItemPrice.allInnerTexts()
    // [ '499$', '599$', '320$' ] -> [ 499, 599, 320 ]
    const justNumbers = allPriceTexts.map((element)=>{
        const withoutDollarSign = element.replace("$", "")
        return parseInt(withoutDollarSign, 10)
    })
    const smallestPrice = Math.min(...justNumbers)
    //... este Spread Operator, ajuta la "desfacerea" unui array in elemente separate
    const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
    const specificRemovebutton = this.basketItemRemoveButton.nth(smallestPriceIndex)
    await specificRemovebutton.waitFor()
    await specificRemovebutton.click()
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
  };

  continueToCheckout = async()=>{
    await this.continueToCheckoutButton.waitFor()
    await this.continueToCheckoutButton.click()
    await this.page.waitForURL(/\/login/gm, {timeout: 3000})
  }
}
