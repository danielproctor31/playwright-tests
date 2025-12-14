export const SITE_CONFIG = {
  baseUrl: 'https://danielproctor.dev',
  title: 'danielproctor.dev',
} as const;

export const ROUTES = {
  home: '/',
  posts: '/posts',
  tags: '/tags',
  search: '/search',
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/danielproctor31',
  linkedin: 'https://linkedin.com/in/daniel-proctor-uk',
  rss: '/rss.xml',
} as const;

export const BLOG_POSTS = {
  fedoraSilverblue: 'Fedora Silverblue',
  gitHooks: 'Git Hooks for .NET',
  duckDns: 'Duck DNS and Docker',
  helloWorld: 'Hello World!',
} as const;

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
