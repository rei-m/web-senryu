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
  updateProfile: (user: User) => void;
};

export const useUpdateProfile = (
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

  const updateProfile = useCallback((user: User) => {
    startProcess();
    safeResolve(authenticationService.updateProfile(user))(
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

  return { processingState, error, updateProfile };
};
