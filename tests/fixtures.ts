import { test as base, expect } from '@playwright/test';
import { TodoPage } from '@pages/TodoPage';

/**
 * A typed custom fixture. Declaring `todoPage: TodoPage` means every test
 * receives a ready, correctly-typed page object — and a spec that typos the
 * fixture name or misuses the object is caught by the type-check gate.
 */
type Fixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect };
