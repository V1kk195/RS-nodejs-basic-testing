// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => {
  const originalModule = jest.requireActual<typeof import('axios')>('axios');

  return {
    ...originalModule,
    get: () => Promise.resolve({ data: 'some data' }),
    create: () => ({
      get: () => Promise.resolve({ data: 'some data' }),
    }),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/testPath');

    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://jsonplaceholder.typicode.com',
      }),
    );
  });

  test.skip('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
    const res = await throttledGetDataFromApi('/testPath');

    expect(res).toBe('some data');
  });
});
