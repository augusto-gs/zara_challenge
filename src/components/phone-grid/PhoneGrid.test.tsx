/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { PhoneGrid } from './PhoneGrid';
import { phoneItemListMock } from '@/mocks/phoneItemMocks';

jest.mock('@/components/phone-card/PhoneCard', () => ({
  PhoneCard: ({ phone }: { phone: { name: string } }) => (
    <div>{phone.name}</div>
  ),
}));

describe('Given the PhoneGrid component', () => {
  describe('When isLoading is true', () => {
    test('Then it should show the loading message', () => {
      render(<PhoneGrid phones={[]} isLoading={true} />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('When there are no phones', () => {
    test('Then it should show the no results message', () => {
      render(<PhoneGrid phones={[]} isLoading={false} />);

      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });

  describe('When there are phones', () => {
    test('Then it should render a card for each phone', () => {
      render(<PhoneGrid phones={phoneItemListMock} isLoading={false} />);

      phoneItemListMock.forEach((phone) => {
        expect(screen.getByText(phone.name)).toBeInTheDocument();
      });
    });

    test('Then it should render the correct number of items', () => {
      render(<PhoneGrid phones={phoneItemListMock} isLoading={false} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(
        phoneItemListMock.length
      );
    });
  });
});
