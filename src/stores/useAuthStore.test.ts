import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('initializes with default values', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('handles login successfully', async () => {
    const { login } = useAuthStore.getState();

    await login('test@example.com', 'password');

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toMatchObject({
      email: 'test@example.com',
      name: 'test',
      role: 'jobseeker',
    });
    expect(state.isLoading).toBe(false);
  });

  it('sets loading state during login', async () => {
    const { login } = useAuthStore.getState();

    const loginPromise = login('test@example.com', 'password');

    // Check loading state immediately after calling login
    expect(useAuthStore.getState().isLoading).toBe(true);

    await loginPromise;

    // Check loading state after login completes
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it('handles logout', () => {
    // First login
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        role: 'jobseeker',
      },
      isAuthenticated: true,
    });

    const { logout } = useAuthStore.getState();
    logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('handles registration successfully', async () => {
    const { register } = useAuthStore.getState();

    await register({
      email: 'newuser@example.com',
      password: 'password',
      name: 'New User',
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toMatchObject({
      email: 'newuser@example.com',
      name: 'New User',
      role: 'jobseeker',
    });
  });

  it('updates user profile', () => {
    // Set initial user
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        role: 'jobseeker',
      },
      isAuthenticated: true,
    });

    const { updateProfile } = useAuthStore.getState();
    updateProfile({ name: 'Updated Name', avatar: 'avatar.jpg' });

    const state = useAuthStore.getState();
    expect(state.user).toMatchObject({
      id: '1',
      email: 'test@example.com',
      name: 'Updated Name',
      avatar: 'avatar.jpg',
      role: 'jobseeker',
    });
  });

  it('does not update profile when user is null', () => {
    const { updateProfile } = useAuthStore.getState();
    updateProfile({ name: 'Updated Name' });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
  });
});
