import { phoneItemListMock } from '@/mocks/phoneItemMocks';
import { buildQueryParams, fetchApi } from './utils';

beforeAll(() => {
  process.env.API_KEY = 'test-api-key';
});

describe('Given the buildQueryParams function', () => {
  describe('When it receives all defined params', () => {
    test('Then it should include all of them in the query string', () => {
      const params = buildQueryParams({
        search: 'samsung',
        limit: 10,
        offset: 0,
      });

      expect(params.toString()).toBe('search=samsung&limit=10&offset=0');
    });
  });

  describe('When it receives some undefined params', () => {
    test('Then it should filter out the undefined ones', () => {
      const params = buildQueryParams({ search: 'apple', limit: undefined });

      expect(params.toString()).toBe('search=apple');
    });
  });

  describe('When all params are undefined', () => {
    test('Then it should return an empty query string', () => {
      const params = buildQueryParams({
        search: undefined,
        limit: undefined,
      });

      expect(params.toString()).toBe('');
    });
  });
});

describe('Given the fetchApi function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When the response is successful', () => {
    test('Then it should return the parsed JSON data', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => phoneItemListMock,
      });

      const result = await fetchApi<typeof phoneItemListMock>(
        'https://api.example.com/products'
      );

      expect(result).toEqual(phoneItemListMock);
    });
  });

  describe('When the response fails', () => {
    test('Then it should throw an error with the API message', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: 'Not found',
          message: 'Product not found',
        }),
      });

      await expect(
        fetchApi('https://api.example.com/products/999')
      ).rejects.toThrow('Product not found');
    });
  });

  describe('When it is called with a url', () => {
    test('Then it should pass the correct headers and revalidate option', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await fetchApi('https://api.example.com/products');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/products',
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-api-key': expect.any(String),
          }),
          next: { revalidate: 3600 },
        })
      );
    });
  });
});
