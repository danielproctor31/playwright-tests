import { Page, expect } from '@playwright/test';

/**
 * Custom assertion to verify page has correct meta tags
 */
export async function expectPageToHaveCorrectMeta(
  page: Page,
  expectedTitle: string,
  expectedDescription?: string
) {
  // Check page title
  await expect(page).toHaveTitle(expectedTitle);

  if (expectedDescription) {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', expectedDescription);
  }
}

/**
 * Custom assertion to verify navigation links are correct
 */
export async function expectValidNavigationLinks(
  page: Page,
  links: { text: string; href: string }[]
) {
  for (const link of links) {
    const navLink = page.getByRole('link', { name: link.text });
    await expect(navLink).toBeVisible();
    await expect(navLink).toHaveAttribute('href', link.href);
  }
}

/**
 * Custom assertion to verify element is accessible
 */
export async function expectElementToBeAccessible(page: Page, selector: string) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  await expect(element).toHaveAttribute('aria-label');
}

/**
 * Custom assertion to verify page loads within acceptable time
 */
export async function expectPageToLoadQuickly(page: Page, maxLoadTime: number = 3000) {
  const startTime = Date.now();
  await page.waitForLoadState('domcontentloaded');
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(maxLoadTime);
}

/**
 * Custom assertion to verify breadcrumb structure
 */
export async function expectValidBreadcrumbs(
  page: Page,
  expectedItems: { text: string; href?: string }[]
) {
  const breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
  await expect(breadcrumb).toBeVisible();

  for (const item of expectedItems) {
    if (item.href) {
      const link = breadcrumb.getByRole('link', { name: item.text });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', item.href);
    } else {
      await expect(breadcrumb.getByText(item.text)).toBeVisible();
    }
  }
}
