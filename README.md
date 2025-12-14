# Playwright Tests

A comprehensive Playwright end-to-end testing project with TypeScript, featuring multiple test types including functional, accessibility, performance, and visual regression testing. Leverages Model Context Protocol (MCP) for enhanced test generation and automation, configured to run in a DevContainer for a consistent development environment.

## 🚀 Features

- **TypeScript Support**: Fully typed test codebase with strict TypeScript configuration
- **Page Object Model**: Organized test structure with reusable page objects and fixtures
- **Multiple Test Types**:
  - Functional tests for core user journeys
  - Accessibility testing with @axe-core/playwright
  - Performance testing with playwright-lighthouse
  - Visual regression testing with screenshot comparisons
- **DevContainer Ready**: Pre-configured development container for consistent environments
- **Linting & Formatting**: ESLint and Prettier configured for code quality
- **Pre-commit Hooks**: Automated code checks before commits using Husky
- **Enhanced Reporting**: HTML and JUnit reports with screenshots and videos on failure
- **MCP Integration**: Model Context Protocol support for intelligent test generation

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) package manager
- [Docker](https://www.docker.com/) (for DevContainer usage)
- [Visual Studio Code](https://code.visualstudio.com/) with Remote-Containers extension (recommended)

## 🛠️ Setup Instructions

### Local Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd playwright-tests
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Install Playwright browsers**

   ```bash
   pnpm exec playwright install chromium
   ```

4. **Set up pre-commit hooks**
   ```bash
   pnpm exec husky install
   ```

### DevContainer Setup

1. **Open in VS Code**
   - Open the project folder in VS Code
   - When prompted, click "Reopen in Container"
   - Or use Command Palette (F1) and select "Remote-Containers: Reopen in Container"

2. **Wait for container to build**
   - The DevContainer will automatically install all dependencies
   - Playwright browsers will be pre-installed

## 🧪 Running Tests

### Run all tests

```bash
pnpm test
```

### Run specific test types

```bash
# Run only functional tests (excluding accessibility, performance, and visual tests)
pnpm test:functional

# Run accessibility tests
pnpm test:a11y

# Run performance tests
pnpm test:performance

# Run visual regression tests
pnpm test:visual
```

### Run tests in headed mode

```bash
pnpm test-headed
```

### Run tests with UI mode

```bash
pnpm test-ui
```

### Run specific test file

```bash
pnpm test tests/homepage.spec.ts
```

### Run tests in debug mode

```bash
pnpm exec playwright test --debug
```

## 📊 Viewing Test Reports

### HTML Report

```bash
pnpm report
```

The report will be available at `http://localhost:8080` (or `http://0.0.0.0:8080` in DevContainer)

### JUnit Report

JUnit XML reports are generated in `test-results/junit.xml` after each test run.

## 📸 Visual Regression Testing

### Run visual tests

```bash
pnpm test:visual
```

### Update snapshots after UI changes

```bash
pnpm snapshots:update
```

### Approve snapshot changes

```bash
pnpm snapshots:approve
```

### Compare snapshots without updating

```bash
pnpm snapshots:compare
```

For detailed visual regression testing workflow, see [docs/visual-regression-guide.md](docs/visual-regression-guide.md).

## 🎨 Code Quality

### Run linter

```bash
pnpm lint
```

### Fix linting issues

```bash
pnpm lint:fix
```

### Format code

```bash
pnpm format
```

### Check formatting

```bash
pnpm format:check
```

### Type checking

```bash
pnpm type-check
```

### Environment Variables

Configure the following in your CI/CD environment:

- `BASE_URL`: Application URL to test against

## 📝 Writing Tests

### Test Types

This project supports multiple test types using tags:

- **Functional Tests**: Core user journeys and functionality (no tag)
- **Accessibility Tests**: Tagged with `@a11y` - uses @axe-core/playwright
- **Performance Tests**: Tagged with `@performance` - uses playwright-lighthouse
- **Visual Tests**: Tagged with `@visual` - uses Playwright's screenshot comparison

Example:

```typescript
test('@a11y homepage should be accessible', async ({ page }) => {
  await page.goto('/');
  // accessibility testing logic
});
```

### Using Page Object Model

```typescript
import { test, expect } from './fixtures';

test('example test using page objects', async ({ homePage }) => {
  await homePage.navigate();
  await expect(homePage.logoLink).toBeVisible();
  await homePage.navigateToPosts();
});
```

### Using Constants

```typescript
import { SOCIAL_LINKS, BLOG_POSTS } from './data/content.constants';
import { NAVIGATION_URLS } from './data/navigation.constants';

test('example test using constants', async ({ page }) => {
  await page.goto(NAVIGATION_URLS.home);
  await page.getByRole('link', { name: BLOG_POSTS.fedoraSilverblue }).click();
});
```

### Using Utilities

```typescript
import { checkAccessibility } from './utils/accessibility';
import { measurePerformance } from './utils/performance';

test('example with utilities', async ({ page }) => {
  await page.goto('/');

  // Check accessibility
  await checkAccessibility(page);

  // Measure performance
  const metrics = await measurePerformance(page);
  expect(metrics.fcp).toBeLessThan(3000);
});
```

### Using Helpers

```typescript
import { waitForNetworkIdle, clearBrowserStorage } from './helpers/browser';
import { generateRandomEmail, retryWithBackoff } from './helpers/utils';

test('example with helpers', async ({ page }) => {
  // Clear storage before test
  await clearBrowserStorage(page);

  // Wait for network to settle
  await waitForNetworkIdle(page);

  // Generate test data
  const email = generateRandomEmail();
});
```

### Using Custom Assertions

```typescript
import {
  expectAccessibleHeading,
  expectValidFormField,
  expectResponsiveImage,
} from './utils/assertions';

test('example with custom assertions', async ({ page }) => {
  await page.goto('/');

  // Verify heading hierarchy
  const heading = page.getByRole('heading', { name: 'Welcome' });
  await expectAccessibleHeading(heading, 1);

  // Verify form field
  const emailField = page.getByLabel('Email');
  await expectValidFormField(emailField);

  // Verify responsive image
  const logo = page.getByAltText('Company Logo');
  await expectResponsiveImage(logo);
});
```

### Using Performance Budgets

```typescript
import { PERFORMANCE_BUDGET } from './config/performance-budget';
import { PERFORMANCE_THRESHOLDS } from './data/test.constants';

test('example with performance budgets', async ({ page }) => {
  await page.goto('/');

  const metrics = await checkPerformanceMetrics(page);

  expect(metrics.domContentLoaded).toBeLessThan(PERFORMANCE_THRESHOLDS.domContentLoaded);
  expect(metrics.loadComplete).toBeLessThan(PERFORMANCE_BUDGET.timing.loadComplete);
});
```

### Using Type-Safe Test Tags

```typescript
import { TEST_TAGS } from './data/types';

test(`${TEST_TAGS.ACCESSIBILITY} homepage should be accessible`, async ({ page }) => {
  await page.goto('/');
  // test logic
});

test(`${TEST_TAGS.PERFORMANCE} page should load quickly`, async ({ page }) => {
  await page.goto('/');
  // test logic
});
```

## 🔄 Pre-commit Hooks

Pre-commit hooks automatically run before each commit to ensure code quality:

- **Linting**: Checks for code quality issues
- **Formatting**: Ensures consistent code style
- **Type checking**: Validates TypeScript types

If any check fails, the commit will be rejected. Fix the issues and try again.

## 📚 Additional Resources

### Documentation

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [VS Code Remote Containers](https://code.visualstudio.com/docs/remote/containers)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Visual Regression Testing Guide](docs/visual-regression-guide.md)

### Project Features

- **Global Setup/Teardown**: [global-setup.ts](global-setup.ts), [global-teardown.ts](global-teardown.ts)
- **Custom Assertions**: [tests/utils/assertions.ts](tests/utils/assertions.ts)
- **Test Helpers**: [tests/helpers/](tests/helpers/)
- **Performance Budgets**: [tests/config/performance-budget.ts](tests/config/performance-budget.ts)
- **CI/CD Pipeline**: [.github/workflows/playwright.yml](.github/workflows/playwright.yml)

## 🚀 Next Steps

After cloning the repository, run these commands to complete the setup:

```bash
# Install all dependencies
pnpm install

# Initialize Husky (if not auto-installed)
pnpm exec husky install

# Format all files
pnpm format

# Run type checking
pnpm type-check

# Run tests to verify everything works
pnpm test
```
