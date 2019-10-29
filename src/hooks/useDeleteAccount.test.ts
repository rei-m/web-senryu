import { renderHook, act } from '@testing-library/react-hooks';
import { AppError } from '@src/types';
import { useDeleteAccount } from './useDeleteAccount';
import { genMockAuthenticationService } from '@test/mock';

describe('hooks', () => {
  describe('useDeleteAccount', () => {
    it('should return initial state', () => {
      const { result } = renderHook(() =>
        useDeleteAccount({
          authenticationService: genMockAuthenticationService(),
        })
      );
      const { processingState, isRequireRecentLogin, error } = result.current;
      expect(processingState).toEqual('waiting');
      expect(isRequireRecentLogin).toBeFalsy();
      expect(error).toBeNull();
    });

    it('can delete account', async () => {
      const authenticationService = genMockAuthenticationService();
      authenticationService.delete = jest.fn(() => Promise.resolve());
      const { result } = renderHook(() =>
        useDeleteAccount({ authenticationService })
      );
      const { deleteAccount } = result.current;
      await act(async () => {
        await deleteAccount();
      });
      expect(result.current.processingState).toEqual('complete');
      expect(authenticationService.delete).toHaveBeenCalled();
    });

    it('notify require recent login', async () => {
      const authenticationService = genMockAuthenticationService();
      const error: AppError = {
        code: 'requires-recent-login',
        message: 'error',
      };
      authenticationService.delete = jest.fn(() => Promise.reject(error));
      const { result } = renderHook(() =>
        useDeleteAccount({ authenticationService })
      );
      const { deleteAccount } = result.current;
      await act(async () => {
        await deleteAccount();
      });
      expect(result.current.processingState).toEqual('processing');
      expect(result.current.isRequireRecentLogin).toBeTruthy();
      expect(result.current.error).toBeNull();
      expect(authenticationService.delete).toHaveBeenCalled();
    });

    it('can catch error when fail to create senryu', async () => {
      const authenticationService = genMockAuthenticationService();
      const error: AppError = { code: 'unhandled', message: 'error' };
      authenticationService.delete = jest.fn(() => Promise.reject(error));
      const { result } = renderHook(() =>
        useDeleteAccount({ authenticationService })
      );
      const { deleteAccount } = result.current;
      await act(async () => {
        await deleteAccount();
      });
      expect(result.current.processingState).toEqual('waiting');
      expect(result.current.error).toEqual(error);
      expect(authenticationService.delete).toHaveBeenCalled();
    });
  });
});
