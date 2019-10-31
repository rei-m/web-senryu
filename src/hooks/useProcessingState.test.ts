import { renderHook, act } from '@testing-library/react-hooks';
import { useProcessingState } from './useProcessingState';

describe('hooks', () => {
  describe('useProcessingState', () => {
    it('can set waiting', () => {
      const { result } = renderHook(() => useProcessingState('complete'));
      const [state, setWaiting] = result.current;
      expect(state).toEqual('complete');
      act(() => {
        setWaiting();
      });
      expect(result.current[0]).toEqual('waiting');
    });

    it('can set processing', () => {
      const { result } = renderHook(() => useProcessingState());
      const [state, , setProcessing] = result.current;
      expect(state).toEqual('waiting');
      act(() => {
        setProcessing();
      });
      expect(result.current[0]).toEqual('processing');
    });

    it('can set complete', () => {
      const { result } = renderHook(() => useProcessingState());
      const [state, , , setComplete] = result.current;
      expect(state).toEqual('waiting');
      act(() => {
        setComplete();
      });
      expect(result.current[0]).toEqual('complete');
    });
  });
});
