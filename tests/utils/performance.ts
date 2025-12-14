import { Page } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

export interface LighthouseThresholds {
  performance?: number;
  accessibility?: number;
  'best-practices'?: number;
  seo?: number;
}

/**
 * Run Lighthouse audit on a page with custom thresholds
 */
export async function runLighthouseAudit(
  page: Page,
  url: string,
  thresholds: LighthouseThresholds = {
    performance: 70,
    accessibility: 90,
    'best-practices': 80,
    seo: 90,
  }
) {
  await playAudit({
    page,
    url,
    thresholds,
    port: 9222,
    reports: {
      formats: {
        html: true,
      },
      directory: './lighthouse-reports',
    },
  });
}

/**
 * Quick performance check - measures key metrics
 */
export async function checkPerformanceMetrics(page: Page) {
  const performanceMetrics = await page.evaluate(() => {
    /* eslint-disable no-undef */
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    /* eslint-enable no-undef */

    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: paint.find((p) => p.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find((p) => p.name === 'first-contentful-paint')?.startTime || 0,
    };
  });

  return performanceMetrics;
}
