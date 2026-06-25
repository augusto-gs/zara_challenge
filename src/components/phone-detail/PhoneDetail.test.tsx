/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneDetail } from './PhoneDetail';
import { phoneDetailMock } from '@/mocks/phoneDetailMock';
import { useCart } from '@/context/cart-context';

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockAddItem = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

jest.mock('@/context/cart-context', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/components/phone-specs/PhoneSpecs', () => ({
  PhoneSpecs: () => <div data-testid="phone-specs" />,
}));

jest.mock('../phone-carousel/PhoneCarousel', () => ({
  PhoneCarousel: () => <div data-testid="phone-carousel" />,
}));

jest.mock('@/lib/utils/utils', () => ({
  deduplicatePhones: (phones: unknown[]) => phones,
}));

beforeEach(() => {
  (useCart as jest.Mock).mockReturnValue({
    addItem: mockAddItem,
  });
  jest.clearAllMocks();
});

describe('Given the PhoneDetail component', () => {
  describe('When it renders with a phone', () => {
    test('Then it should display the phone name in uppercase', () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      expect(
        screen.getByText(phoneDetailMock.name.toUpperCase())
      ).toBeInTheDocument();
    });

    test('Then it should display the base price with "From"', () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      expect(
        screen.getByText(`From ${phoneDetailMock.basePrice} EUR`)
      ).toBeInTheDocument();
    });

    test('Then the add button should be disabled', () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      expect(screen.getByText('ADD TO CART')).toBeDisabled();
    });

    test('Then it should render the specs component', () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      expect(screen.getByTestId('phone-specs')).toBeInTheDocument();
    });

    test('Then it should render the carousel component', () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      expect(screen.getByTestId('phone-carousel')).toBeInTheDocument();
    });
  });

  describe('When the user selects a storage option', () => {
    test('Then it should update the price', async () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      await userEvent.click(
        screen.getByText(phoneDetailMock.storageOptions[0].capacity)
      );

      expect(
        screen.getByText(`${phoneDetailMock.storageOptions[0].price} EUR`)
      ).toBeInTheDocument();
    });
  });

  describe('When the user selects a color option', () => {
    test('Then it should display the color name', async () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      await userEvent.click(
        screen.getByRole('button', {
          name: phoneDetailMock.colorOptions[0].name,
        })
      );

      expect(
        screen.getByText(phoneDetailMock.colorOptions[0].name)
      ).toBeInTheDocument();
    });
  });

  describe('When the user selects both color and storage', () => {
    test('Then the add button should be enabled', async () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      await userEvent.click(
        screen.getByText(phoneDetailMock.storageOptions[0].capacity)
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: phoneDetailMock.colorOptions[0].name,
        })
      );

      expect(screen.getByText('ADD TO CART')).not.toBeDisabled();
    });

    test('Then clicking add should call addItem and redirect to cart', async () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      await userEvent.click(
        screen.getByText(phoneDetailMock.storageOptions[0].capacity)
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: phoneDetailMock.colorOptions[0].name,
        })
      );

      await userEvent.click(screen.getByText('ADD TO CART'));

      expect(mockAddItem).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/cart');
    });
  });

  describe('When the user clicks the back button', () => {
    test('Then it should call router.back', async () => {
      render(<PhoneDetail phone={phoneDetailMock} />);

      await userEvent.click(screen.getByText('BACK'));

      expect(mockBack).toHaveBeenCalled();
    });
  });
});
