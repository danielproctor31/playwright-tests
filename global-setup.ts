import { FullConfig } from '@playwright/test';

/**
 * Global setup runs once before all tests
 * Use for operations that should happen once per test suite
 */
async function globalSetup(config: FullConfig) {
  // eslint-disable-next-line no-console
  console.log('🚀 Starting Playwright test suite...');

  const baseURL = config.projects[0]?.use?.baseURL;

  // eslint-disable-next-line no-console
  console.log(`Base URL: ${baseURL || 'Not configured'}`);
  // eslint-disable-next-line no-console
  console.log(`Workers: ${config.workers}`);
  // eslint-disable-next-line no-console
  console.log(`Projects: ${config.projects.map((p) => p.name).join(', ')}`);

  // Add any global setup logic here:
  // - Database seeding
  // - Starting mock servers
  // - Setting up test data
  // - Authentication token generation

  // Example: Verify test environment is accessible
  if (baseURL) {
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(baseURL);
      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.warn(`⚠️  Warning: Base URL ${baseURL} returned status ${response.status}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`✅ Base URL is accessible`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`❌ Error accessing base URL: ${error}`);
    }
  }

  // Return any data needed by tests (stored in process.env or similar)
}

export default globalSetup;
