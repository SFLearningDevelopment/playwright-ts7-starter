import { test, expect } from './fixtures';

// Typed test data — a malformed entry here would be caught by tsc --noEmit.
const todos: string[] = ['buy milk', 'write tests', 'ship it'];

test('starts with an empty list', async ({ todoPage }) => {
  await todoPage.expectCount(0);
});

test('can add a single todo', async ({ todoPage }) => {
  await todoPage.add('buy milk');
  await todoPage.expectCount(1);
  await todoPage.expectVisible('buy milk');
});

test('can add several todos', async ({ todoPage }) => {
  for (const item of todos) {
    await todoPage.add(item);
  }
  await todoPage.expectCount(todos.length);
});
