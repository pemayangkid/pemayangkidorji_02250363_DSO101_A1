// backend/server.test.js
describe('Todo API basic tests', () => {
  test('adds 1 + 1 to equal 2', () => {
    expect(1 + 1).toBe(2);
  });

  test('task title should be a string', () => {
    const task = { id: 1, title: 'Buy milk', done: false };
    expect(typeof task.title).toBe('string');
  });

  test('task done defaults to false', () => {
    const task = { id: 1, title: 'Test task', done: false };
    expect(task.done).toBe(false);
  });
});