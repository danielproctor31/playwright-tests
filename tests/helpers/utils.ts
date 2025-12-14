import { Page } from '@playwright/test';

/**
 * Generate random string of specified length
 * @param length - Length of the string
 * @returns Random string
 */
export function generateRandomString(length: number = 10): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Generate random email address
 * @param domain - Email domain (default: example.com)
 * @returns Random email address
 */
export function generateRandomEmail(domain: string = 'example.com'): string {
  const username = generateRandomString(12);
  return `${username}@${domain}`;
}

/**
 * Format date to ISO string
 * @param date - Date object
 * @returns ISO formatted date string
 */
export function formatDateISO(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Retry function with exponential backoff
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param delay - Initial delay in milliseconds
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}

/**
 * Sleep for specified duration
 * @param ms - Milliseconds to sleep
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get current timestamp for unique identifiers
 * @returns Timestamp string
 */
export function getTimestamp(): string {
  return Date.now().toString();
}

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Extract text content from page
 * @param page - Playwright page object
 * @param selector - CSS selector
 * @returns Text content
 */
export async function extractText(page: Page, selector: string): Promise<string> {
  return (await page.locator(selector).textContent()) || '';
}

/**
 * Extract all text contents from multiple elements
 * @param page - Playwright page object
 * @param selector - CSS selector
 * @returns Array of text contents
 */
export async function extractAllTexts(page: Page, selector: string): Promise<string[]> {
  return page.locator(selector).allTextContents();
}

/**
 * Check if element exists without throwing
 * @param page - Playwright page object
 * @param selector - CSS selector
 * @returns True if element exists
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  return (await page.locator(selector).count()) > 0;
}
