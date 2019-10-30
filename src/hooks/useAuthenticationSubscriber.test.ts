import { renderHook } from '@testing-library/react-hooks';
import { User, UninitializedUser } from '@src/domain';
import { AppError } from '@src/types';
import { useAuthenticationSubscriber } from './useAuthenticationSubscriber';
import { genMockAuthenticationService, USER_1 } from '@test/mock';

describe('hooks', () => {
  describe('useAuthenticationSubscriber', () => {
    it('should return authentication user', () => {
      const authenticationService = genMockAuthenticationService();
      authenticationService.onAuthStateChanged = (
        callback: (user: User | UninitializedUser | null) => void
      ) => () => {
        callback({ ...USER_1 });
      };
      authenticationService.onProfileChanged = (
        callback: (user: User) => void
      ) => {
        callback({ ...USER_1 });
        return jest.fn();
      };
      authenticationService.onErrorOccurred = (
        _callback: (error: AppError) => void
      ) => {};

      const { result } = renderHook(() =>
        useAuthenticationSubscriber({
          authenticationService,
        })
      );
      const { user, error } = result.current;
      expect(user).toEqual(USER_1);
      expect(error).toBeNull();
    });
  });
});
