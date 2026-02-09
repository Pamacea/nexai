import { create } from 'zustand';

interface CatalogState {
  catalogIndex: number;
  itemsPerPage: number;
  totalItems: number;
  setCatalogIndex: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  setTotalItems: (total: number) => void;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  catalogIndex: 0,
  itemsPerPage: 3,
  totalItems: 0,

  setCatalogIndex: (index: number) => {
    const maxIndex = Math.max(0, get().totalItems - get().itemsPerPage);
    set({ catalogIndex: Math.max(0, Math.min(index, maxIndex)) });
  },

  goNext: () => {
    const { catalogIndex, itemsPerPage, totalItems } = get();
    const maxIndex = totalItems - itemsPerPage;
    if (catalogIndex < maxIndex) {
      set({ catalogIndex: catalogIndex + itemsPerPage });
    }
  },

  goPrev: () => {
    const { catalogIndex, itemsPerPage } = get();
    if (catalogIndex > 0) {
      set({ catalogIndex: Math.max(0, catalogIndex - itemsPerPage) });
    }
  },

  setTotalItems: (total: number) => set({ totalItems: total }),
}));

export const useCatalogPagination = () => {
  const { catalogIndex, itemsPerPage, totalItems } = useCatalogStore();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.ceil((catalogIndex + 1) / itemsPerPage);

  return {
    currentPage,
    totalPages,
    hasNext: catalogIndex + itemsPerPage < totalItems,
    hasPrev: catalogIndex > 0,
  };
};
