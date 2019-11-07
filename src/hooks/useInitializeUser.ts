import { useCallback } from 'react';
import { User } from '@src/domain';
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
  initializeUser: (newUser: User) => void;
};

export const useInitializeUser = (
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

  const initializeUser = useCallback((newUser: User) => {
    startProcess();
    safeResolve(authenticationService.initialize(newUser))(
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

  return { processingState, error, initializeUser };
};
