import { useCallback, useState } from 'react';
import { AppError } from '@src/types';

type Return = [AppError | null, (error: AppError) => void, () => void];

export const useAppError = (initialState: AppError | null = null): Return => {
  const [state, setState] = useState(initialState);
  const setError = useCallback((error: AppError) => setState(error), []);
  const cleanError = useCallback(() => setState(null), []);
  return [state, setError, cleanError];
};
