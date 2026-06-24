/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { PhoneCard } from './PhoneCard';
import { phoneItemListMock } from '@/mocks/phoneItemMocks';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const mockPhone = phoneItemListMock[0];

describe('Given the PhoneCard component', () => {
  describe('When it renders with a phone', () => {
    test('Then it should display the phone brand in uppercase', () => {
      render(<PhoneCard phone={mockPhone} />);

      expect(
        screen.getByText(mockPhone.brand.toUpperCase())
      ).toBeInTheDocument();
    });

    test('Then it should display the phone name in uppercase', () => {
      render(<PhoneCard phone={mockPhone} />);

      expect(
        screen.getByText(mockPhone.name.toUpperCase())
      ).toBeInTheDocument();
    });

    test('Then it should display the phone price', () => {
      render(<PhoneCard phone={mockPhone} />);

      expect(
        screen.getByText(`${mockPhone.basePrice} EUR`)
      ).toBeInTheDocument();
    });

    test('Then it should render a link to the phone detail page', () => {
      render(<PhoneCard phone={mockPhone} />);

      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        `/products/${mockPhone.id}`
      );
    });

    test('Then it should render the phone image with the correct alt text', () => {
      render(<PhoneCard phone={mockPhone} />);

      expect(screen.getByAltText(mockPhone.name)).toBeInTheDocument();
    });
  });
});
