'use client';

import { useState, useCallback } from 'react';
import { sites } from '@/data/sites';

export function useCatalog() {
  const itemsPerPage = 3;
  const [catalogIndex, setCatalogIndex] = useState(0);

  const catalogPrev = useCallback(() => {
    if (catalogIndex > 0) setCatalogIndex(Math.max(0, catalogIndex - itemsPerPage));
  }, [catalogIndex]);

  const catalogNext = useCallback(() => {
    const maxIndex = sites.length - itemsPerPage;
    if (catalogIndex < maxIndex) setCatalogIndex(catalogIndex + itemsPerPage);
  }, [catalogIndex]);

  const visibleSites = sites.slice(catalogIndex, catalogIndex + itemsPerPage);
  const totalPages = Math.ceil(sites.length / itemsPerPage);
  const currentPage = Math.ceil((catalogIndex + 1) / itemsPerPage);

  return {
    catalogIndex,
    visibleSites,
    totalPages,
    currentPage,
    itemsPerPage,
    catalogPrev,
    catalogNext,
  };
}
