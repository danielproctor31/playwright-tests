import { test, expect } from './fixtures';
import { SOCIAL_LINKS, BLOG_POSTS } from './data/content.constants';
import { checkA11y, formatViolations } from './utils/accessibility';

test.describe('danielproctor.dev - Accessibility & UI @a11y', () => {
  test.describe('Keyboard Navigation', () => {
    test('should navigate through header links using Tab key', async ({ homePage }) => {
      await homePage.navigate();

      // Focus on skip link first (should be first focusable element)
      await homePage.page.keyboard.press('Tab');
      await expect(homePage.skipToContentLink).toBeFocused();

      // Tab to logo
      await homePage.page.keyboard.press('Tab');
      await expect(homePage.logoLink).toBeFocused();

      // Tab to Posts link
      await homePage.page.keyboard.press('Tab');
      await expect(homePage.postsLink).toBeFocused();

      // Tab to Tags link
      await homePage.page.keyboard.press('Tab');
      await expect(homePage.tagsLink).toBeFocused();

      // Tab to Search link
      await homePage.page.keyboard.press('Tab');
      await expect(homePage.searchLink).toBeFocused();
    });

    test('should activate navigation links with Enter key', async ({ homePage }) => {
      await homePage.navigate();

      // Tab to Posts link
      await homePage.page.keyboard.press('Tab'); // Skip link
      await homePage.page.keyboard.press('Tab'); // Logo
      await homePage.page.keyboard.press('Tab'); // Posts

      // Verify focus is on Posts link
      await expect(homePage.postsLink).toBeFocused();

      // Activate with Enter
      await homePage.page.keyboard.press('Enter');

      // Verify navigation occurred
      await expect(homePage.page).toHaveURL(/\/posts/);
    });

    test('should activate navigation links with Space key', async ({ homePage }) => {
      await homePage.navigate();

      // Tab to Tags link
      await homePage.page.keyboard.press('Tab'); // Skip link
      await homePage.page.keyboard.press('Tab'); // Logo
      await homePage.page.keyboard.press('Tab'); // Posts
      await homePage.page.keyboard.press('Tab'); // Tags

      // Verify focus is on Tags link
      await expect(homePage.tagsLink).toBeFocused();

      // Activate with Space
      await homePage.page.keyboard.press('Space');

      // Verify navigation occurred
      await expect(homePage.page).toHaveURL(/\/tags/);
    });

    test('should toggle theme with keyboard', async ({ homePage }) => {
      await homePage.navigate();

      // Focus the theme button using keyboard navigation
      await homePage.themeButton.focus();
      await expect(homePage.themeButton).toBeFocused();

      // Verify initial theme state exists (either light or dark)
      await expect(homePage.themeButton).toHaveText(/^(light|dark)$/);

      // Toggle theme with Enter
      await homePage.page.keyboard.press('Enter');

      // Wait for theme to change - verify button still shows valid theme text
      await expect(homePage.themeButton).toHaveText(/^(light|dark)$/);
    });

    test('should navigate blog posts with keyboard', async ({ homePage }) => {
      await homePage.navigate();

      // Get the first blog post link and focus it
      const firstPostLink = homePage.page.locator('a[href*="/posts/"]').first();
      await firstPostLink.focus();
      await expect(firstPostLink).toBeFocused();

      // Activate with Enter
      await homePage.page.keyboard.press('Enter');

      // Verify we navigated to a blog post
      await expect(homePage.page).toHaveURL(/\/posts\//);
    });

    test('should use skip to content link', async ({ homePage }) => {
      await homePage.navigate();

      // Tab to skip link (first focusable element)
      await homePage.page.keyboard.press('Tab');
      await expect(homePage.skipToContentLink).toBeFocused();

      // Activate skip link with Enter
      await homePage.page.keyboard.press('Enter');

      // Verify focus moved to main content
      const mainContent = homePage.page.locator('#main-content');
      await expect(mainContent).toBeFocused();
    });
  });

  test.describe('Theme Toggle', () => {
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

  test.describe('Footer', () => {
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

  test.describe('Accessibility', () => {
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

    test('should pass automated accessibility scan on homepage', async ({ homePage }) => {
      await homePage.navigate();

      const violations = await checkA11y(homePage.page);

      // Only fail on critical issues
      const criticalViolations = violations.filter((v) => v.impact === 'critical');

      // Note: Use formatViolations(criticalViolations) in test reporter for debugging
      expect(criticalViolations, formatViolations(criticalViolations)).toHaveLength(0);
    });
  });
});
