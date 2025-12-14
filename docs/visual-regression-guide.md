# Visual Regression Testing Guide

This guide explains how to work with visual regression tests and manage snapshots.

## Running Visual Tests

```bash
# Run all visual regression tests
pnpm test:visual

# Run in headed mode to see the browser
pnpm test:visual -- --headed

# Run with UI mode for debugging
pnpm test:visual -- --ui
```

## Understanding Snapshots

Visual regression tests capture screenshots of your application and compare them with baseline images (snapshots). Any pixel differences will cause the test to fail.

Snapshot files are stored in directories like:

- `tests/homepage.spec.ts-snapshots/`
- `tests/posts.spec.ts-snapshots/`

Each snapshot is named with the browser and viewport, e.g.:

- `homepage-chromium-linux.png`
- `posts-page-chromium-darwin.png`

## When Tests Fail

When visual tests fail due to differences:

1. **Review the differences**

   ```bash
   pnpm report
   ```

   Open the HTML report in your browser to see:
   - Expected (baseline) image
   - Actual (current) image
   - Diff highlighting the changes

2. **Determine if changes are expected**
   - ✅ **Expected**: You made intentional UI changes
   - ❌ **Unexpected**: Regression or unintended visual change

3. **Approve changes** (if expected)

   ```bash
   pnpm snapshots:approve
   ```

   This updates all snapshot baselines with the current screenshots.

4. **Re-run tests** to verify
   ```bash
   pnpm test:visual
   ```

## Managing Snapshots

### Update All Snapshots

```bash
pnpm snapshots:update
```

Use when you've made intentional UI changes across multiple tests.

### Compare Without Updating

```bash
pnpm snapshots:compare
```

Runs visual tests and shows differences without updating baselines.

### View Snapshot Summary

```bash
node scripts/manage-snapshots.ts summary
```

Shows a summary of all snapshot directories and counts.

## Best Practices

### 1. Review Before Approving

**Always review snapshot differences** before approving. Unexpected changes might indicate:

- CSS regression
- Rendering issues
- Animation timing problems
- Font loading issues

### 2. Commit Snapshots with Code

When you approve new snapshots, **commit them with your code changes**:

```bash
git add tests/**/*-snapshots/
git commit -m "Update snapshots for navigation redesign"
```

### 3. Platform-Specific Snapshots

Snapshots are platform-specific (Windows, macOS, Linux). CI/CD generates Linux snapshots. If testing locally on macOS:

- You'll have separate snapshot files
- Both are valid
- Commit both if they differ

### 4. Reduce Flakiness

To reduce flaky visual tests:

```typescript
test('@visual homepage should match snapshot', async ({ homePage }) => {
  await homePage.navigate();

  // Wait for animations to complete
  await homePage.page.waitForTimeout(500);

  // Disable animations
  await homePage.page.addStyleTag({
    content: '*, *::before, *::after { animation-duration: 0s !important; }',
  });

  await expect(homePage.page).toHaveScreenshot('homepage.png', {
    maxDiffPixels: 100, // Allow small differences
    animations: 'disabled',
  });
});
```

### 5. Test Stable States

Only capture snapshots of **stable UI states**:

- ✅ After page load
- ✅ After animations complete
- ✅ After data loads
- ❌ During transitions
- ❌ During loading states

## Configuration

Visual regression settings in `playwright.config.ts`:

```typescript
expect: {
  toHaveScreenshot: {
    maxDiffPixels: 100,      // Allow up to 100 pixels difference
    animations: 'disabled',   // Disable animations during capture
  },
}
```

Adjust `maxDiffPixels` based on your tolerance for differences.

## Troubleshooting

### Different Results on Different Machines

**Cause**: Font rendering, screen resolution, or OS differences.

**Solution**:

- Generate snapshots on the same platform as CI (usually Linux)
- Use Docker or DevContainer for consistency
- Accept platform-specific snapshots

### Tests Pass Locally But Fail in CI

**Cause**: CI uses different OS/browser versions.

**Solution**:

- Update snapshots in CI environment
- Download artifacts from CI and commit them

### Snapshots Keep Changing

**Cause**: Dynamic content (dates, animations, random data).

**Solution**:

- Mock dynamic content
- Use stable test data
- Mask regions that change:
  ```typescript
  await expect(page).toHaveScreenshot({
    mask: [page.locator('.timestamp')],
  });
  ```

## Advanced Usage

### Selective Snapshot Updates

Update only specific test file snapshots:

```bash
pnpm test:visual tests/homepage.spec.ts --update-snapshots
```

### Full Page Screenshots

```typescript
await expect(page).toHaveScreenshot('full-page.png', {
  fullPage: true,
});
```

### Element Screenshots

```typescript
const element = page.locator('.my-component');
await expect(element).toHaveScreenshot('component.png');
```

### Masking Dynamic Content

```typescript
await expect(page).toHaveScreenshot({
  mask: [page.locator('.timestamp'), page.locator('.live-chat')],
});
```
