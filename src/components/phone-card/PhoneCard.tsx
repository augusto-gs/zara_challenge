import Link from 'next/link';
import Image from 'next/image';
import type { PhoneItem } from '@/lib/types/phones';
import styles from './PhoneCard.module.scss';

interface PhoneCardProps {
  phone: PhoneItem;
}

export const PhoneCard = ({ phone }: PhoneCardProps) => {
  return (
    <Link
      href={`/products/${phone.id}`}
      className={styles.phone_card}
      aria-label={`View ${phone.brand} ${phone.name} details`}
    >
      <div className={styles.phone_card__image_wrapper}>
        <Image
          src={phone.imageUrl}
          alt={phone.name}
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
        />
      </div>
      <div className={styles.phone_card__info}>
        <div className={styles.phone_card__details}>
          <span className={styles.phone_card__brand}>
            {phone.brand.toUpperCase()}
          </span>
          <span className={styles.phone_card__name}>
            {phone.name.toUpperCase()}
          </span>
        </div>
        <span className={styles.phone_card__price}>{phone.basePrice} EUR</span>
      </div>
    </Link>
  );
};
