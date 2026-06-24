import type { PhoneItem } from '@/lib/types/phones';
import { PhoneCard } from '@/components/phone-card/PhoneCard';
import styles from './PhoneGrid.module.scss';

export interface PhoneGridProps {
  phones: PhoneItem[];
  isLoading: boolean;
}

export const PhoneGrid = ({ phones, isLoading }: PhoneGridProps) => {
  if (isLoading) {
    return <p className={styles.phone_grid__message}>Loading...</p>;
  }

  if (phones.length === 0) {
    return <p className={styles.phone_grid__message}>No results found.</p>;
  }

  return (
    <ul className={styles.phone_grid}>
      {phones.map((phone) => (
        <li key={phone.id} className={styles.phone_grid__item}>
          <PhoneCard phone={phone} />
        </li>
      ))}
    </ul>
  );
};
