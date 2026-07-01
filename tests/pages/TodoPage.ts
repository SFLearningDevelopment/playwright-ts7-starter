import { type Page, type Locator, expect } from '@playwright/test';

/**
 * A typed page object for the TodoMVC demo app.
 * Wraps the page's locators and actions so specs read cleanly and
 * the type-checker (tsgo --noEmit) can catch misuse before any browser runs.
 */
export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-title');
  }

  async goto(): Promise<void> {
    // TodoMVC is a hash-routed SPA; navigate to the app route explicitly,
    // then wait for the input to be visible before interacting.
    await this.page.goto('/todomvc/#/');
    await this.newTodoInput.waitFor({ state: 'visible' });
  }

  async add(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async expectCount(count: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(count);
  }

  async expectVisible(text: string): Promise<void> {
    await expect(this.todoItems.filter({ hasText: text })).toBeVisible();
  }
}
