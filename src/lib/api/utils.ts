import type { ApiError } from "../types/api";

const apiKey = process.env.API_KEY;

export const fetchApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: { 'x-api-key': apiKey ?? '' },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const buildQueryParams = (
  params: Record<string, string | number | undefined>
): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, value.toString());
  });

  return searchParams;
};
