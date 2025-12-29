export class ProductsPage {
    //a class is a collection of methods, functions
    constructor(page){
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
    }

    visit = async ()=>{
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        
        await this.addButtons.nth(index).waitFor()
        await this.addButtons.nth(index).click()
    }
}