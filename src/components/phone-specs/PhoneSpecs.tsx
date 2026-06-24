import type { PhoneDetail } from '@/lib/types/phones';
import styles from './PhoneSpecs.module.scss';

interface PhoneSpecsProps {
  specs: PhoneDetail['specs'];
}

export const PhoneSpecs = ({ specs }: PhoneSpecsProps) => {
  const specItems = [
    { label: 'SCREEN', value: specs.screen },
    { label: 'RESOLUTION', value: specs.resolution },
    { label: 'PROCESSOR', value: specs.processor },
    { label: 'MAIN CAMERA', value: specs.mainCamera },
    { label: 'SELFIE CAMERA', value: specs.selfieCamera },
    { label: 'BATTERY', value: specs.battery },
    { label: 'OS', value: specs.os },
    { label: 'SCREEN REFRESH RATE', value: specs.screenRefreshRate },
  ];

  return (
    <div className={styles.phone_specs}>
      <h2 className={styles.phone_specs__title}>SPECIFICATIONS</h2>
      <dl className={styles.phone_specs__list}>
        {specItems.map((item) => (
          <div key={item.label} className={styles.phone_specs__item}>
            <dt className={styles.phone_specs__label}>{item.label}</dt>
            <dd className={styles.phone_specs__value}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
