'use client';

interface SlideIndicatorsProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (index: number) => void;
}

export function SlideIndicators({ currentSlide, totalSlides, onSlideChange }: SlideIndicatorsProps) {
  const slideNames = ['Accueil', 'Catalogue', 'Ode au Beau', 'Contact'];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50" aria-label="Navigation des slides">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-3 h-3 border border-blood-red transition-all ${
            currentSlide === index ? 'bg-blood-red' : 'bg-blood-red/20'
          }`}
          aria-label={`Aller à ${slideNames[index]}`}
          aria-current={currentSlide === index ? 'true' : undefined}
        />
      ))}
    </nav>
  );
}
