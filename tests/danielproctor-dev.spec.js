import { test, expect } from '@playwright/test';

test.describe('danielproctor.dev - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://danielproctor.dev');
  });

  test('should load homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('danielproctor.dev');
  });

  test('should display site logo/header', async ({ page }) => {
    const logoLink = page.getByRole('link', { name: 'danielproctor.dev' });
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute('href', '/');
  });

  test('should display navigation menu with correct links', async ({ page }) => {
    const postsLink = page.getByRole('link', { name: 'Posts', exact: true });
    const tagsLink = page.getByRole('link', { name: 'Tags' });
    const searchLink = page.getByRole('link', { name: 'search' });

    await expect(postsLink).toBeVisible();
    await expect(postsLink).toHaveAttribute('href', '/posts');
    
    await expect(tagsLink).toBeVisible();
    await expect(tagsLink).toHaveAttribute('href', '/tags');
    
    await expect(searchLink).toBeVisible();
    await expect(searchLink).toHaveAttribute('href', '/search');
  });

  test('should display "Recent Posts" section', async ({ page }) => {
    const recentPostsHeading = page.getByRole('heading', { name: 'Recent Posts', level: 2 });
    await expect(recentPostsHeading).toBeVisible();
  });

  test('should display recent blog posts with titles and dates', async ({ page }) => {
    // Check for specific post titles
    const fedoraPost = page.getByRole('link', { name: 'Fedora Silverblue' });
    const gitHooksPost = page.getByRole('link', { name: 'Git Hooks for .NET' });
    const duckDnsPost = page.getByRole('link', { name: 'Duck DNS and Docker' });
    const helloWorldPost = page.getByRole('link', { name: 'Hello World!' });

    await expect(fedoraPost).toBeVisible();
    await expect(gitHooksPost).toBeVisible();
    await expect(duckDnsPost).toBeVisible();
    await expect(helloWorldPost).toBeVisible();

    // Verify posts have publication dates
    await expect(page.getByText('Published:', { exact: false })).toHaveCount(4);
  });

  test('should display "All Posts" link', async ({ page }) => {
    const allPostsLink = page.getByRole('link', { name: 'All Posts' });
    await expect(allPostsLink).toBeVisible();
    await expect(allPostsLink).toHaveAttribute('href', '/posts');
  });

  test('should have skip to content link for accessibility', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});

test.describe('danielproctor.dev - Navigation', () => {
  test('should navigate to Posts page', async ({ page }) => {
    await page.goto('https://danielproctor.dev');
    
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    
    await expect(page).toHaveURL('https://danielproctor.dev/posts/');
    await expect(page).toHaveTitle('Posts | danielproctor.dev');
    await expect(page.getByRole('heading', { name: 'Posts', level: 1 })).toBeVisible();
  });

  test('should navigate to Tags page', async ({ page }) => {
    await page.goto('https://danielproctor.dev');
    
    await page.getByRole('link', { name: 'Tags' }).click();
    
    await expect(page).toHaveURL('https://danielproctor.dev/tags/');
    await expect(page).toHaveTitle('Tags | danielproctor.dev');
    await expect(page.getByRole('heading', { name: 'Tags', level: 1 })).toBeVisible();
  });

  test('should navigate to Search page', async ({ page }) => {
    await page.goto('https://danielproctor.dev');
    
    await page.getByRole('link', { name: 'search' }).click();
    
    await expect(page).toHaveURL('https://danielproctor.dev/search/');
  });

  test('should navigate back to homepage from logo', async ({ page }) => {
    await page.goto('https://danielproctor.dev/posts/');
    
    await page.getByRole('link', { name: 'danielproctor.dev' }).click();
    
    await expect(page).toHaveURL('https://danielproctor.dev/');
  });
});

test.describe('danielproctor.dev - Posts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://danielproctor.dev/posts/');
  });

  test('should display posts list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Posts', level: 1 })).toBeVisible();
    
    // Verify posts are displayed
    await expect(page.getByRole('link', { name: 'Fedora Silverblue' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Git Hooks for .NET' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Duck DNS and Docker' })).toBeVisible();
  });

  test('should have breadcrumb navigation', async ({ page }) => {
    const breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
    await expect(breadcrumb).toBeVisible();
    
    const homeLink = breadcrumb.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/');
  });

  test('should display pagination', async ({ page }) => {
    const pagination = page.getByRole('navigation', { name: 'Pagination' });
    await expect(pagination).toBeVisible();
    
    // Check for page indicator
    await expect(page.getByText('1 / 2')).toBeVisible();
    
    // Check for next link
    const nextLink = page.getByRole('link', { name: 'Next' });
    await expect(nextLink).toBeVisible();
  });

  test('should navigate to next page of posts', async ({ page }) => {
    const nextLink = page.getByRole('link', { name: 'Next' });
    await nextLink.click();
    
    await expect(page).toHaveURL('https://danielproctor.dev/posts/2/');
  });

  test('should navigate to individual post', async ({ page }) => {
    await page.getByRole('link', { name: 'Fedora Silverblue' }).click();
    
    await expect(page).toHaveURL('https://danielproctor.dev/posts/silverblue/');
  });
});

test.describe('danielproctor.dev - Tags Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://danielproctor.dev/tags/');
  });

  test('should display tags page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tags', level: 1 })).toBeVisible();
  });

  test('should display tags description', async ({ page }) => {
    await expect(page.getByText('All the tags used in posts.')).toBeVisible();
  });

  test('should display available tags', async ({ page }) => {
    const othersTag = page.getByRole('link', { name: 'others' });
    await expect(othersTag).toBeVisible();
    await expect(othersTag).toHaveAttribute('href', '/tags/others');
  });

  test('should have breadcrumb navigation', async ({ page }) => {
    const breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
    await expect(breadcrumb).toBeVisible();
    
    const homeLink = breadcrumb.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
  });
});

test.describe('danielproctor.dev - Theme Toggle', () => {
  test('should toggle theme from light to dark', async ({ page }) => {
    await page.goto('https://danielproctor.dev');
    
    // Initial theme button should show "light"
    const themeButton = page.getByRole('button', { name: 'light' });
    await expect(themeButton).toBeVisible();
    
    // Click to toggle
    await themeButton.click();
    
    // After toggle, button should show "dark"
    await expect(page.getByRole('button', { name: 'dark' })).toBeVisible();
  });

  test('should persist theme selection across navigation', async ({ page }) => {
    await page.goto('https://danielproctor.dev');
    
    // Toggle to dark theme
    await page.getByRole('button', { name: 'light' }).click();
    await expect(page.getByRole('button', { name: 'dark' })).toBeVisible();
    
    // Navigate to another page
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    
    // Theme should persist
    await expect(page.getByRole('button', { name: 'dark' })).toBeVisible();
  });
});

test.describe('danielproctor.dev - Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://danielproctor.dev');
  });

  test('should display social media links', async ({ page }) => {
    const githubLink = page.getByRole('link', { name: 'Github' });
    const linkedinLink = page.getByRole('link', { name: 'LinkedIn' });
    const rssLink = page.getByRole('link', { name: 'RSS' });

    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/danielproctor31');
    
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/daniel-proctor-uk');
    
    await expect(rssLink).toBeVisible();
    await expect(rssLink).toHaveAttribute('href', '/rss.xml');
  });

  test('should display copyright information', async ({ page }) => {
    await expect(page.getByText('Copyright © 2025')).toBeVisible();
    await expect(page.getByText('All rights reserved.')).toBeVisible();
  });
});

test.describe('danielproctor.dev - Accessibility', () => {
  test('should have proper heading hierarchy on homepage', async ({ page }) => {
    await page.goto('https://danielproctor.dev');
    
    // Check h2 for Recent Posts
    await expect(page.getByRole('heading', { name: 'Recent Posts', level: 2 })).toBeVisible();
    
    // Check h3 for individual posts
    await expect(page.getByRole('heading', { name: 'Fedora Silverblue', level: 3 })).toBeVisible();
  });

  test('should have proper heading hierarchy on Posts page', async ({ page }) => {
    await page.goto('https://danielproctor.dev/posts/');
    
    // Check h1 for page title
    await expect(page.getByRole('heading', { name: 'Posts', level: 1 })).toBeVisible();
    
    // Check h2 for individual posts
    await expect(page.getByRole('heading', { name: 'Fedora Silverblue', level: 2 })).toBeVisible();
  });

  test('should have navigation landmarks', async ({ page }) => {
    await page.goto('https://danielproctor.dev');
    
    const navigation = page.getByRole('navigation');
    await expect(navigation).toBeVisible();
    
    const banner = page.getByRole('banner');
    await expect(banner).toBeVisible();
    
    const main = page.getByRole('main');
    await expect(main).toBeVisible();
    
    const contentinfo = page.getByRole('contentinfo');
    await expect(contentinfo).toBeVisible();
  });
});

test.describe('danielproctor.dev - Responsiveness', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://danielproctor.dev');
    
    await expect(page.getByRole('link', { name: 'danielproctor.dev' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recent Posts', level: 2 })).toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('https://danielproctor.dev');
    
    await expect(page.getByRole('link', { name: 'danielproctor.dev' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recent Posts', level: 2 })).toBeVisible();
  });

  test('should render correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://danielproctor.dev');
    
    await expect(page.getByRole('link', { name: 'danielproctor.dev' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recent Posts', level: 2 })).toBeVisible();
  });
});
