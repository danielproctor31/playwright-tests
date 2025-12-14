import { test, expect } from './fixtures';
import { SITE_CONFIG, ROUTES } from './data/navigation.constants';
import { BLOG_POSTS } from './data/content.constants';

test.describe('danielproctor.dev - Homepage', () => {
  test.describe.configure({ retries: 2 });

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should load homepage with correct title', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle(SITE_CONFIG.title);
  });

  test('should display site logo/header', async ({ homePage }) => {
    await expect(homePage.logoLink).toBeVisible();
    await expect(homePage.logoLink).toHaveAttribute('href', ROUTES.home);
  });

  test('should display navigation menu with correct links', async ({ homePage }) => {
    await expect(homePage.postsLink).toBeVisible();
    await expect(homePage.postsLink).toHaveAttribute('href', ROUTES.posts);

    await expect(homePage.tagsLink).toBeVisible();
    await expect(homePage.tagsLink).toHaveAttribute('href', ROUTES.tags);

    await expect(homePage.searchLink).toBeVisible();
    await expect(homePage.searchLink).toHaveAttribute('href', ROUTES.search);
  });

  test('should display "Recent Posts" section', async ({ homePage }) => {
    await expect(homePage.recentPostsHeading).toBeVisible();
  });

  test('should display recent blog posts with titles and dates', async ({ homePage }) => {
    const fedoraPost = await homePage.getBlogPost(BLOG_POSTS.fedoraSilverblue);
    const gitHooksPost = await homePage.getBlogPost(BLOG_POSTS.gitHooks);
    const duckDnsPost = await homePage.getBlogPost(BLOG_POSTS.duckDns);
    const helloWorldPost = await homePage.getBlogPost(BLOG_POSTS.helloWorld);

    await expect(fedoraPost).toBeVisible();
    await expect(gitHooksPost).toBeVisible();
    await expect(duckDnsPost).toBeVisible();
    await expect(helloWorldPost).toBeVisible();

    // Verify posts have publication dates
    await expect(homePage.page.getByText('Published:', { exact: false })).toHaveCount(4);
  });

  test('should display "All Posts" link', async ({ homePage }) => {
    await expect(homePage.allPostsLink).toBeVisible();
    await expect(homePage.allPostsLink).toHaveAttribute('href', ROUTES.posts);
  });

  test('should have skip to content link for accessibility', async ({ homePage }) => {
    await expect(homePage.skipToContentLink).toBeVisible();
    await expect(homePage.skipToContentLink).toHaveAttribute('href', '#main-content');
  });

  test('should take screenshot for visual regression @visual', async ({ homePage }) => {
    await expect(homePage.page).toHaveScreenshot('homepage.png');
  });
});
