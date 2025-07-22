import { create } from 'zustand';
import { JobFilters } from '@/types';

interface JobFiltersState {
  filters: JobFilters;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

const defaultFilters: JobFilters = {
  types: [],
  experienceLevels: [],
  locations: [],
  remoteOptions: [],
  salaryMin: undefined,
  salaryMax: undefined,
  search: '',
  sortBy: 'relevance',
  page: 1,
  perPage: 20,
};

export const useJobFiltersStore = create<JobFiltersState>((set, get) => ({
  filters: defaultFilters,

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  hasActiveFilters: () => {
    const { filters } = get();
    return (
      filters.types.length > 0 ||
      filters.experienceLevels.length > 0 ||
      filters.locations.length > 0 ||
      filters.remoteOptions.length > 0 ||
      filters.salaryMin !== undefined ||
      filters.salaryMax !== undefined ||
      filters.search !== ''
    );
  },
}));