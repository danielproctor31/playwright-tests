import { test, expect } from './fixtures';
import { SITE_CONFIG } from './data/navigation.constants';

test.describe('danielproctor.dev - Navigation', () => {
  test.describe.configure({ retries: 2 });

  test('should navigate to Posts page', async ({ homePage, postsPage }) => {
    await homePage.navigate();
    await homePage.navigateToPosts();

    await expect(postsPage.page).toHaveURL(/\/posts\/$/);
    await expect(postsPage.page).toHaveTitle('Posts | danielproctor.dev');
    await expect(postsPage.pageHeading).toBeVisible();
  });

  test('should navigate to Tags page', async ({ homePage, tagsPage }) => {
    await homePage.navigate();
    await homePage.navigateToTags();

    await expect(tagsPage.page).toHaveURL(/\/tags\/$/);
    await expect(tagsPage.page).toHaveTitle('Tags | danielproctor.dev');
    await expect(tagsPage.pageHeading).toBeVisible();
  });

  test('should navigate to Search page', async ({ homePage }) => {
    await homePage.navigate();
    await homePage.navigateToSearch();

    await expect(homePage.page).toHaveURL(/\/search\/$/);
  });

  test('should navigate back to homepage from logo', async ({ postsPage, homePage }) => {
    await postsPage.navigate();
    await homePage.logoLink.click();

    await expect(homePage.page).toHaveURL(`${SITE_CONFIG.baseUrl}/`);
  });
});
