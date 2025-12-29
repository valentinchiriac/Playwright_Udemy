import {expect} from "@playwright/test"

import { Navigation } from "./Navigation.js"

export class ProductsPage {
    //a class is a collection of methods, functions
    constructor(page){
        this.page = page

        //locator pentru butonul de "add product to basket"
        this.addButtons = page.locator('[data-qa="product-button"]')
        //locator pentru basket counter
        //this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    }

    visit = async ()=>{
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        //am creat o constanta (specificAddCounter) in care am stocat this.addButtons
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        // await specificAddButton
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getBasketCount()
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        const basketCountAfterAdding = await navigation.getBasketCount()
        expect(basketCountAfterAdding).toBe(basketCountBeforeAdding + 1)
    }
}