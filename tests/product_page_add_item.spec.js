import {test, expect} from "@playwright/test"

test ("Product Page Add to Basket", async({page}) => {
    await page.goto("/")

    //getByRole nu este foarte de ajutor in acest caz
    //const addToBasketButton = page.getByRole('button', {name:'Add to Basket'}).first()
    const addToBasketButton = page.locator('[data-qa="product-button"]').first()

    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    await expect(basketCounter).toHaveText("0")
    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText("Add to Basket")
    await addToBasketButton.click()
    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")

    const checkOutLink = page.getByRole('link', {name: 'Checkout'})
    await checkOutLink.waitFor()
    await checkOutLink.click()
    await page.waitForURL("/basket")
})

