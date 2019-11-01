import { renderHook, act } from '@testing-library/react-hooks';
import { AppError } from '@src/types';
import { useSignOut } from './useSignOut';
import { genMockAuthenticationService } from '@test/mock';

describe('hooks', () => {
  describe('useSignOut', () => {
    it('should return initial state', () => {
      const authenticationService = genMockAuthenticationService();
      authenticationService.signOut = () => Promise.resolve();
      const { result } = renderHook(() =>
        useSignOut({
          authenticationService,
        })
      );
      const { processingState, error } = result.current;
      expect(processingState).toEqual('waiting');
      expect(error).toBeNull();
    });

    it('can sign out', async () => {
      const authenticationService = genMockAuthenticationService();
      authenticationService.signOut = jest.fn(() => Promise.resolve());
      const { result, waitForNextUpdate } = renderHook(() =>
        useSignOut({
          authenticationService,
        })
      );
      const { signOut } = result.current;
      act(() => {
        signOut();
      });

      expect(result.current.processingState).toEqual('processing');

      await waitForNextUpdate();

      expect(result.current.processingState).toEqual('complete');
      expect(authenticationService.signOut).toHaveBeenCalled();
    });

    it('can catch error when sign out failed', async () => {
      const authenticationService = genMockAuthenticationService();
      const signOutError: AppError = { code: 'unhandled', message: 'error' };

      authenticationService.signOut = () => Promise.reject(signOutError);
      const { result, waitForNextUpdate } = renderHook(() =>
        useSignOut({
          authenticationService,
        })
      );
      const { signOut } = result.current;
      act(() => {
        signOut();
      });

      expect(result.current.processingState).toEqual('processing');

      await waitForNextUpdate();

      expect(result.current.processingState).toEqual('waiting');
      expect(result.current.error).toEqual(signOutError);
    });
  });
});
