# Playwright DevContainer

A modern Playwright end-to-end testing project with TypeScript, leveraging Model Context Protocol (MCP) for enhanced test generation and automation. This project is configured to run in a DevContainer for a consistent development environment.

## 🚀 Features

- **TypeScript Support**: Fully typed test codebase with strict TypeScript configuration
- **Page Object Model**: Organized test structure with reusable page objects
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
   cd playwright-devcontainer
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
pnpm test tests/danielproctor-dev.spec.ts
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

## 🏗️ Project Structure

```
playwright-devcontainer/
├── .devcontainer/          # DevContainer configuration
├── tests/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── PostsPage.ts
│   │   └── TagsPage.ts
│   ├── fixtures/           # Test fixtures
│   │   └── index.ts
│   ├── data/               # Test data and constants
│   │   ├── constants.ts
│   │   └── types.ts
│   └── *.spec.ts           # Test files
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
├── .prettierrc.json       # Prettier configuration
└── package.json           # Project dependencies
```

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

## 🔧 DevContainer Usage

### What is a DevContainer?

A DevContainer provides a complete development environment inside a Docker container. This ensures:

- Consistent development environment across all team members
- No "works on my machine" issues
- Pre-configured tools and extensions
- Easy onboarding for new developers

### Features of this DevContainer

- Pre-installed Playwright and browsers
- Node.js v22 LTS
- Essential VS Code extensions:
  - Playwright Test for VS Code
  - ESLint
  - Prettier
  - GitHub Copilot
- Network access for running tests against external sites
- Port forwarding for viewing test reports

### Customizing the DevContainer

Edit `.devcontainer/devcontainer.json` to:

- Add VS Code extensions
- Configure environment variables
- Adjust port forwarding
- Install additional tools

## 📝 Writing Tests

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
import { SITE_CONFIG, BLOG_POSTS } from './data/constants';

test('example test using constants', async ({ page }) => {
  await page.goto(SITE_CONFIG.baseUrl);
  await page.getByRole('link', { name: BLOG_POSTS.fedoraSilverblue }).click();
});
```

## 🔄 Pre-commit Hooks

Pre-commit hooks automatically run before each commit to ensure code quality:

- **Linting**: Checks for code quality issues
- **Formatting**: Ensures consistent code style
- **Type checking**: Validates TypeScript types

If any check fails, the commit will be rejected. Fix the issues and try again.

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [VS Code Remote Containers](https://code.visualstudio.com/docs/remote/containers)
- [Model Context Protocol](https://modelcontextprotocol.io/)

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

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass: `pnpm test`
4. Run linting and formatting: `pnpm lint:fix && pnpm format`
5. Commit your changes (pre-commit hooks will run automatically)
6. Push and create a pull request

## 📄 License

ISC
