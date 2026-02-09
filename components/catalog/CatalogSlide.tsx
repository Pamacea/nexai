'use client';

import { useCatalog } from '@/hooks/useCatalog';

export function CatalogSlide() {
  const { visibleSites, totalPages, currentPage, itemsPerPage, catalogPrev, catalogNext, catalogIndex } = useCatalog();

  return (
    <div className="px-8 max-w-7xl mx-auto w-full">
      <header>
        <h2 id="catalogue-title" className="font-space-grotesk text-epic font-bold uppercase text-bone-white mb-4 glitch-text" data-text="CATALOGUE">
          CATALOGUE
        </h2>
        <p className="font-space-mono text-blood-red mb-12 uppercase tracking-widest">
          [Collection de sites corrompus]
        </p>
      </header>

      <div className="relative" role="region" aria-labelledby="catalogue-title">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[50vh]">
          {visibleSites.map((site, idx) => (
            <article
              key={site.id}
              className="corrupted-card group relative bg-void-black/50 border-2 border-blood-red/30 p-6 hover:border-blood-red transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,0,64,0.3)] hover:animate-glitch opacity-0"
              style={{ animation: `fadeIn 0.5s ease forwards ${idx * 0.1}s` }}
              aria-labelledby={`site-${site.id}-title`}
            >
              <div className="absolute inset-0 bg-blood-red/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" aria-hidden="true" />

              <div className="absolute top-4 right-4">
                <span className="font-space-mono text-xs uppercase text-blood-red border border-blood-red/50 px-2 py-1" aria-label={`Catégorie: ${site.category}`}>
                  {site.category}
                </span>
              </div>

              <h3 id={`site-${site.id}-title`} className="font-space-grotesk text-xl font-bold uppercase text-bone-white mb-3 group-hover:text-blood-red transition-colors">
                {site.name}
              </h3>

              <p className="font-space-mono text-bone-white/70 text-sm mb-4 leading-relaxed">
                {site.description}
              </p>

              <ul className="flex flex-wrap gap-2 mb-4" aria-label={`Tags pour ${site.name}`}>
                {site.tags.map((tag) => (
                  <li key={tag}>
                    <span className="font-space-mono text-xs text-bone-white/50 uppercase">
                      #{tag}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-space-mono text-sm text-blood-red hover:text-bone-white transition-colors uppercase"
                aria-label={`Explorer ${site.name} (ouvre dans un nouvel onglet)`}
              >
                <span>Explorer</span>
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <nav className="flex justify-center items-center gap-4 mt-8" aria-label="Pagination du catalogue">
          <button
            onClick={catalogPrev}
            disabled={catalogIndex === 0}
            className="corrupted-btn bg-transparent border-2 border-blood-red text-bone-white px-6 py-2 font-space-mono text-sm font-bold uppercase cursor-pointer transition-all duration-200 hover:bg-blood-red hover:text-void-black disabled:opacity-30 disabled:cursor-not-allowed disabled:animate-none"
            aria-label="Page précédente"
          >
            ← PREV
          </button>

          <span className="font-space-mono text-bone-white/60 text-sm" aria-live="polite" aria-atomic="true">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={catalogNext}
            disabled={catalogIndex + itemsPerPage >= visibleSites.length + (catalogIndex > 0 ? Math.min(itemsPerPage, catalogIndex) : 0)}
            className="corrupted-btn bg-transparent border-2 border-blood-red text-bone-white px-6 py-2 font-space-mono text-sm font-bold uppercase cursor-pointer transition-all duration-200 hover:bg-blood-red hover:text-void-black disabled:opacity-30 disabled:cursor-not-allowed disabled:animate-none"
            aria-label="Page suivante"
          >
            NEXT →
          </button>
        </nav>
      </div>
    </div>
  );
}
