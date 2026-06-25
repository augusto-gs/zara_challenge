/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart } from './Cart';
import { useCart } from '@/context/cart-context';
import type { PhoneCartItem } from '@/lib/types/phones';

jest.mock('@/context/cart-context', () => ({
  useCart: jest.fn(),
}));

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

const mockedUseCart = useCart as jest.Mock;

const mockItems: PhoneCartItem[] = [
  {
    cartItemId: 'SMG-S24U-512 GB-Violeta Titanium',
    id: 'SMG-S24U',
    name: 'Galaxy S24 Ultra',
    imageUrl: 'https://example.com/s24u.webp',
    capacity: '512 GB',
    price: 1199,
    colorName: 'Violeta Titanium',
  },
  {
    cartItemId: 'SMG-A25-128 GB-Azul',
    id: 'SMG-A25',
    name: 'Galaxy A25 5G',
    imageUrl: 'https://example.com/a25.webp',
    capacity: '128 GB',
    price: 219,
    colorName: 'Azul',
  },
];

describe('Given the Cart component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When the cart is empty', () => {
    beforeEach(() => {
      mockedUseCart.mockReturnValue({
        items: [],
        removeItem: jest.fn(),
        totalPrice: 0,
      });
    });

    test('Then it should display the cart count as 0', () => {
      render(<Cart />);

      expect(screen.getByText('CART (0)')).toBeInTheDocument();
    });

    test('Then it should not display the total', () => {
      render(<Cart />);

      expect(screen.queryByText('TOTAL')).not.toBeInTheDocument();
    });

    test('Then it should not display the pay button', () => {
      render(<Cart />);

      expect(
        screen.queryByRole('button', { name: 'PAY' })
      ).not.toBeInTheDocument();
    });

    test('Then it should display the continue shopping link', () => {
      render(<Cart />);

      const link = screen.getByRole('link', { name: /continue shopping/i });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
    });
  });

  describe('When the cart has items', () => {
    beforeEach(() => {
      mockedUseCart.mockReturnValue({
        items: mockItems,
        removeItem: jest.fn(),
        totalPrice: 1418,
      });
    });

    test('Then it should display the correct cart count', () => {
      render(<Cart />);

      expect(screen.getByText('CART (2)')).toBeInTheDocument();
    });

    test('Then it should display each item name in uppercase', () => {
      render(<Cart />);

      expect(screen.getByText('GALAXY S24 ULTRA')).toBeInTheDocument();
      expect(screen.getByText('GALAXY A25 5G')).toBeInTheDocument();
    });

    test('Then it should display each item specs', () => {
      render(<Cart />);

      expect(screen.getByText('512 GB | VIOLETA TITANIUM')).toBeInTheDocument();
      expect(screen.getByText('128 GB | AZUL')).toBeInTheDocument();
    });

    test('Then it should display each item price', () => {
      render(<Cart />);

      expect(screen.getByText('1199 EUR')).toBeInTheDocument();
      expect(screen.getByText('219 EUR')).toBeInTheDocument();
    });

    test('Then it should display the total price', () => {
      render(<Cart />);

      expect(screen.getByText('1418 EUR')).toBeInTheDocument();
    });

    test('Then it should display the pay button', () => {
      render(<Cart />);

      expect(screen.getByRole('button', { name: 'PAY' })).toBeInTheDocument();
    });
  });

  describe('When the user removes an item', () => {
    test('Then it should call removeItem with the correct cartItemId', async () => {
      const mockRemoveItem = jest.fn();
      mockedUseCart.mockReturnValue({
        items: mockItems,
        removeItem: mockRemoveItem,
        totalPrice: 1418,
      });

      render(<Cart />);

      const removeButtons = screen.getAllByRole('button', { name: 'Eliminar' });
      await userEvent.click(removeButtons[0]);

      expect(mockRemoveItem).toHaveBeenCalledWith(mockItems[0].cartItemId);
    });
  });
});
