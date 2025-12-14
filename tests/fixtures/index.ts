import { test as base } from '@playwright/test';
import { HomePage, PostsPage, TagsPage } from '../pages';

/**
 * Custom fixtures for page objects
 * These fixtures provide pre-initialized page objects for each test
 */
type PageFixtures = {
  /** HomePage fixture - provides access to homepage page object */
  homePage: HomePage;
  /** PostsPage fixture - provides access to posts page object */
  postsPage: PostsPage;
  /** TagsPage fixture - provides access to tags page object */
  tagsPage: TagsPage;
};

/**
 * Extended test function with custom page fixtures
 * Use this instead of the base test function from @playwright/test
 *
 * @example
 * ```typescript
 * test('homepage test', async ({ homePage }) => {
 *   await homePage.navigate();
 *   await expect(homePage.logoLink).toBeVisible();
 * });
 * ```
 */
export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  postsPage: async ({ page }, use) => {
    const postsPage = new PostsPage(page);
    await use(postsPage);
  },

  tagsPage: async ({ page }, use) => {
    const tagsPage = new TagsPage(page);
    await use(tagsPage);
  },
});

export { expect } from '@playwright/test';

// Export types for better IDE support
export type { PageFixtures };
