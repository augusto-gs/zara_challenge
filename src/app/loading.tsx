import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div
      className={styles.loading__bar}
      role="progressbar"
      aria-label="Loading content"
    />
  );
}
