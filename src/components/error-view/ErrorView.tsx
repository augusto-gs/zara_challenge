import styles from './ErrorView.module.scss';

interface ErrorViewProps {
  message: string;
  reset: () => void;
}

export const ErrorView = ({ message, reset }: ErrorViewProps) => {
  return (
    <div className={styles.error_view}>
      <p className={styles.error_view__message}>{message}</p>
      <button className={styles.error_view__button} onClick={reset}>
        Try again
      </button>
    </div>
  );
};
