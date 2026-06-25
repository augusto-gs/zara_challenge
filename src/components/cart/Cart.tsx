'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import styles from './Cart.module.scss';

export const Cart = () => {
  const { items, removeItem, totalPrice } = useCart();

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart__title}>CART ({items.length})</h1>

      {items.length > 0 && (
        <ul className={styles.cart__list}>
          {items.map((item) => (
            <li key={item.cartItemId} className={styles.cart__item}>
              <div className={styles.cart__item_image_wrapper}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="120px"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div className={styles.cart__item_info}>
                <div className={styles.cart__item_info_top}>
                  <p className={styles.cart__item_name}>
                    {item.name.toUpperCase()}
                  </p>
                  <p className={styles.cart__item_specs}>
                    {item.capacity} | {item.colorName.toUpperCase()}
                  </p>
                  <p className={styles.cart__item_price}>{item.price} EUR</p>
                </div>
                <button
                  className={styles.cart__item_remove}
                  onClick={() => removeItem(item.cartItemId)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.cart__footer}>
        <Link href="/" className={styles.cart__continue}>
          CONTINUE SHOPPING
        </Link>

        {items.length > 0 && (
          <div className={styles.cart__total}>
            <span>TOTAL</span>
            <span>{totalPrice} EUR</span>
          </div>
        )}

        {items.length > 0 && <button className={styles.cart__pay}>PAY</button>}
      </div>
    </div>
  );
};
