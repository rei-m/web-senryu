import { useCallback } from 'react';
import { User } from '@src/domain';
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
  initializeUser: (newUser: User) => Promise<void>;
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

  const initializeUser = useCallback(async (newUser: User) => {
    startProcess();
    try {
      await authenticationService.initialize(newUser);
      cleanError();
      completeProcess();
    } catch (error) {
      setError(error);
      waitProcess();
    }
  }, []);

  return { processingState, error, initializeUser };
};
