'use client';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export const SearchBar = ({ value, onChange, resultCount }: SearchBarProps) => {
  return (
    <div className={styles.search_bar}>
      <div className={styles.search_bar__input_wrapper}>
        <input
          type="search"
          className={styles.search_bar__input}
          placeholder="Search for a smartphone..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search for a smartphone"
        />
        {value && (
          <button
            className={styles.search_bar__clear}
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <p className={styles.search_bar__count} aria-live="polite">
        {resultCount} RESULTS
      </p>
    </div>
  );
};
