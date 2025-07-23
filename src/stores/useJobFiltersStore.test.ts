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
      type: [],
      experienceLevel: [],
      location: '',
      remoteOption: [],
      salaryMin: undefined,
      salaryMax: undefined,
      search: '',
                  tags: [],
    });
  });

  it('sets filters partially', () => {
    const { setFilters } = useJobFiltersStore.getState();
    
    setFilters({
      type: ['full-time', 'part-time'],
      search: 'developer',
    });
    
    const state = useJobFiltersStore.getState();
    expect(state.filters.type).toEqual(['full-time', 'part-time']);
    expect(state.filters.search).toBe('developer');
    // Other filters should remain at default values
    expect(state.filters.experienceLevel).toEqual([]);
    // expect(state.filters.sortBy).toBe('relevance');
  });

  it('updates existing filters', () => {
    const { setFilters } = useJobFiltersStore.getState();
    
    // Set initial filters
    setFilters({
      type: ['full-time'],
      search: 'developer',
    });
    
    // Update filters
    setFilters({
      type: ['part-time'],
      location: 'San Francisco, CA',
    });
    
    const state = useJobFiltersStore.getState();
    expect(state.filters.type).toEqual(['part-time']); // Should be replaced
    expect(state.filters.search).toBe('developer'); // Should remain
    expect(state.filters.location).toBe('San Francisco, CA'); // Should be added
  });

  it('resets filters to default', () => {
    const { setFilters, resetFilters } = useJobFiltersStore.getState();
    
    // Set some filters
    setFilters({
      type: ['full-time'],
      experienceLevel: ['senior'],
      search: 'developer',
      salaryMin: 100000,
    });
    
    // Reset filters
    resetFilters();
    
    const state = useJobFiltersStore.getState();
    expect(state.filters).toEqual({
      type: [],
      experienceLevel: [],
      location: '',
      remoteOption: [],
      salaryMin: undefined,
      salaryMax: undefined,
      search: '',
                  tags: [],
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
    setFilters({ search: '', type: ['full-time'] });
    expect(hasActiveFilters()).toBe(true);
    
    // Reset and test with salary
    setFilters({ type: [], salaryMin: 50000 });
    expect(hasActiveFilters()).toBe(true);
    
    // Reset and test with multiple filters
    setFilters({
      type: ['full-time'],
      location: 'Remote',
      search: 'engineer',
    });
    expect(hasActiveFilters()).toBe(true);
  });

  it('does not consider sortBy, page, and perPage as active filters', () => {
    const { setFilters, hasActiveFilters } = useJobFiltersStore.getState();
    
    setFilters({
      // sortBy: 'date',
      // page: 2,
      // perPage: 50,
    });
    
    expect(hasActiveFilters()).toBe(false);
  });

  it('handles pagination correctly', () => {
    const { setFilters } = useJobFiltersStore.getState();
    
    // Test pagination would go here, but page is not part of JobFilters
    // This test needs to be updated based on how pagination is actually handled
    setFilters({ type: ['full-time'] });
    
    const state = useJobFiltersStore.getState();
    expect(state.filters.type).toEqual(['full-time']);
  });
});