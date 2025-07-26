import { create } from 'zustand';
import { JobFilters } from '@/types';

interface JobFiltersState {
  filters: JobFilters;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

const defaultFilters: JobFilters = {
  type: [],
  experienceLevel: [],
  location: '',
  remoteOption: [],
  salaryMin: undefined,
  salaryMax: undefined,
  search: '',
  tags: [],
};

export const useJobFiltersStore = create<JobFiltersState>((set, get) => ({
  filters: defaultFilters,

  setFilters: newFilters => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  hasActiveFilters: () => {
    const { filters } = get();
    return (
      (filters.type?.length ?? 0) > 0 ||
      (filters.experienceLevel?.length ?? 0) > 0 ||
      (filters.location !== '' && filters.location !== undefined) ||
      (filters.remoteOption?.length ?? 0) > 0 ||
      filters.salaryMin !== undefined ||
      filters.salaryMax !== undefined ||
      (filters.search !== '' && filters.search !== undefined) ||
      (filters.tags?.length ?? 0) > 0
    );
  },
}));
