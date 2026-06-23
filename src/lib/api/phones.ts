import type { PhoneDetail, PhoneItem } from '../types/phones';
import { buildQueryParams, fetchApi } from './utils';

const baseUrl = process.env.API_BASE_URL;

export const getPhones = async (
  search?: string,
  limit?: number,
  offset?: number
): Promise<PhoneItem[]> => {
  const url = new URL('/products', baseUrl);
  url.search = buildQueryParams({ search, limit, offset }).toString();

  return fetchApi(url.toString());
};

export const getPhoneById = async (id: string): Promise<PhoneDetail> => {
  const url = new URL(`/products/${id}`, baseUrl);

  return fetchApi(url.toString());
};
