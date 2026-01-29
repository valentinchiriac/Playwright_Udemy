import {expect} from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "./../utils/isDesktopViewport.js"
import { BasePage } from "./BasePage.js"

//function to return true or false if desktop view > now moved to utils.isDesktopViewport.js file
// const isDesktopViewport = (page) => {
//     const size = page.viewportSize()
//     return size.width >= 800
// }

export class ProductsPage extends BasePage {
    //a class is a collection of methods, functions
    constructor(page){
        super(page)

        //locator pentru butonul de "add product to basket"
        this.addButtons = page.locator('[data-qa="product-button"]')
        //locator pentru basket counter
        //this.basketCounter = page.locator('[data-qa="header-basket-count"]')

        //locator pentru dropdown
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')

        //locator for product title
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async ()=>{
        await this.page.goto("/")
        await this.waitForPageLoad()
    }

    addProductToBasket = async (index) => {
        //am creat o constanta (specificAddCounter) in care am stocat this.addButtons
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        // await specificAddButton
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        //the below is only used in desktop viewport so moving into an if statement
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount()
        }
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
         //the below is only used in desktop viewport so moving into an if statement
         if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBe(basketCountBeforeAdding + 1)     
         }
       
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        //get the order of products by keeping the titles
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        //expect that the order of products changes
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)
        //await this.page.pause()
    }
}