import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  resume: string; // URL or file name
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: Date;
  updatedAt: Date;
}

interface ApplicationState {
  applications: JobApplication[];
  isLoading: boolean;
  submitApplication: (
    jobId: string,
    data: Omit<
      JobApplication,
      'id' | 'jobId' | 'userId' | 'status' | 'appliedAt' | 'updatedAt'
    >,
  ) => Promise<void>;
  getApplicationsByUser: (userId: string) => JobApplication[];
  getApplicationByJobAndUser: (
    jobId: string,
    userId: string,
  ) => JobApplication | undefined;
  updateApplicationStatus: (
    applicationId: string,
    status: JobApplication['status'],
  ) => void;
  withdrawApplication: (applicationId: string) => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      applications: [],
      isLoading: false,

      submitApplication: async (jobId, data) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          const newApplication: JobApplication = {
            id: Date.now().toString(),
            jobId,
            userId: '1', // Would come from auth store in real app
            ...data,
            status: 'pending',
            appliedAt: new Date(),
            updatedAt: new Date(),
          };

          set(state => ({
            applications: [...state.applications, newApplication],
            isLoading: false,
          }));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getApplicationsByUser: userId => {
        return get().applications.filter(app => app.userId === userId);
      },

      getApplicationByJobAndUser: (jobId, userId) => {
        return get().applications.find(
          app => app.jobId === jobId && app.userId === userId,
        );
      },

      updateApplicationStatus: (applicationId, status) => {
        set(state => ({
          applications: state.applications.map(app =>
            app.id === applicationId
              ? { ...app, status, updatedAt: new Date() }
              : app,
          ),
        }));
      },

      withdrawApplication: applicationId => {
        set(state => ({
          applications: state.applications.filter(
            app => app.id !== applicationId,
          ),
        }));
      },
    }),
    {
      name: 'applications-storage',
    },
  ),
);
