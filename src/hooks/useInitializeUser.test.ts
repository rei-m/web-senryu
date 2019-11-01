import { renderHook, act } from '@testing-library/react-hooks';
import { AppError } from '@src/types';
import { useInitializeUser } from './useInitializeUser';
import { genMockAuthenticationService } from '@test/mock';

describe('hooks', () => {
  describe('useInitializeUser', () => {
    it('should return initial state', () => {
      const { result } = renderHook(() =>
        useInitializeUser({
          authenticationService: genMockAuthenticationService(),
        })
      );
      const { processingState, error } = result.current;
      expect(processingState).toEqual('waiting');
      expect(error).toBeNull();
    });

    it('can initialize user', async () => {
      const authenticationService = genMockAuthenticationService();
      const arg = {
        id: 'testId',
        ryugou: 'testRyugou',
        description: 'null',
        profileImageUrl: null,
      };
      authenticationService.initialize = jest.fn(() => Promise.resolve());
      const { result } = renderHook(() =>
        useInitializeUser({ authenticationService })
      );
      const { initializeUser } = result.current;
      await act(async () => {
        await initializeUser(arg);
      });
      expect(result.current.processingState).toEqual('complete');
      expect(authenticationService.initialize).toHaveBeenCalledWith(arg);
    });

    it('can catch error when fail to create senryu', async () => {
      const authenticationService = genMockAuthenticationService();
      const arg = {
        id: 'testId',
        ryugou: 'testRyugou',
        description: 'null',
        profileImageUrl: null,
      };
      const error: AppError = { code: 'unhandled', message: 'error' };
      authenticationService.initialize = jest.fn(() => Promise.reject(error));
      const { result } = renderHook(() =>
        useInitializeUser({ authenticationService })
      );
      const { initializeUser } = result.current;
      await act(async () => {
        await initializeUser(arg);
      });
      expect(result.current.processingState).toEqual('waiting');
      expect(result.current.error).toEqual(error);
    });
  });
});
