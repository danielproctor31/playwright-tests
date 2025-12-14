import { Page, Locator, expect } from '@playwright/test';

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

/**
 * Custom assertion to verify heading hierarchy
 * @param locator - The locator to check for heading
 * @param level - Expected heading level (1-6)
 */
export async function expectAccessibleHeading(locator: Locator, level: number) {
  await expect(locator).toHaveRole('heading');
  await expect(locator).toHaveAttribute('aria-level', level.toString());
}

/**
 * Custom assertion to verify element is keyboard accessible
 * @param locator - The locator to verify
 */
export async function expectKeyboardAccessible(locator: Locator) {
  await expect(locator).toBeVisible();
  const tabIndex = await locator.getAttribute('tabindex');
  expect(tabIndex === null || parseInt(tabIndex) >= 0).toBe(true);
}

/**
 * Custom assertion to verify ARIA attributes are properly set
 * @param locator - The locator to check
 * @param attributes - Object with ARIA attribute names and expected values
 */
export async function expectProperAriaAttributes(
  locator: Locator,
  attributes: Record<string, string>
) {
  for (const [attr, value] of Object.entries(attributes)) {
    await expect(locator).toHaveAttribute(attr, value);
  }
}

/**
 * Custom assertion to verify form field validation
 * @param locator - The form field locator
 * @param hasLabel - Whether field should have an associated label
 */
export async function expectValidFormField(locator: Locator, hasLabel: boolean = true) {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEnabled();

  if (hasLabel) {
    const id = await locator.getAttribute('id');
    const ariaLabel = await locator.getAttribute('aria-label');
    const ariaLabelledBy = await locator.getAttribute('aria-labelledby');

    expect(id || ariaLabel || ariaLabelledBy).toBeTruthy();
  }
}

/**
 * Custom assertion to verify external links have proper attributes
 * @param locator - The link locator
 */
export async function expectSecureExternalLink(locator: Locator) {
  await expect(locator).toHaveAttribute('target', '_blank');
  await expect(locator).toHaveAttribute('rel', /noopener|noreferrer/);
}

/**
 * Custom assertion to verify list structure
 * @param page - Page object
 * @param selector - CSS selector or role
 * @param expectedCount - Expected number of list items
 */
export async function expectValidList(page: Page, selector: string, expectedCount?: number) {
  const list = page.locator(selector);
  await expect(list).toBeVisible();

  const items = list.locator('li, [role="listitem"]');
  if (expectedCount !== undefined) {
    await expect(items).toHaveCount(expectedCount);
  } else {
    await expect(items).not.toHaveCount(0);
  }
}

/**
 * Custom assertion to verify responsive image
 * @param locator - The image locator
 */
export async function expectResponsiveImage(locator: Locator) {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveAttribute('alt');

  // Check if image has srcset or is in a picture element
  const hasSrcset = await locator.getAttribute('srcset');
  const parentTag = await locator.evaluate((el) => el.parentElement?.tagName.toLowerCase());

  expect(hasSrcset || parentTag === 'picture').toBeTruthy();
}
