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
   * @param timeout - Maximum time to wait in milliseconds (default: 30000ms)
   */
  async waitForElement(selector: string, timeout: number = 30000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for network to be idle
   * Useful for ensuring all dynamic content has loaded
   * @param options - Wait options including timeout
   */
  async waitForNetworkIdle(options?: { timeout?: number }) {
    await this.page.waitForLoadState('networkidle', options);
  }

  /**
   * Wait for DOM content to be loaded
   * @param options - Wait options including timeout
   */
  async waitForDOMContentLoaded(options?: { timeout?: number }) {
    await this.page.waitForLoadState('domcontentloaded', options);
  }

  /**
   * Scroll to the bottom of the page
   * Useful for infinite scroll or loading more content
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

  /**
   * Reload the current page
   * @param options - Navigation options including timeout
   */
  async reload(options?: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }) {
    await this.page.reload(options);
  }

  /**
   * Get the current page URL
   * @returns The current URL as a string
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Check if element is visible
   * @param selector - CSS selector to check
   * @returns True if element is visible, false otherwise
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Click on an element with optional force
   * @param selector - CSS selector of element to click
   * @param options - Click options including force, timeout
   */
  async click(selector: string, options?: { force?: boolean; timeout?: number }) {
    await this.page.locator(selector).click(options);
  }

  /**
   * Fill a form field with text
   * @param selector - CSS selector of the input field
   * @param value - Text value to fill
   */
  async fill(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Get text content of an element
   * @param selector - CSS selector of the element
   * @returns Text content or null if not found
   */
  async getTextContent(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }
}
