'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type {
  PhoneDetail as PhoneDetailType,
  PhoneStorageOption,
  PhoneColorOption,
} from '@/lib/types/phones';
import type { PhoneCartItem } from '@/lib/types/phones';
import { useCart } from '@/context/cart-context';
import { PhoneSpecs } from '@/components/phone-specs/PhoneSpecs';
import { PhoneCarousel } from '../phone-carousel/PhoneCarousel';
import { deduplicatePhones } from '@/lib/utils/utils';
import styles from './PhoneDetail.module.scss';

interface PhoneDetailProps {
  phone: PhoneDetailType;
}

export const PhoneDetail = ({ phone }: PhoneDetailProps) => {

  const [selectedColor, setSelectedColor] = useState<PhoneColorOption | null>(
    null
  );

  const [selectedStorage, setSelectedStorage] =
    useState<PhoneStorageOption | null>(null);

  const { addItem } = useCart();
  const router = useRouter();

  const currentImage =
    selectedColor?.imageUrl ?? phone.colorOptions?.[0]?.imageUrl ?? '';
  const currentPrice = selectedStorage?.price ?? phone.basePrice;
  const canAddToCart = selectedColor !== null && selectedStorage !== null;

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    const cartItem: PhoneCartItem = {
      cartItemId: `${phone.id}-${selectedStorage.capacity}-${selectedColor.name}`,
      id: phone.id,
      name: phone.name,
      imageUrl: selectedColor.imageUrl,
      capacity: selectedStorage.capacity,
      price: selectedStorage.price,
      colorName: selectedColor.name,
    };

    addItem(cartItem);
    router.push('/cart');
  };

  return (
    <div className={styles.phone_detail}>
      <button
        className={styles.phone_detail__back}
        onClick={() => router.back()}
      >
        <svg
          width="6"
          height="9"
          viewBox="0 0 6 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.35355 0L5.06066 0.707107L1.41421 4.35355L5.06066 8L4.35355 8.70711L0 4.35355L4.35355 0Z"
            fill="black"
          />
        </svg>
        BACK
      </button>
      <div className={styles.phone_detail__content}>
        <div className={styles.phone_detail__main}>
          <div className={styles.phone_detail__image_wrapper}>
            <Image
              src={currentImage}
              alt={`${phone.brand} ${phone.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.phone_detail__info}>
            <div className={styles.phone_detail__header}>
              <h1 className={styles.phone_detail__name}>
                {phone.name.toUpperCase()}
              </h1>
              <p className={styles.phone_detail__price}>
                {selectedStorage
                  ? `${currentPrice} EUR`
                  : `From ${currentPrice} EUR`}
              </p>
            </div>
            <div className={styles.phone_detail__selectors}>
              <div className={styles.phone_detail__selector_group}>
                <p className={styles.phone_detail__selector_label}>
                  STORAGE ¿HOW MUCH SPACE DO YOU NEED?
                </p>
                <div className={styles.phone_detail__storage_options}>
                  {phone.storageOptions.map((option) => (
                    <button
                      key={option.capacity}
                      className={`${styles.phone_detail__storage_btn} ${
                        selectedStorage?.capacity === option.capacity
                          ? styles['phone_detail__storage_btn--selected']
                          : ''
                      }`}
                      onClick={() => setSelectedStorage(option)}
                    >
                      {option.capacity}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.phone_detail__selector_group}>
                <p className={styles.phone_detail__selector_label}>
                  COLOR. PICK YOUR FAVOURITE.
                </p>
                <div className={styles.phone_detail__color_options}>
                  {phone.colorOptions.map((option) => (
                    <button
                      key={option.name}
                      className={`${styles.phone_detail__color_btn} ${
                        selectedColor?.name === option.name
                          ? styles['phone_detail__color_btn--selected']
                          : ''
                      }`}
                      style={{ backgroundColor: option.hexCode }}
                      onClick={() => setSelectedColor(option)}
                      aria-label={option.name}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <p className={styles.phone_detail__color_name}>
                    {selectedColor.name}
                  </p>
                )}
              </div>
            </div>
            <button
              className={styles.phone_detail__add_btn}
              onClick={handleAddToCart}
              disabled={!canAddToCart}
            >
              AÑADIR
            </button>
          </div>
        </div>
        <div className={styles.phone_detail__specs}>
          <PhoneSpecs specs={phone.specs} />
        </div>
        <div className={styles.phone_detail__similar}>
          <h2 className={styles.phone_detail__similar_title}>SIMILAR ITEMS</h2>
          <PhoneCarousel phones={deduplicatePhones(phone.similarProducts)} />
        </div>
      </div>
    </div>
  );
};
