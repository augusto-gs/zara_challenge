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

  const updateProgress = () => {
    const element = scrollRef.current;
    if (!element) return;

    const scrollableWidth = element.scrollWidth - element.clientWidth;
    const currentProgress =
      scrollableWidth > 0 ? (element.scrollLeft / scrollableWidth) * 100 : 0;

    setProgress(currentProgress);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const element = scrollRef.current;
    if (!element) return;

    setIsDragging(true);
    dragStart.current = {
      x: e.pageX,
      scrollLeft: element.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const element = scrollRef.current;
    if (!element) return;

    e.preventDefault();
    const distance = e.pageX - dragStart.current.x;
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
        onScroll={updateProgress}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
