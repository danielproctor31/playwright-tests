import { test, expect } from './fixtures';
import { ROUTES } from './data/navigation.constants';

test.describe('danielproctor.dev - Tags Page', () => {
  test.describe.configure({ retries: 2 });

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
    await expect(tagsPage.homeLink).toHaveAttribute('href', ROUTES.home);
  });

  test('should take screenshot for visual regression @visual', async ({ tagsPage }) => {
    await expect(tagsPage.page).toHaveScreenshot('tags-page.png');
  });
});
