export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
} as const;

export const TIMEOUT = {
  short: 5000,
  medium: 10000,
  long: 30000,
} as const;

export const PERFORMANCE_THRESHOLDS = {
  pageLoad: 5000,
  domContentLoaded: 2000,
  loadComplete: 3000,
  firstContentfulPaint: 1800,
  maxDiffPixels: 100,
} as const;

export const ACCESSIBILITY_THRESHOLDS = {
  maxViolations: 0,
  allowedImpacts: ['minor', 'moderate', 'serious', 'critical'],
} as const;
