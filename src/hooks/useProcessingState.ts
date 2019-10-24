import { useCallback, useState } from 'react';
import { ProcessingState } from '@src/types';

export const useProcessingState = (
  initialState: ProcessingState = 'waiting'
): [ProcessingState, () => void, () => void, () => void] => {
  const [state, setState] = useState(initialState);
  const setWaiting = useCallback(() => setState('waiting'), []);
  const setProcessing = useCallback(() => setState('processing'), []);
  const setComplete = useCallback(() => setState('complete'), []);
  return [state, setWaiting, setProcessing, setComplete];
};
