import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

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

  async navigate() {
    await this.goto('https://danielproctor.dev');
  }

  async navigateToPosts() {
    await this.postsLink.click();
  }

  async navigateToTags() {
    await this.tagsLink.click();
  }

  async navigateToSearch() {
    await this.searchLink.click();
  }

  async toggleTheme() {
    await this.themeButton.click();
  }

  async getBlogPost(title: string): Promise<Locator> {
    return this.page.getByRole('link', { name: title });
  }
}
