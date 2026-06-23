/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { CartProvider, useCart } from './cart-context';
import { mockCartItem } from '@/mocks/phoneCartItem';

const [firstItem, secondItem] = mockCartItem;

// const firstItem: PhoneCartItem = {
//   cartItemId: 'SMG-S24U-256 GB-Titanium Black',
//   id: 'SMG-S24U',
//   name: 'Galaxy S24 Ultra',
//   imageUrl: 'https://example.com/s24u.webp',
//   capacity: '256 GB',
//   price: 1229,
//   colorName: 'Titanium Black',
// };

// const secondItem: PhoneCartItem = {
//   cartItemId: 'SMG-A25-128 GB-Black',
//   id: 'SMG-A25',
//   name: 'Galaxy A25 5G',
//   imageUrl: 'https://example.com/a25.webp',
//   capacity: '128 GB',
//   price: 239,
//   colorName: 'Black',
// };

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('Given the useCart hook', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe('When it is used outside of a CartProvider', () => {
    test('Then it should throw an error', () => {
      expect(() => renderHook(() => useCart())).toThrow(
        'useCart must be used within a CartProvider'
      );
    });
  });

  describe('When an item is added', () => {
    test('Then it should appear in the items list', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(firstItem);
      });

      expect(result.current.items).toEqual([firstItem]);
    });
  });

  describe('When the same item is added twice', () => {
    test('Then it should ignore the duplicate', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(firstItem);
        result.current.addItem(firstItem);
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('When an item is removed', () => {
    test('Then it should no longer be in the items list', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(firstItem);
        result.current.removeItem(firstItem.cartItemId);
      });

      expect(result.current.items).toEqual([]);
    });
  });

  describe('When there are items in the cart', () => {
    test('Then totalItems should reflect the number of items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(firstItem);
        result.current.addItem(secondItem);
      });

      expect(result.current.totalItems).toBe(2);
    });

    test('Then totalPrice should be the sum of all item prices', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(firstItem);
        result.current.addItem(secondItem);
      });

      expect(result.current.totalPrice).toBe(1468);
    });
  });

  describe('When an item is added', () => {
    test('Then it should be persisted in localStorage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(firstItem);
      });

      const stored = JSON.parse(localStorage.getItem('cart') ?? '[]');
      expect(stored).toEqual([firstItem]);
    });
  });
});
