'use client';

import { useRef, useState } from 'react';
import type { PhoneItem } from '@/lib/types/phones';
import { PhoneCard } from '@/components/phone-card/PhoneCard';
import styles from './PhoneCarousel.module.scss';

interface PhoneCarouselProps {
  phones: PhoneItem[];
}

export const PhoneCarousel = ({ phones }: PhoneCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const hasDragged = useRef(false);

  const updateProgress = () => {
    const element = scrollRef.current;
    if (!element) return;

    const scrollableWidth = element.scrollWidth - element.clientWidth;
    const currentProgress =
      scrollableWidth > 0 ? (element.scrollLeft / scrollableWidth) * 100 : 0;

    setProgress(currentProgress);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const element = scrollRef.current;
    if (!element) return;

    setIsDragging(true);
    dragStart.current = {
      x: event.pageX,
      scrollLeft: element.scrollLeft,
    };
  };

  const handleClick = (event: React.MouseEvent) => {
    if (hasDragged.current) {
      event.preventDefault();
      hasDragged.current = false;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const element = scrollRef.current;
    if (!element) return;

    const scrollAmount = 300;
    if (event.key === 'ArrowLeft') {
      element.scrollLeft -= scrollAmount;
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      element.scrollLeft += scrollAmount;
      event.preventDefault();
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    const element = scrollRef.current;
    if (!element) return;

    event.preventDefault();
    hasDragged.current = true;
    const distance = event.pageX - dragStart.current.x;
    element.scrollLeft = dragStart.current.scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.phone_carousel}>
      <div
        className={`${styles.phone_carousel__track} ${
          isDragging ? styles['phone_carousel__track--dragging'] : ''
        }`}
        ref={scrollRef}
        role="region"
        aria-label="Similar phones carousel"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onScroll={updateProgress}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClickCapture={handleClick}
        onDragStart={(event) => event.preventDefault()}
      >
        {phones.map((phone) => (
          <div key={phone.id} className={styles.phone_carousel__item}>
            <PhoneCard phone={phone} />
          </div>
        ))}
      </div>
      <div
        className={styles.phone_carousel__progress}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Carousel progress"
      >
        <div
          className={styles.phone_carousel__progress_bar}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
