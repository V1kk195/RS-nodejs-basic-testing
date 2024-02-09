// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const res = generateLinkedList([1, 2, 3]);

    expect(res).toStrictEqual({
      next: { next: { next: { next: null, value: null }, value: 3 }, value: 2 },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const res = generateLinkedList([1, 2, 3]);

    expect(res).toMatchSnapshot();
  });
});
