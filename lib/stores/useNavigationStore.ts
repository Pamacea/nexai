import { create } from 'zustand';

interface NavigationState {
  currentSlide: number;
  isAnimating: boolean;
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  setAnimating: (isAnimating: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentSlide: 0,
  isAnimating: false,

  goToSlide: (index: number) => {
    const { isAnimating } = get();
    if (isAnimating) return;

    const totalSlides = 4;
    const validIndex = Math.max(0, Math.min(index, totalSlides - 1));

    if (validIndex !== get().currentSlide) {
      set({ isAnimating: true, currentSlide: validIndex });
      setTimeout(() => set({ isAnimating: false }), 500);
    }
  },

  goToNext: () => {
    const { currentSlide } = get();
    get().goToSlide(currentSlide + 1);
  },

  goToPrev: () => {
    const { currentSlide } = get();
    get().goToSlide(currentSlide - 1);
  },

  setAnimating: (isAnimating: boolean) => set({ isAnimating }),
}));
