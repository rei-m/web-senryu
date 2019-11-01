import { renderHook, act } from '@testing-library/react-hooks';
import { AuthenticationService } from '@src/domain/services';
import { AppError } from '@src/types';
import { User } from '@src/domain';
import { useUpdateProfile } from './useUpdateProfile';
import { genMockAuthenticationService, USER_1 } from '@test/mock';

describe('hooks', () => {
  describe('useUpdateProfile', () => {
    let authenticationService: AuthenticationService;

    beforeEach(() => {
      authenticationService = genMockAuthenticationService();
      authenticationService.updateProfile = jest.fn((_user: User) =>
        Promise.resolve()
      );
    });

    it('should return initial state', () => {
      const { result } = renderHook(() =>
        useUpdateProfile({ authenticationService })
      );
      const { processingState, error } = result.current;
      expect(processingState).toEqual('waiting');
      expect(error).toBeNull();
    });

    it('can update profile', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useUpdateProfile({ authenticationService })
      );

      const { updateProfile } = result.current;

      act(() => {
        updateProfile(USER_1);
      });

      expect(result.current.processingState).toEqual('processing');

      await waitForNextUpdate();

      expect(result.current.processingState).toEqual('complete');
      expect(authenticationService.updateProfile).toHaveBeenCalledWith(USER_1);
    });

    it('can catch error when update failed', async () => {
      const signOutError: AppError = { code: 'unhandled', message: 'error' };

      authenticationService.updateProfile = () => Promise.reject(signOutError);

      const { result, waitForNextUpdate } = renderHook(() =>
        useUpdateProfile({ authenticationService })
      );

      const { updateProfile } = result.current;

      act(() => {
        updateProfile(USER_1);
      });

      expect(result.current.processingState).toEqual('processing');

      await waitForNextUpdate();

      expect(result.current.processingState).toEqual('waiting');
      expect(result.current.error).toEqual(signOutError);
    });
  });
});
