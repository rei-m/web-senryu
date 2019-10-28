import { renderHook } from '@testing-library/react-hooks';
import { USER_1 } from '@test/mock';
import { useAuthUser } from './useAuthUser';

describe('hooks', () => {
  describe('useAuthUser', () => {
    it('should return auth user', () => {
      const { result } = renderHook(() => useAuthUser({ user: USER_1 }));
      const state = result.current;
      expect(state).toEqual(USER_1);
    });
  });
});
