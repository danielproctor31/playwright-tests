import { test as base } from '@playwright/test';
import { HomePage, PostsPage, TagsPage } from '../pages';

type PageFixtures = {
  homePage: HomePage;
  postsPage: PostsPage;
  tagsPage: TagsPage;
};

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
