import { Page } from '@playwright/test';

/**
 * Base Page Object class that all page objects extend from.
 * Provides common functionality for all pages.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL using the configured baseURL
   * @param url - Relative or absolute URL to navigate to
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to be fully loaded
   * Uses 'load' state which waits for the load event to be fired
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  /**
   * Get the current page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take a screenshot and save it with a descriptive name
   * @param name - Name for the screenshot file (without extension)
   * @param fullPage - Whether to capture the full scrollable page
   */
  async takeScreenshot(name: string, fullPage: boolean = false) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage,
    });
  }

  /**
   * Wait for a specific element to be visible
   * @param selector - CSS selector or text content
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForElement(selector: string, timeout: number = 30000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Scroll to the bottom of the page
   */
  async scrollToBottom() {
    await this.page.evaluate(() => {
      /* eslint-disable-next-line no-undef */
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  /**
   * Scroll to the top of the page
   */
  async scrollToTop() {
    await this.page.evaluate(() => {
      /* eslint-disable-next-line no-undef */
      window.scrollTo(0, 0);
    });
  }
}
