import { renderHook, act } from '@testing-library/react-hooks';
import { AuthenticationService } from '@src/domain/services';
import { AppError } from '@src/types';
import { useInitializeUser } from './useInitializeUser';
import { genMockAuthenticationService } from '@test/mock';

describe('hooks', () => {
  describe('useInitializeUser', () => {
    let authenticationService: AuthenticationService;

    beforeEach(() => {
      authenticationService = genMockAuthenticationService();
      authenticationService.initialize = jest.fn(_user => Promise.resolve());
    });

    it('should return initial state', () => {
      const { result } = renderHook(() =>
        useInitializeUser({ authenticationService })
      );
      const { processingState, error } = result.current;
      expect(processingState).toEqual('waiting');
      expect(error).toBeNull();
    });

    it('can initialize user', async () => {
      const arg = {
        id: 'testId',
        ryugou: 'testRyugou',
        description: 'null',
        profileImageUrl: null,
      };

      const { result, waitForNextUpdate } = renderHook(() =>
        useInitializeUser({ authenticationService })
      );

      const { initializeUser } = result.current;

      act(() => {
        initializeUser(arg);
      });

      expect(result.current.processingState).toEqual('processing');

      await waitForNextUpdate();

      expect(result.current.processingState).toEqual('complete');
      expect(authenticationService.initialize).toHaveBeenCalledWith(arg);
    });

    it('can catch error when fail to create senryu', async () => {
      const arg = {
        id: 'testId',
        ryugou: 'testRyugou',
        description: 'null',
        profileImageUrl: null,
      };

      const error: AppError = { code: 'unhandled', message: 'error' };
      authenticationService.initialize = jest.fn(() => Promise.reject(error));

      const { result, waitForNextUpdate } = renderHook(() =>
        useInitializeUser({ authenticationService })
      );

      const { initializeUser } = result.current;
      act(() => {
        initializeUser(arg);
      });

      expect(result.current.processingState).toEqual('processing');

      await waitForNextUpdate();

      expect(result.current.processingState).toEqual('waiting');
      expect(result.current.error).toEqual(error);
    });
  });
});
