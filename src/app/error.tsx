'use client';

import styles from './error.module.scss';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className={styles.error}>
      <p className={styles.error__message}>
        Something went wrong loading the phones.
      </p>
      <button className={styles.error__button} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
