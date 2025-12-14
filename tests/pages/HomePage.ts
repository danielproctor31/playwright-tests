import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the danielproctor.dev homepage
 * Handles navigation and interactions with the homepage elements
 */
export class HomePage extends BasePage {
  readonly logoLink: Locator;
  readonly postsLink: Locator;
  readonly tagsLink: Locator;
  readonly searchLink: Locator;
  readonly recentPostsHeading: Locator;
  readonly allPostsLink: Locator;
  readonly skipToContentLink: Locator;
  readonly themeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logoLink = page.getByRole('link', { name: 'danielproctor.dev' });
    this.postsLink = page.getByRole('link', { name: 'Posts', exact: true });
    this.tagsLink = page.getByRole('link', { name: 'Tags' });
    this.searchLink = page.getByRole('link', { name: 'search' });
    this.recentPostsHeading = page.getByRole('heading', { name: 'Recent Posts', level: 2 });
    this.allPostsLink = page.getByRole('link', { name: 'All Posts' });
    this.skipToContentLink = page.getByRole('link', { name: 'Skip to content' });
    this.themeButton = page.getByRole('button', { name: /light|dark/ });
  }

  /**
   * Navigate to the homepage
   */
  async navigate() {
    await this.goto('/');
  }

  /**
   * Navigate to the Posts page
   */
  async navigateToPosts() {
    await this.postsLink.click();
  }

  /**
   * Navigate to the Tags page
   */
  async navigateToTags() {
    await this.tagsLink.click();
  }

  /**
   * Navigate to the Search page
   */
  async navigateToSearch() {
    await this.searchLink.click();
  }

  /**
   * Toggle the theme between light and dark mode
   */
  async toggleTheme() {
    await this.themeButton.click();
  }

  /**
   * Get a blog post link by title
   * @param title - The title of the blog post
   * @returns Locator for the blog post link
   */
  async getBlogPost(title: string): Promise<Locator> {
    return this.page.getByRole('link', { name: title });
  }
}
