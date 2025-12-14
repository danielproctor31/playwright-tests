import { test, expect } from './fixtures';
import { SOCIAL_LINKS, BLOG_POSTS } from './data/content.constants';
import { VIEWPORTS } from './data/viewport.constants';
import { checkA11y, formatViolations } from './utils/accessibility';

test.describe('danielproctor.dev - Accessibility & UI @a11y', () => {
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

  test.describe('Responsiveness', () => {
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
});
