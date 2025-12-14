import { test, expect } from './fixtures';
import { SITE_CONFIG, ROUTES, BLOG_POSTS, SOCIAL_LINKS, VIEWPORTS } from './data/constants';

test.describe('danielproctor.dev - Homepage', () => {
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
});

test.describe('danielproctor.dev - Navigation', () => {
  test('should navigate to Posts page', async ({ homePage, postsPage }) => {
    await homePage.navigate();
    await homePage.navigateToPosts();

    await expect(postsPage.page).toHaveURL(`${SITE_CONFIG.baseUrl}/posts/`);
    await expect(postsPage.page).toHaveTitle('Posts | danielproctor.dev');
    await expect(postsPage.pageHeading).toBeVisible();
  });

  test('should navigate to Tags page', async ({ homePage, tagsPage }) => {
    await homePage.navigate();
    await homePage.navigateToTags();

    await expect(tagsPage.page).toHaveURL(`${SITE_CONFIG.baseUrl}/tags/`);
    await expect(tagsPage.page).toHaveTitle('Tags | danielproctor.dev');
    await expect(tagsPage.pageHeading).toBeVisible();
  });

  test('should navigate to Search page', async ({ homePage }) => {
    await homePage.navigate();
    await homePage.navigateToSearch();

    await expect(homePage.page).toHaveURL(`${SITE_CONFIG.baseUrl}/search/`);
  });

  test('should navigate back to homepage from logo', async ({ postsPage, homePage }) => {
    await postsPage.navigate();
    await homePage.logoLink.click();

    await expect(homePage.page).toHaveURL(`${SITE_CONFIG.baseUrl}/`);
  });
});

test.describe('danielproctor.dev - Posts Page', () => {
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
    await expect(postsPage.page).toHaveURL(`${SITE_CONFIG.baseUrl}/posts/2/`);
  });

  test('should navigate to individual post', async ({ postsPage }) => {
    await postsPage.openPost(BLOG_POSTS.fedoraSilverblue);
    await expect(postsPage.page).toHaveURL(`${SITE_CONFIG.baseUrl}/posts/silverblue/`);
  });
});

test.describe('danielproctor.dev - Tags Page', () => {
  test.beforeEach(async ({ tagsPage }) => {
    await tagsPage.navigate();
  });

  test('should display tags page heading', async ({ tagsPage }) => {
    await expect(tagsPage.pageHeading).toBeVisible();
  });

  test('should display tags description', async ({ tagsPage }) => {
    await expect(tagsPage.pageDescription).toBeVisible();
  });

  test('should display available tags', async ({ tagsPage }) => {
    const othersTag = await tagsPage.getTag('others');
    await expect(othersTag).toBeVisible();
    await expect(othersTag).toHaveAttribute('href', '/tags/others');
  });

  test('should have breadcrumb navigation', async ({ tagsPage }) => {
    await expect(tagsPage.breadcrumb).toBeVisible();
    await expect(tagsPage.homeLink).toBeVisible();
  });
});

test.describe('danielproctor.dev - Theme Toggle', () => {
  test('should toggle theme from light to dark', async ({ homePage }) => {
    await homePage.navigate();

    const initialThemeButton = homePage.page.getByRole('button', { name: 'light' });
    await expect(initialThemeButton).toBeVisible();

    await homePage.toggleTheme();
    await expect(homePage.page.getByRole('button', { name: 'dark' })).toBeVisible();
  });

  test('should persist theme selection across navigation', async ({ homePage }) => {
    await homePage.navigate();

    await homePage.page.getByRole('button', { name: 'light' }).click();
    await expect(homePage.page.getByRole('button', { name: 'dark' })).toBeVisible();

    await homePage.navigateToPosts();
    await expect(homePage.page.getByRole('button', { name: 'dark' })).toBeVisible();
  });
});

test.describe('danielproctor.dev - Footer', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should display social media links', async ({ homePage }) => {
    const githubLink = homePage.page.getByRole('link', { name: 'Github' });
    const linkedinLink = homePage.page.getByRole('link', { name: 'LinkedIn' });
    const rssLink = homePage.page.getByRole('link', { name: 'RSS' });

    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', SOCIAL_LINKS.github);

    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', SOCIAL_LINKS.linkedin);

    await expect(rssLink).toBeVisible();
    await expect(rssLink).toHaveAttribute('href', SOCIAL_LINKS.rss);
  });

  test('should display copyright information', async ({ homePage }) => {
    await expect(homePage.page.getByText('Copyright © 2025')).toBeVisible();
    await expect(homePage.page.getByText('All rights reserved.')).toBeVisible();
  });
});

test.describe('danielproctor.dev - Accessibility', () => {
  test('should have proper heading hierarchy on homepage', async ({ homePage }) => {
    await homePage.navigate();

    await expect(homePage.recentPostsHeading).toBeVisible();
    await expect(
      homePage.page.getByRole('heading', { name: BLOG_POSTS.fedoraSilverblue, level: 3 })
    ).toBeVisible();
  });

  test('should have proper heading hierarchy on Posts page', async ({ postsPage }) => {
    await postsPage.navigate();

    await expect(postsPage.pageHeading).toBeVisible();
    await expect(
      postsPage.page.getByRole('heading', { name: BLOG_POSTS.fedoraSilverblue, level: 2 })
    ).toBeVisible();
  });

  test('should have navigation landmarks', async ({ homePage }) => {
    await homePage.navigate();

    await expect(homePage.page.getByRole('navigation')).toBeVisible();
    await expect(homePage.page.getByRole('banner')).toBeVisible();
    await expect(homePage.page.getByRole('main')).toBeVisible();
    await expect(homePage.page.getByRole('contentinfo')).toBeVisible();
  });
});

test.describe('danielproctor.dev - Responsiveness', () => {
  test('should render correctly on mobile viewport', async ({ homePage }) => {
    await homePage.page.setViewportSize(VIEWPORTS.mobile);
    await homePage.navigate();

    await expect(homePage.logoLink).toBeVisible();
    await expect(homePage.recentPostsHeading).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ homePage }) => {
    await homePage.page.setViewportSize(VIEWPORTS.tablet);
    await homePage.navigate();

    await expect(homePage.logoLink).toBeVisible();
    await expect(homePage.recentPostsHeading).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ homePage }) => {
    await homePage.page.setViewportSize(VIEWPORTS.desktop);
    await homePage.navigate();

    await expect(homePage.logoLink).toBeVisible();
    await expect(homePage.recentPostsHeading).toBeVisible();
  });
});
