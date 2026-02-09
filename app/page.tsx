'use client';

import { Slides, SlideIndicators, StructuredData, ErrorBoundary } from '@/components';
import { useNavigation } from '@/hooks';

export default function Home() {
  const totalSlides = 4;
  const { currentSlide, goToSlide, handleWheel } = useNavigation({ totalSlides });
  const slideNames = ['Accueil', 'Catalogue', 'Ode au Beau', 'Contact'];

  return (
    <ErrorBoundary>
      <StructuredData type="itemlist" />
      <div className="void-bg h-screen w-screen overflow-hidden" onWheel={handleWheel} role="application" aria-label="NEXAI Collection Corrompue">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:rounded"
        >
          Aller au contenu principal
        </a>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {slideNames[currentSlide]}
        </div>

        <main id="main-content" className="h-full w-full" role="main">
          <Slides currentSlide={currentSlide} />
        </main>

        <nav aria-label="Navigation des slides">
          <SlideIndicators currentSlide={currentSlide} totalSlides={totalSlides} onSlideChange={goToSlide} />
        </nav>
      </div>
    </ErrorBoundary>
  );
}
