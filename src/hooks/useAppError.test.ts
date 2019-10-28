import { renderHook, act } from '@testing-library/react-hooks';
import { useAppError } from './useAppError';

describe('hooks', () => {
  describe('useAppError', () => {
    it('should set Error', () => {
      const { result } = renderHook(() => useAppError());
      const [state, setError] = result.current;
      expect(state).toBeNull();
      act(() => {
        setError({ code: 'not-found', message: 'test' });
      });
      expect(result.current[0]).toEqual({ code: 'not-found', message: 'test' });
    });

    it('should clean Error', () => {
      const { result } = renderHook(() =>
        useAppError({ code: 'not-found', message: 'test' })
      );
      const [state, , cleanError] = result.current;
      expect(state).toEqual({ code: 'not-found', message: 'test' });
      act(() => {
        cleanError();
      });
      expect(result.current[0]).toBeNull();
    });
  });
});
