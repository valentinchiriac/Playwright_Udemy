import { isDesktopViewport } from "./../utils/isDesktopViewport";

export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkOutLink = page.getByRole("link", { name: "Checkout" });
    this.burgerMenuButton = page.locator('[data-qa="burger-menu-button"]');
  }

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };
  async getBasketCounter() {
    return await this.getBasketCount();
  }
  async getbasketCount() {
    return await this.getBasketCount();
  }

  goToCheckout = async () => {
    //if mobile view port, first open the burger menu button
    if (!isDesktopViewport(this.page)) {
      await this.burgerMenuButton.waitFor();
      await this.burgerMenuButton.click();
    }

    await this.checkOutLink.waitFor();
    await this.checkOutLink.click();
    await this.page.waitForURL("/basket");
  };
}
