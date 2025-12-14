import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

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

  async navigate() {
    await this.goto('https://danielproctor.dev/tags/');
  }

  async getTag(tagName: string): Promise<Locator> {
    return this.page.getByRole('link', { name: tagName });
  }

  async navigateToTag(tagName: string) {
    await this.getTag(tagName).then((tag) => tag.click());
  }
}
