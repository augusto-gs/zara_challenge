import styles from './LoadingBar.module.scss';

export const LoadingBar = () => {
  return (
    <div
      className={styles.loading_bar}
      role="progressbar"
      aria-label="Loading content"
    />
  );
};
