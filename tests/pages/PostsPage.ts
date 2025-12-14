import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the Posts page
 * Handles navigation and interactions with blog posts listing
 */
export class PostsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly breadcrumb: Locator;
  readonly homeLink: Locator;
  readonly pagination: Locator;
  readonly nextLink: Locator;
  readonly previousLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Posts', level: 1 });
    this.breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
    this.homeLink = this.breadcrumb.getByRole('link', { name: 'Home' });
    this.pagination = page.getByRole('navigation', { name: 'Pagination' });
    this.nextLink = page.getByRole('link', { name: 'Next' });
    this.previousLink = page.getByRole('link', { name: 'Previous' });
  }

  /**
   * Navigate to the Posts page
   */
  async navigate() {
    await this.goto('/posts/');
  }

  /**
   * Navigate to the next page of posts
   */
  async navigateToNextPage() {
    await this.nextLink.click();
  }

  /**
   * Navigate to the previous page of posts
   */
  async navigateToPreviousPage() {
    await this.previousLink.click();
  }

  /**
   * Navigate to the homepage via breadcrumb
   */
  async navigateToHome() {
    await this.homeLink.click();
  }

  /**
   * Get a post link by title
   * @param title - The title of the post
   * @returns Locator for the post link
   */
  async getPost(title: string): Promise<Locator> {
    return this.page.getByRole('link', { name: title });
  }

  /**
   * Open a specific post by clicking on it
   * @param title - The title of the post to open
   */
  async openPost(title: string) {
    await this.getPost(title).then((post) => post.click());
  }
}
