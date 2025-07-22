import { describe, it, expect, beforeEach } from 'vitest';
import { useJobFiltersStore } from './useJobFiltersStore';

describe('useJobFiltersStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { resetFilters } = useJobFiltersStore.getState();
    resetFilters();
  });

  it('initializes with default values', () => {
    const state = useJobFiltersStore.getState();
    expect(state.filters).toEqual({
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
    });
  });

  it('sets filters partially', () => {
    const { setFilters } = useJobFiltersStore.getState();
    
    setFilters({
      types: ['full-time', 'part-time'],
      search: 'developer',
    });
    
    const state = useJobFiltersStore.getState();
    expect(state.filters.types).toEqual(['full-time', 'part-time']);
    expect(state.filters.search).toBe('developer');
    // Other filters should remain at default values
    expect(state.filters.experienceLevels).toEqual([]);
    expect(state.filters.sortBy).toBe('relevance');
  });

  it('updates existing filters', () => {
    const { setFilters } = useJobFiltersStore.getState();
    
    // Set initial filters
    setFilters({
      types: ['full-time'],
      search: 'developer',
    });
    
    // Update filters
    setFilters({
      types: ['part-time'],
      locations: ['San Francisco, CA'],
    });
    
    const state = useJobFiltersStore.getState();
    expect(state.filters.types).toEqual(['part-time']); // Should be replaced
    expect(state.filters.search).toBe('developer'); // Should remain
    expect(state.filters.locations).toEqual(['San Francisco, CA']); // Should be added
  });

  it('resets filters to default', () => {
    const { setFilters, resetFilters } = useJobFiltersStore.getState();
    
    // Set some filters
    setFilters({
      types: ['full-time'],
      experienceLevels: ['senior'],
      search: 'developer',
      salaryMin: 100000,
    });
    
    // Reset filters
    resetFilters();
    
    const state = useJobFiltersStore.getState();
    expect(state.filters).toEqual({
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
    });
  });

  it('detects active filters correctly', () => {
    const { setFilters, hasActiveFilters } = useJobFiltersStore.getState();
    
    // Initially no active filters
    expect(hasActiveFilters()).toBe(false);
    
    // Test with search
    setFilters({ search: 'developer' });
    expect(hasActiveFilters()).toBe(true);
    
    // Reset and test with types
    setFilters({ search: '', types: ['full-time'] });
    expect(hasActiveFilters()).toBe(true);
    
    // Reset and test with salary
    setFilters({ types: [], salaryMin: 50000 });
    expect(hasActiveFilters()).toBe(true);
    
    // Reset and test with multiple filters
    setFilters({
      types: ['full-time'],
      locations: ['Remote'],
      search: 'engineer',
    });
    expect(hasActiveFilters()).toBe(true);
  });

  it('does not consider sortBy, page, and perPage as active filters', () => {
    const { setFilters, hasActiveFilters } = useJobFiltersStore.getState();
    
    setFilters({
      sortBy: 'date',
      page: 2,
      perPage: 50,
    });
    
    expect(hasActiveFilters()).toBe(false);
  });

  it('handles pagination correctly', () => {
    const { setFilters } = useJobFiltersStore.getState();
    
    setFilters({ page: 3 });
    
    const state = useJobFiltersStore.getState();
    expect(state.filters.page).toBe(3);
    
    // Changing filters should reset page to 1
    setFilters({ types: ['full-time'], page: 1 });
    expect(useJobFiltersStore.getState().filters.page).toBe(1);
  });
});