'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { PhoneCartItem } from '@/lib/types/phones';

interface CartContextValue {
  items: PhoneCartItem[];
  addItem: (item: PhoneCartItem) => void;
  removeItem: (cartItemId: string) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'cart';

const readCartFromStorage = (): PhoneCartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<PhoneCartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage on mount is a valid pattern; the warning is a known false positive
    setItems(readCartFromStorage());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const addItem = (item: PhoneCartItem) => {
    setItems((current) => {
      const exists = current.some(
        (cartItem) => cartItem.cartItemId === item.cartItemId
      );
      if (exists) return current;
      return [...current, item];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems((current) =>
      current.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
