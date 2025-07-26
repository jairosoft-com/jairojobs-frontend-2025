import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedJob {
  jobId: string;
  userId: string;
  savedAt: Date;
}

interface SavedJobsState {
  savedJobs: SavedJob[];
  toggleSaveJob: (jobId: string, userId: string) => void;
  isSaved: (jobId: string, userId: string) => boolean;
  getSavedJobsByUser: (userId: string) => string[];
  clearSavedJobs: (userId: string) => void;
}

export const useSavedJobsStore = create<SavedJobsState>()(
  persist(
    (set, get) => ({
      savedJobs: [],

      toggleSaveJob: (jobId, userId) => {
        const exists = get().savedJobs.find(
          job => job.jobId === jobId && job.userId === userId,
        );

        if (exists) {
          // Remove from saved
          set(state => ({
            savedJobs: state.savedJobs.filter(
              job => !(job.jobId === jobId && job.userId === userId),
            ),
          }));
        } else {
          // Add to saved
          set(state => ({
            savedJobs: [
              ...state.savedJobs,
              { jobId, userId, savedAt: new Date() },
            ],
          }));
        }
      },

      isSaved: (jobId, userId) => {
        return get().savedJobs.some(
          job => job.jobId === jobId && job.userId === userId,
        );
      },

      getSavedJobsByUser: userId => {
        return get()
          .savedJobs.filter(job => job.userId === userId)
          .map(job => job.jobId);
      },

      clearSavedJobs: userId => {
        set(state => ({
          savedJobs: state.savedJobs.filter(job => job.userId !== userId),
        }));
      },
    }),
    {
      name: 'saved-jobs-storage',
    },
  ),
);
