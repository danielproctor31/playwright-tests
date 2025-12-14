import { Page } from '@playwright/test';

/**
 * Wait for all network activity to settle
 * @param page - Playwright page object
 * @param timeout - Maximum time to wait in milliseconds
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 10000) {
  // Using domcontentloaded as networkidle can be flaky
  await page.waitForLoadState('domcontentloaded', { timeout });
}

/**
 * Wait for all animations to complete
 * @param page - Playwright page object
 */
export async function waitForAnimations(page: Page) {
  await page.evaluate(() => {
    return Promise.all(
      // eslint-disable-next-line no-undef
      document.getAnimations().map((animation) => animation.finished)
    );
  });
}

/**
 * Scroll to element smoothly
 * @param page - Playwright page object
 * @param selector - CSS selector for the element
 */
export async function scrollToElement(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(300); // Small delay for smooth scroll
}

/**
 * Wait for element to stop moving
 * @param page - Playwright page object
 * @param selector - CSS selector for the element
 */
export async function waitForElementStability(page: Page, selector: string) {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible' });

  let previousBox = await element.boundingBox();
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(100);
  let currentBox = await element.boundingBox();

  while (
    previousBox &&
    currentBox &&
    (previousBox.x !== currentBox.x || previousBox.y !== currentBox.y)
  ) {
    previousBox = currentBox;
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(100);
    currentBox = await element.boundingBox();
  }
}

/**
 * Clear browser storage (cookies, localStorage, sessionStorage)
 * @param page - Playwright page object
 */
export async function clearBrowserStorage(page: Page) {
  await page.context().clearCookies();
  await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    localStorage.clear();
    // eslint-disable-next-line no-undef
    sessionStorage.clear();
  });
}

/**
 * Get console logs from the page
 * @param page - Playwright page object
 * @returns Array of console messages
 */
export function captureConsoleLogs(page: Page): string[] {
  const logs: string[] = [];
  page.on('console', (msg) => logs.push(`${msg.type()}: ${msg.text()}`));
  return logs;
}

/**
 * Intercept and block specific resource types
 * @param page - Playwright page object
 * @param resourceTypes - Array of resource types to block
 */
export async function blockResourceTypes(
  page: Page,
  resourceTypes: ('image' | 'stylesheet' | 'font' | 'media')[]
) {
  await page.route('**/*', (route) => {
    const type = route.request().resourceType();
    if (resourceTypes.includes(type as never)) {
      route.abort();
    } else {
      route.continue();
    }
  });
}

/**
 * Mock API response
 * @param page - Playwright page object
 * @param urlPattern - URL pattern to intercept
 * @param mockData - Mock data to return
 */
export async function mockApiResponse(page: Page, urlPattern: string, mockData: unknown) {
  await page.route(urlPattern, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData),
    });
  });
}
