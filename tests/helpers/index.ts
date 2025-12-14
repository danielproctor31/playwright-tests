/**
 * Test helpers module
 * 
 * This module provides common utilities for Playwright tests:
 * - browser.ts: Browser-specific helpers for network, animations, storage
 * - utils.ts: General utilities for data generation, text extraction, retries
 * 
 * Usage:
 * ```typescript
 * import { waitForNetworkIdle, clearBrowserStorage } from './helpers/browser';
 * import { generateRandomEmail, retryWithBackoff } from './helpers/utils';
 * ```
 */

export * from './browser';
export * from './utils';
