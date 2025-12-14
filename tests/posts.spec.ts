import { test, expect } from './fixtures';
import { ROUTES } from './data/navigation.constants';
import { BLOG_POSTS } from './data/content.constants';

test.describe('danielproctor.dev - Posts Page', () => {
  test.describe.configure({ retries: 2 });

  test.beforeEach(async ({ postsPage }) => {
    await postsPage.navigate();
  });

  test('should display posts list', async ({ postsPage }) => {
    await expect(postsPage.pageHeading).toBeVisible();

    const fedoraPost = await postsPage.getPost(BLOG_POSTS.fedoraSilverblue);
    const gitHooksPost = await postsPage.getPost(BLOG_POSTS.gitHooks);
    const duckDnsPost = await postsPage.getPost(BLOG_POSTS.duckDns);

    await expect(fedoraPost).toBeVisible();
    await expect(gitHooksPost).toBeVisible();
    await expect(duckDnsPost).toBeVisible();
  });

  test('should have breadcrumb navigation', async ({ postsPage }) => {
    await expect(postsPage.breadcrumb).toBeVisible();
    await expect(postsPage.homeLink).toBeVisible();
    await expect(postsPage.homeLink).toHaveAttribute('href', ROUTES.home);
  });

  test('should display pagination', async ({ postsPage }) => {
    await expect(postsPage.pagination).toBeVisible();
    await expect(postsPage.page.getByText('1 / 2')).toBeVisible();
    await expect(postsPage.nextLink).toBeVisible();
  });

  test('should navigate to next page of posts', async ({ postsPage }) => {
    await postsPage.navigateToNextPage();
    await expect(postsPage.page).toHaveURL(/\/posts\/2\/$/);
  });

  test('should navigate to individual post', async ({ postsPage }) => {
    await postsPage.openPost(BLOG_POSTS.fedoraSilverblue);
    await expect(postsPage.page).toHaveURL(/\/posts\/silverblue\/$/);
  });

  test('should take screenshot for visual regression @visual', async ({ postsPage }) => {
    await expect(postsPage.page).toHaveScreenshot('posts-page.png');
  });
});
