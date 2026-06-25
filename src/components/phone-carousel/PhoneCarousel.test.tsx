/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { PhoneCarousel } from './PhoneCarousel';
import { phoneItemListMock } from '@/mocks/phoneItemMocks';

jest.mock('@/components/phone-card/PhoneCard', () => ({
  PhoneCard: ({ phone }: { phone: { name: string } }) => (
    <div>{phone.name}</div>
  ),
}));

describe('Given the PhoneCarousel component', () => {
  describe('When it renders with phones', () => {
    test('Then it should render a card for each phone', () => {
      render(<PhoneCarousel phones={phoneItemListMock} />);

      phoneItemListMock.forEach((phone) => {
        expect(screen.getByText(phone.name)).toBeInTheDocument();
      });
    });

    test('Then it should render the progress bar', () => {
      render(<PhoneCarousel phones={phoneItemListMock} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('When it renders with no phones', () => {
    test('Then it should render an empty track', () => {
      render(<PhoneCarousel phones={[]} />);

      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
  });
});
