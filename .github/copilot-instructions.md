# GitHub Copilot Instructions for Playwright MCP Project

## Project Context
This is a Playwright end-to-end testing project that utilizes the Model Context Protocol (MCP) for enhanced test generation and automation. The project focuses on browser automation testing using Playwright with JavaScript.

## Code Style and Standards
- Use modern JavaScript ES6+ syntax with imports/exports
- Follow Playwright's recommended patterns and best practices
- Use `test` and `expect` from `@playwright/test`
- Prefer async/await over promises
- Use descriptive test names that clearly indicate what is being tested
- Group related tests using `test.describe()` blocks

## File Structure
- Tests should be placed in the `./tests/` directory
- Use `.spec.js` or `.spec.ts` extension for test files
- Follow the naming convention: `[feature-name].spec.js`
- Organize tests by feature or page functionality

## Test Writing Guidelines

### Test Structure
- Always use the standard Playwright test structure:
  ```javascript
  test('descriptive test name', async ({ page }) => {
    // Arrange
    // Act  
    // Assert
  });
  ```

### Page Navigation
- Use `page.goto()` for navigation
- Always include proper waits when necessary
- Consider using `page.waitForLoadState()` for better reliability

### Element Selection
- Prefer `page.getByRole()`, `page.getByText()`, `page.getByLabel()` over CSS selectors
- Use data-testid attributes when semantic selectors aren't available
- Avoid brittle selectors that depend on DOM structure

### Assertions
- Use Playwright's built-in assertions (`expect(page).toHaveTitle()`, `expect(element).toBeVisible()`)
- Always wait for elements before asserting
- Use auto-waiting assertions when possible

### Error Handling
- Include proper error handling for flaky tests
- Use `test.setTimeout()` when tests need more time
- Consider using `test.slow()` for known slow tests

## MCP Integration
- Leverage MCP for generating comprehensive test scenarios
- Use MCP to understand application behavior and generate appropriate test cases
- Integrate with browser automation tools through MCP when available

## Common Patterns

### Page Object Model
When creating page objects:
```javascript
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Test Data Management
- Use fixtures for test data when possible
- Keep test data close to tests or in separate data files
- Consider using environment variables for configuration

### Parallel Testing
- Write tests to be independent and parallelizable
- Avoid shared state between tests
- Use unique test data to prevent conflicts

## Configuration Preferences
- Default to running tests in parallel unless explicitly needed otherwise
- Use headless mode by default, headed mode for debugging
- Enable tracing on test failures for debugging
- Use HTML reporter for comprehensive test results

## Debugging Tips
- Use `page.pause()` for interactive debugging
- Enable `--debug` flag for step-by-step execution
- Use `page.screenshot()` for visual debugging
- Leverage browser developer tools integration

## Anti-patterns to Avoid
- Don't use `page.waitForTimeout()` unless absolutely necessary
- Avoid hardcoded waits - use smart waits instead
- Don't rely on element positioning or styling for assertions
- Avoid testing implementation details - focus on user behavior
- Don't create overly complex test scenarios in a single test

## MCP-Specific Guidelines
- When generating tests via MCP, ensure they follow the above patterns
- Use MCP to analyze application flow and generate realistic user journeys
- Leverage MCP for test data generation and scenario planning
- Integrate MCP insights for better test coverage analysis