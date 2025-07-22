import { describe, it, expect, beforeEach } from 'vitest';
import { useSavedJobsStore } from './useSavedJobsStore';

describe('useSavedJobsStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useSavedJobsStore.setState({
      savedJobs: [],
    });
  });

  it('initializes with default values', () => {
    const state = useSavedJobsStore.getState();
    expect(state.savedJobs).toEqual([]);
  });

  it('toggles save job - adds job when not saved', () => {
    const { toggleSaveJob } = useSavedJobsStore.getState();
    
    toggleSaveJob('job-1', 'user-1');
    
    const state = useSavedJobsStore.getState();
    expect(state.savedJobs).toHaveLength(1);
    expect(state.savedJobs[0]).toMatchObject({
      jobId: 'job-1',
      userId: 'user-1',
    });
  });

  it('toggles save job - removes job when already saved', () => {
    // First, add a saved job
    useSavedJobsStore.setState({
      savedJobs: [
        {
          jobId: 'job-1',
          userId: 'user-1',
          savedAt: new Date(),
        },
      ],
    });
    
    const { toggleSaveJob } = useSavedJobsStore.getState();
    toggleSaveJob('job-1', 'user-1');
    
    const state = useSavedJobsStore.getState();
    expect(state.savedJobs).toHaveLength(0);
  });

  it('checks if job is saved', () => {
    useSavedJobsStore.setState({
      savedJobs: [
        {
          jobId: 'job-1',
          userId: 'user-1',
          savedAt: new Date(),
        },
      ],
    });
    
    const { isSaved } = useSavedJobsStore.getState();
    
    expect(isSaved('job-1', 'user-1')).toBe(true);
    expect(isSaved('job-2', 'user-1')).toBe(false);
    expect(isSaved('job-1', 'user-2')).toBe(false);
  });

  it('gets saved jobs by user', () => {
    useSavedJobsStore.setState({
      savedJobs: [
        {
          jobId: 'job-1',
          userId: 'user-1',
          savedAt: new Date(),
        },
        {
          jobId: 'job-2',
          userId: 'user-2',
          savedAt: new Date(),
        },
        {
          jobId: 'job-3',
          userId: 'user-1',
          savedAt: new Date(),
        },
      ],
    });
    
    const { getSavedJobsByUser } = useSavedJobsStore.getState();
    const savedJobIds = getSavedJobsByUser('user-1');
    
    expect(savedJobIds).toEqual(['job-1', 'job-3']);
  });

  it('clears saved jobs for a user', () => {
    useSavedJobsStore.setState({
      savedJobs: [
        {
          jobId: 'job-1',
          userId: 'user-1',
          savedAt: new Date(),
        },
        {
          jobId: 'job-2',
          userId: 'user-2',
          savedAt: new Date(),
        },
        {
          jobId: 'job-3',
          userId: 'user-1',
          savedAt: new Date(),
        },
      ],
    });
    
    const { clearSavedJobs } = useSavedJobsStore.getState();
    clearSavedJobs('user-1');
    
    const state = useSavedJobsStore.getState();
    expect(state.savedJobs).toHaveLength(1);
    expect(state.savedJobs[0].userId).toBe('user-2');
  });

  it('handles multiple users saving the same job', () => {
    const { toggleSaveJob } = useSavedJobsStore.getState();
    
    toggleSaveJob('job-1', 'user-1');
    toggleSaveJob('job-1', 'user-2');
    
    const state = useSavedJobsStore.getState();
    expect(state.savedJobs).toHaveLength(2);
    expect(state.savedJobs.every(job => job.jobId === 'job-1')).toBe(true);
    expect(state.savedJobs.map(job => job.userId).sort()).toEqual(['user-1', 'user-2']);
  });
});