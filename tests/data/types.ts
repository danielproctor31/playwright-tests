export interface BlogPost {
  title: string;
  url: string;
  publishDate?: string;
  tags?: string[];
}

export interface SiteNavigation {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

/**
 * Test tag types for type-safe test categorization
 */
export type TestTag = '@a11y' | '@performance' | '@visual' | '@smoke' | '@regression';

/**
 * Test tags constants
 */
export const TEST_TAGS = {
  ACCESSIBILITY: '@a11y',
  PERFORMANCE: '@performance',
  VISUAL: '@visual',
  SMOKE: '@smoke',
  REGRESSION: '@regression',
} as const;
