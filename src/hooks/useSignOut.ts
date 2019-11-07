import { useCallback } from 'react';
import { AuthenticationService } from '@src/domain/services';
import { AppError, ProcessingState } from '@src/types';
import { useAppError } from './useAppError';
import { useDiContainer } from './useDiContainer';
import { useProcessingState } from './useProcessingState';
import { useSafeResolve } from './useSafeResolve';

type Deps = {
  authenticationService: AuthenticationService;
};

type Return = {
  processingState: ProcessingState;
  error: AppError | null;
  signOut: () => void;
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
  const { safeResolve } = useSafeResolve();

  const signOut = useCallback(() => {
    startProcess();
    safeResolve(authenticationService.signOut())(
      () => {
        cleanError();
        completeProcess();
      },
      error => {
        setError(error);
        waitProcess();
      }
    );
  }, []);

  return { processingState, error, signOut };
};
