/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { useCart } from '@/context/cart-context';

jest.mock('@/context/cart-context', () => ({
  useCart: jest.fn(),
}));

// jest.mock('next/link', () => ({
//   __esModule: true,
//   default: ({
//     children,
//     href,
//   }: {
//     children: React.ReactNode;
//     href: string;
//   }) => <a href={href}>{children}</a>,
// }));

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

jest.mock('../container/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockedUseCart = useCart as jest.Mock;

describe('Given the Navbar component', () => {
  describe('When the cart is empty', () => {
    beforeEach(() => {
      mockedUseCart.mockReturnValue({ totalItems: 0 });
    });

    test('Then it should render the home link', () => {
      render(<Navbar />);

      const homeLink = screen.getByRole('link', { name: /go to home/i });

      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    test('Then it should render the empty cart icon', () => {
      render(<Navbar />);

      expect(screen.getByLabelText('Cart empty')).toBeInTheDocument();
      expect(screen.queryByLabelText('Cart filled')).not.toBeInTheDocument();
    });
  });

  test('Then it should render the cart link with 0 items', () => {
    render(<Navbar />);

    const cartLink = screen.getByRole('link', { name: /cart with 0 items/i });

    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  test('Then it should display 0 as the cart count', () => {
    render(<Navbar />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

describe('When the cart has items', () => {
  beforeEach(() => {
    mockedUseCart.mockReturnValue({ totalItems: 3 });
  });

  test('Then it should render the cart link with the correct item count', () => {
    render(<Navbar />);

    const cartLink = screen.getByRole('link', { name: /cart with 3 items/i });

    expect(cartLink).toBeInTheDocument();
  });

  test('Then it should display the correct count', () => {
    render(<Navbar />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('Then it should render the filled cart icon', () => {
    render(<Navbar />);

    expect(screen.getByLabelText('Cart filled')).toBeInTheDocument();
    expect(screen.queryByLabelText('Cart empty')).not.toBeInTheDocument();
  });
});
