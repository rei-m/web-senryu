import { useCallback } from 'react';
import { AuthenticationService } from '@src/domain/services';
import { AppError, ProcessingState } from '@src/types';
import { useAppError } from './useAppError';
import { useBool } from './useBool';
import { useDiContainer } from './useDiContainer';
import { useProcessingState } from './useProcessingState';
import { useSafeResolve } from './useSafeResolve';

type Deps = {
  authenticationService: AuthenticationService;
};

type Return = {
  processingState: ProcessingState;
  isRequireRecentLogin: boolean;
  error: AppError | null;
  deleteAccount: () => void;
  cancelDelationAccount: () => void;
};

export const useDeleteAccount = (
  { authenticationService }: Deps = useDiContainer()
): Return => {
  const [
    processingState,
    waitProcess,
    startProcess,
    completeProcess,
  ] = useProcessingState();
  const [
    isRequireRecentLogin,
    setIsRequireRecentLogin,
    releaseIsRequireRecentLogin,
  ] = useBool(false);
  const [error, setError, cleanError] = useAppError();
  const { safeResolve } = useSafeResolve();

  const deleteAccount = useCallback(() => {
    startProcess();
    safeResolve(authenticationService.delete())(
      () => {
        releaseIsRequireRecentLogin();
        cleanError();
        completeProcess();
      },
      error => {
        if (error.code && error.code === 'requires-recent-login') {
          setIsRequireRecentLogin();
        } else {
          setError(error);
          waitProcess();
        }
      }
    );
  }, []);

  return {
    processingState,
    isRequireRecentLogin,
    error,
    deleteAccount,
    cancelDelationAccount: releaseIsRequireRecentLogin,
  };
};
