import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the Tags page
 * Handles navigation and interactions with tag filtering
 */
export class TagsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly breadcrumb: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Tags', level: 1 });
    this.pageDescription = page.getByText('All the tags used in posts.');
    this.breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
    this.homeLink = this.breadcrumb.getByRole('link', { name: 'Home' });
  }

  /**
   * Navigate to the Tags page
   */
  async navigate() {
    await this.goto('/tags/');
  }

  /**
   * Get a tag link by name
   * @param tagName - The name of the tag
   * @returns Locator for the tag link
   */
  async getTag(tagName: string): Promise<Locator> {
    return this.page.getByRole('link', { name: tagName });
  }

  /**
   * Navigate to a specific tag's posts page
   * @param tagName - The name of the tag to navigate to
   */
  async navigateToTag(tagName: string) {
    await this.getTag(tagName).then((tag) => tag.click());
  }
}
