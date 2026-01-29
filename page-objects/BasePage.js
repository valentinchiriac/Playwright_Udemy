export class BasePage {
  constructor(page) {
    this.page = page
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle')
  }

  async fillField(locator, value) {
    await locator.waitFor()
    await locator.fill(value)
  }

  async click(locator) {
    await locator.waitFor()
    await locator.click()
  }

  // Subclasses can implement these if needed
  async navigate() {
    throw new Error('navigate() must be implemented by subclass')
  }

  async verifyPageLoaded() {
    throw new Error('verifyPageLoaded() must be implemented by subclass')
  }
}
