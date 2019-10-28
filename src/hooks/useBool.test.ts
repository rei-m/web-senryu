import { renderHook, act } from '@testing-library/react-hooks';
import { useBool } from './useBool';

describe('hooks', () => {
  describe('useBool', () => {
    it('should set true', () => {
      const { result } = renderHook(() => useBool(false));
      const [state, setTrue] = result.current;
      expect(state).toBeFalsy();
      act(() => {
        setTrue();
      });
      expect(result.current[0]).toBeTruthy();
    });

    it('should set false', () => {
      const { result } = renderHook(() => useBool(true));
      const [state, , setFalse] = result.current;
      expect(state).toBeTruthy();
      act(() => {
        setFalse();
      });
      expect(result.current[0]).toBeFalsy();
    });
  });
});
