import {test} from "@playwright/test"
import { ProductsPage } from "../page-objects/Products.Page"
test.only ("New user full E2E test journey", async ({page}) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    await page.pause()
})