'use client';

import { HeroSlide } from '@/components/hero';
import { CatalogSlide } from '@/components/catalog';
import { OdeSlide } from '@/components/ode';
import { ContactSlide } from '@/components/contact';

interface SlidesProps {
  currentSlide: number;
}

export function Slides({ currentSlide }: SlidesProps) {
  return (
    <div className="relative h-full w-full">
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
        style={{ transform: `translateX(${currentSlide === 0 ? '0%' : currentSlide < 0 ? '100%' : '-100%'})` }}
        aria-hidden={currentSlide !== 0}
      >
        <HeroSlide />
      </section>

      <section
        id="catalogue"
        aria-labelledby="catalogue-title"
        className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
        style={{ transform: `translateX(${currentSlide === 1 ? '0%' : currentSlide < 1 ? '100%' : '-100%'})` }}
        aria-hidden={currentSlide !== 1}
      >
        <CatalogSlide />
      </section>

      <section
        id="ode-au-beau"
        aria-labelledby="ode-title"
        className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
        style={{ transform: `translateX(${currentSlide === 2 ? '0%' : currentSlide < 2 ? '100%' : '-100%'})` }}
        aria-hidden={currentSlide !== 2}
      >
        <OdeSlide />
      </section>

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
        style={{ transform: `translateX(${currentSlide === 3 ? '0%' : currentSlide < 3 ? '100%' : '-100%'})` }}
        aria-hidden={currentSlide !== 3}
      >
        <ContactSlide />
      </section>
    </div>
  );
}
