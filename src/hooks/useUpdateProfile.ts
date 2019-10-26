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
  updateProfile: (user: User) => Promise<void>;
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

  const updateProfile = useCallback(async (user: User) => {
    startProcess();
    try {
      await authenticationService.updateProfile(user);
      cleanError();
      completeProcess();
    } catch (error) {
      setError(error);
      waitProcess();
    }
  }, []);

  return { processingState, error, updateProfile };
};
