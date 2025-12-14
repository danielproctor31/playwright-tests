import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Run accessibility scan on a page and return violations
 */
export async function checkA11y(page: Page, options?: { includedImpacts?: string[] }) {
  const axeBuilder = new AxeBuilder({ page });

  if (options?.includedImpacts) {
    axeBuilder.withTags(options.includedImpacts);
  }

  const results = await axeBuilder.analyze();
  return results.violations;
}

/**
 * Get formatted accessibility violation message
 */
export function formatViolations(
  violations: Array<{
    impact?: string | null;
    help: string;
    description: string;
    helpUrl: string;
    nodes: unknown[];
  }>
) {
  return violations
    .map((violation) => {
      return `
[${violation.impact ?? 'unknown'}] ${violation.help}
  Description: ${violation.description}
  Help URL: ${violation.helpUrl}
  Affected nodes: ${violation.nodes.length}
`;
    })
    .join('\n');
}
