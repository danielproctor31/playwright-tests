import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

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

  async navigate() {
    await this.goto('https://danielproctor.dev/posts/');
  }

  async navigateToNextPage() {
    await this.nextLink.click();
  }

  async navigateToPreviousPage() {
    await this.previousLink.click();
  }

  async navigateToHome() {
    await this.homeLink.click();
  }

  async getPost(title: string): Promise<Locator> {
    return this.page.getByRole('link', { name: title });
  }

  async openPost(title: string) {
    await this.getPost(title).then((post) => post.click());
  }
}
