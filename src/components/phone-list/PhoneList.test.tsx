/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneList } from './PhoneList';
import { phoneItemListMock } from '@/mocks/phoneItemMocks';

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

jest.mock('@/components/search-bar/SearchBar', () => ({
  SearchBar: ({
    value,
    onChange,
    resultCount,
  }: {
    value: string;
    onChange: (v: string) => void;
    resultCount: number;
  }) => (
    <div>
      <input
        aria-label="Search for a smartphone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span>{resultCount} RESULTS</span>
    </div>
  ),
}));

jest.mock('@/components/phone-grid/PhoneGrid', () => ({
  PhoneGrid: ({
    phones,
    isLoading,
  }: {
    phones: { name: string }[];
    isLoading: boolean;
  }) => (
    <div>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        phones.map((p) => <div key={p.name}>{p.name}</div>)
      )}
    </div>
  ),
}));

const mockSearchResults = [phoneItemListMock[0]];

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Given the PhoneList component', () => {
  describe('When it renders with initial phones', () => {
    test('Then it should display all initial phones', () => {
      render(<PhoneList initialPhones={phoneItemListMock} />);

      expect(
        screen.getByText(`${phoneItemListMock.length} RESULTS`)
      ).toBeInTheDocument();
    });
  });

  describe('When the user searches for a phone', () => {
    test('Then it should fetch and display the results', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockSearchResults,
      });

      render(<PhoneList initialPhones={phoneItemListMock} />);

      await userEvent.type(
        screen.getByRole('textbox', { name: /search for a smartphone/i }),
        'samsung'
      );

      await waitFor(
        () => {
          expect(
            screen.getByText(mockSearchResults[0].name)
          ).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });

  describe('When the search is cleared', () => {
    test('Then it should restore the initial phones', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockSearchResults,
      });

      render(<PhoneList initialPhones={phoneItemListMock} />);

      const input = screen.getByRole('textbox', {
        name: /search for a smartphone/i,
      });

      await userEvent.type(input, 'samsung');

      await waitFor(() => {
        expect(screen.getByText(mockSearchResults[0].name)).toBeInTheDocument();
      });

      await userEvent.clear(input);

      await waitFor(() => {
        expect(
          screen.getByText(`${phoneItemListMock.length} RESULTS`)
        ).toBeInTheDocument();
      });
    });
  });
});
