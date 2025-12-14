import { FullConfig } from '@playwright/test';

/**
 * Global teardown runs once after all tests complete
 * Use for cleanup operations
 */
async function globalTeardown(config: FullConfig) {
  // eslint-disable-next-line no-console
  console.log('🏁 Test suite completed');

  // Add any global cleanup logic here:
  // - Cleanup test data
  // - Stop mock servers
  // - Generate reports
  // - Send notifications

  const projectNames = config.projects.map((p) => p.name).join(', ');
  // eslint-disable-next-line no-console
  console.log(`Tested projects: ${projectNames}`);
}

export default globalTeardown;
