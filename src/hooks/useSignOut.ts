import { useCallback } from 'react';
import { AuthenticationService } from '@src/domain/services';
import { AppError, ProcessingState } from '@src/types';
import { useAppError } from './useAppError';
import { useDiContainer } from './useDiContainer';
import { useProcessingState } from './useProcessingState';

type Deps = {
  authenticationService: AuthenticationService;
};

type Return = {
  processingState: ProcessingState;
  error: AppError | null;
  signOut: () => Promise<void>;
};

export const useSignOut = (
  { authenticationService }: Deps = useDiContainer()
): Return => {
  const [
    processingState,
    waitProcess,
    startProcess,
    completeProcess,
  ] = useProcessingState();
  const [error, setError, cleanError] = useAppError();

  const signOut = useCallback(async () => {
    startProcess();
    try {
      await authenticationService.signOut();
      cleanError();
      completeProcess();
    } catch (error) {
      setError(error);
      waitProcess();
    }
  }, []);

  return { processingState, error, signOut };
};
