import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationStore } from './useApplicationStore';

describe('useApplicationStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useApplicationStore.setState({
      applications: [],
      isLoading: false,
    });
  });

  it('initializes with default values', () => {
    const state = useApplicationStore.getState();
    expect(state.applications).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('submits application successfully', async () => {
    const { submitApplication } = useApplicationStore.getState();
    
    await submitApplication('job-1', {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      resume: 'resume.pdf',
      coverLetter: 'I am interested in this position',
    });
    
    const state = useApplicationStore.getState();
    expect(state.applications).toHaveLength(1);
    expect(state.applications[0]).toMatchObject({
      jobId: 'job-1',
      fullName: 'John Doe',
      email: 'john@example.com',
      status: 'pending',
    });
    expect(state.isLoading).toBe(false);
  });

  it('gets applications by user', () => {
    // Add some test applications
    useApplicationStore.setState({
      applications: [
        {
          id: '1',
          jobId: 'job-1',
          userId: 'user-1',
          fullName: 'John Doe',
          email: 'john@example.com',
          resume: 'resume.pdf',
          status: 'pending',
          appliedAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          jobId: 'job-2',
          userId: 'user-2',
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          resume: 'resume.pdf',
          status: 'pending',
          appliedAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          jobId: 'job-3',
          userId: 'user-1',
          fullName: 'John Doe',
          email: 'john@example.com',
          resume: 'resume.pdf',
          status: 'reviewing',
          appliedAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });
    
    const { getApplicationsByUser } = useApplicationStore.getState();
    const userApplications = getApplicationsByUser('user-1');
    
    expect(userApplications).toHaveLength(2);
    expect(userApplications.every(app => app.userId === 'user-1')).toBe(true);
  });

  it('gets application by job and user', () => {
    const testApplication = {
      id: '1',
      jobId: 'job-1',
      userId: 'user-1',
      fullName: 'John Doe',
      email: 'john@example.com',
      resume: 'resume.pdf',
      status: 'pending' as const,
      appliedAt: new Date(),
      updatedAt: new Date(),
    };
    
    useApplicationStore.setState({
      applications: [testApplication],
    });
    
    const { getApplicationByJobAndUser } = useApplicationStore.getState();
    const application = getApplicationByJobAndUser('job-1', 'user-1');
    
    expect(application).toEqual(testApplication);
    
    // Test non-existent application
    const notFound = getApplicationByJobAndUser('job-2', 'user-1');
    expect(notFound).toBeUndefined();
  });

  it('updates application status', () => {
    const originalDate = new Date('2024-01-01');
    useApplicationStore.setState({
      applications: [
        {
          id: '1',
          jobId: 'job-1',
          userId: 'user-1',
          fullName: 'John Doe',
          email: 'john@example.com',
          resume: 'resume.pdf',
          status: 'pending',
          appliedAt: originalDate,
          updatedAt: originalDate,
        },
      ],
    });
    
    const { updateApplicationStatus } = useApplicationStore.getState();
    updateApplicationStatus('1', 'shortlisted');
    
    const state = useApplicationStore.getState();
    expect(state.applications[0].status).toBe('shortlisted');
    expect(state.applications[0].updatedAt.getTime()).toBeGreaterThan(originalDate.getTime());
  });

  it('withdraws application', () => {
    useApplicationStore.setState({
      applications: [
        {
          id: '1',
          jobId: 'job-1',
          userId: 'user-1',
          fullName: 'John Doe',
          email: 'john@example.com',
          resume: 'resume.pdf',
          status: 'pending',
          appliedAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          jobId: 'job-2',
          userId: 'user-1',
          fullName: 'John Doe',
          email: 'john@example.com',
          resume: 'resume.pdf',
          status: 'pending',
          appliedAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });
    
    const { withdrawApplication } = useApplicationStore.getState();
    withdrawApplication('1');
    
    const state = useApplicationStore.getState();
    expect(state.applications).toHaveLength(1);
    expect(state.applications[0].id).toBe('2');
  });
});