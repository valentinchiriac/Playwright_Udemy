export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkOutLink = page.getByRole("link", { name: "Checkout" });
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
    await this.checkOutLink.waitFor({ state: 'visible' });
    await this.checkOutLink.click();
    await this.page.waitForURL("/basket");
  };
}
