import { useCallback } from 'react';
import { AuthenticationService } from '@src/domain/services';
import { useDiContainer } from './useDiContainer';
import { useBool } from './useBool';

type Deps = {
  authenticationService: AuthenticationService;
};

export const useDeleteAccount = (
  { authenticationService }: Deps = useDiContainer()
) => {
  const [isProcessing, startProcess, finsihProcess] = useBool(false);
  const [
    isRequireRecentLogin,
    setIsRequireRecentLogin,
    releaseIsRequireRecentLogin,
  ] = useBool(false);

  const deleteAccount = useCallback(async () => {
    startProcess();
    try {
      await authenticationService.delete();
      releaseIsRequireRecentLogin();
      finsihProcess();
    } catch (error) {
      if (error.code && error.code === 'auth/requires-recent-login') {
        setIsRequireRecentLogin();
      } else {
        console.error(error);
        // TODO
      }
    }
  }, []);

  return {
    isProcessing,
    isRequireRecentLogin,
    deleteAccount,
    cancelDelationAccount: releaseIsRequireRecentLogin,
  };
};
