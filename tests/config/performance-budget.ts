/**
 * Performance Budget Configuration
 *
 * This file defines performance budgets for the application.
 * Tests can reference these values to ensure performance stays within acceptable limits.
 *
 * Budgets are based on:
 * - Core Web Vitals recommendations
 * - Industry best practices
 * - Project-specific requirements
 */

export const PERFORMANCE_BUDGET = {
  /**
   * Page Load Metrics (milliseconds)
   */
  timing: {
    /** Time to DOM content loaded event */
    domContentLoaded: 2000,
    /** Time to full page load event */
    loadComplete: 3000,
    /** First Contentful Paint - when first content appears */
    firstContentfulPaint: 1800,
    /** Largest Contentful Paint - when main content is visible */
    largestContentfulPaint: 2500,
    /** Time to Interactive - when page becomes interactive */
    timeToInteractive: 3800,
    /** Total Blocking Time - sum of blocking time */
    totalBlockingTime: 300,
    /** Cumulative Layout Shift - visual stability score */
    cumulativeLayoutShift: 0.1,
  },

  /**
   * Network Metrics
   */
  network: {
    /** Maximum total page weight in KB */
    totalPageWeight: 1500,
    /** Maximum JavaScript bundle size in KB */
    javascriptSize: 400,
    /** Maximum CSS bundle size in KB */
    cssSize: 100,
    /** Maximum image size in KB */
    imageSize: 500,
    /** Maximum number of requests */
    requestCount: 50,
  },

  /**
   * Lighthouse Score Thresholds (0-100)
   */
  lighthouse: {
    performance: 70,
    accessibility: 90,
    bestPractices: 80,
    seo: 90,
    pwa: 50,
  },

  /**
   * Visual Regression Thresholds
   */
  visual: {
    /** Maximum pixel difference for screenshot comparisons */
    maxDiffPixels: 100,
    /** Maximum percentage difference (0-1) */
    maxDiffPercentage: 0.01,
  },

  /**
   * API Response Time Budgets (milliseconds)
   */
  api: {
    /** Fast API responses (e.g., cached data) */
    fast: 200,
    /** Normal API responses */
    normal: 500,
    /** Slow but acceptable API responses */
    slow: 1000,
  },
} as const;

/**
 * Environment-specific budgets
 */
export const ENVIRONMENT_BUDGETS = {
  development: {
    ...PERFORMANCE_BUDGET,
    // More lenient budgets for development
    timing: {
      ...PERFORMANCE_BUDGET.timing,
      domContentLoaded: 3000,
      loadComplete: 5000,
    },
  },
  staging: {
    ...PERFORMANCE_BUDGET,
  },
  production: {
    ...PERFORMANCE_BUDGET,
    // Stricter budgets for production
    timing: {
      ...PERFORMANCE_BUDGET.timing,
      domContentLoaded: 1500,
      loadComplete: 2500,
    },
  },
} as const;

/**
 * Get performance budget for current environment
 */
export function getPerformanceBudget() {
  const env = process.env.TEST_ENV || 'production';
  return ENVIRONMENT_BUDGETS[env as keyof typeof ENVIRONMENT_BUDGETS] || PERFORMANCE_BUDGET;
}
