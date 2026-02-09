'use client';

import { useCallback, useEffect } from 'react';
import { useNavigationStore } from '@/lib/stores';

interface UseNavigationProps {
  totalSlides: number;
}

export function useNavigation({ totalSlides }: UseNavigationProps) {
  const { currentSlide, isAnimating, goToSlide: goToSlideStore, goToPrev, goToNext } = useNavigationStore();

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    const validIndex = Math.max(0, Math.min(index, totalSlides - 1));
    goToSlideStore(validIndex);
  }, [isAnimating, totalSlides, goToSlideStore]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (isAnimating) return;
    if (e.deltaY > 50) {
      goToNext();
    } else if (e.deltaY < -50) {
      goToPrev();
    }
  }, [isAnimating, goToNext, goToPrev]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, goToSlide, totalSlides]);

  return {
    currentSlide,
    isAnimating,
    goToSlide,
    goToPrev,
    goToNext,
    handleWheel,
  };
}
