import { test, expect } from './fixtures';
import { checkPerformanceMetrics } from './utils/performance';
import { PERFORMANCE_THRESHOLDS } from './data/viewport.constants';

test.describe('danielproctor.dev - Performance @performance', () => {
  test('should load homepage within acceptable time', async ({ homePage }) => {
    const startTime = Date.now();
    await homePage.navigate();
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.pageLoad);
  });

  test('should have good Core Web Vitals metrics', async ({ homePage }) => {
    await homePage.navigate();

    const metrics = await checkPerformanceMetrics(homePage.page);

    // Check performance thresholds
    expect(metrics.domContentLoaded).toBeLessThan(PERFORMANCE_THRESHOLDS.domContentLoaded);
    expect(metrics.loadComplete).toBeLessThan(PERFORMANCE_THRESHOLDS.loadComplete);
    expect(metrics.firstContentfulPaint).toBeLessThan(PERFORMANCE_THRESHOLDS.firstContentfulPaint);
  });

  test('should load posts page within acceptable time', async ({ postsPage }) => {
    const startTime = Date.now();
    await postsPage.navigate();
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.pageLoad);
  });

  test('should have optimized images and assets', async ({ homePage }) => {
    await homePage.navigate();
    await homePage.page.waitForLoadState('load');

    // Check for images and verify they're not broken
    const imageCount = await homePage.page.locator('img').count();
    const brokenImagesCount = await homePage.page.locator('img').evaluateAll((imgs) => {
      return imgs.filter((img) => {
        // eslint-disable-next-line no-undef
        return !(img as HTMLImageElement).complete || (img as HTMLImageElement).naturalHeight === 0;
      }).length;
    });

    // Verify no broken images (if images exist, they should load correctly)
    expect(brokenImagesCount).toBe(0);

    // Log image count for debugging
    // eslint-disable-next-line no-console
    console.log(`Found ${imageCount} images on the page`);
  });
});
