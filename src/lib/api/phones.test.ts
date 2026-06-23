import { phoneDetailMock } from '@/mocks/phoneDetailMock';
import { phoneItemListMock } from '@/mocks/phoneItemMocks';
import { getPhoneById, getPhones } from './phones';
import { fetchApi } from './utils';

beforeAll(() => {
  process.env.API_BASE_URL = 'https://api.example.com';
  process.env.API_KEY = 'test-api-key';
});

jest.mock('./utils', () => ({
  fetchApi: jest.fn(),
  buildQueryParams: jest.requireActual('./utils').buildQueryParams,
}));

const mockedFetchApi = fetchApi as jest.Mock;

describe('Given the getPhones function', () => {
  beforeEach(() => {
    mockedFetchApi.mockResolvedValue(phoneItemListMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When it is called without params', () => {
    test('Then it should call fetchApi with the products URL and no query string', async () => {
      await getPhones();

      expect(mockedFetchApi).toHaveBeenCalledWith(
        expect.stringContaining('/products')
      );
      expect(mockedFetchApi).toHaveBeenCalledWith(
        expect.not.stringContaining('search=')
      );
    });
  });

  describe('When it is called with a search param', () => {
    test('Then it should call fetchApi with the search query string', async () => {
      await getPhones('samsung');

      expect(mockedFetchApi).toHaveBeenCalledWith(
        expect.stringContaining('search=samsung')
      );
    });
  });

  describe('When it is called with all params', () => {
    test('Then it should call fetchApi with all query params in the URL', async () => {
      await getPhones('apple', 10, 5);

      expect(mockedFetchApi).toHaveBeenCalledWith(
        expect.stringContaining('search=apple')
      );
      expect(mockedFetchApi).toHaveBeenCalledWith(
        expect.stringContaining('limit=10')
      );
      expect(mockedFetchApi).toHaveBeenCalledWith(
        expect.stringContaining('offset=5')
      );
    });
  });

  describe('When the API returns a list of phones', () => {
    test('Then it should return the phone list', async () => {
      const result = await getPhones();

      expect(result).toEqual(phoneItemListMock);
    });
  });
});

describe('Given the getPhoneById function', () => {
  beforeEach(() => {
    mockedFetchApi.mockResolvedValue(phoneDetailMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When it is called with a phone id', () => {
    test('Then it should call fetchApi with the correct product URL', async () => {
      await getPhoneById('SMG-S24U');

      expect(mockedFetchApi).toHaveBeenCalledWith(
        expect.stringContaining('/products/SMG-S24U')
      );
    });
  });

  describe('When the API returns a phone detail', () => {
    test('Then it should return the phone detail', async () => {
      const result = await getPhoneById('SMG-S24U');

      expect(result).toEqual(phoneDetailMock);
    });
  });
});
