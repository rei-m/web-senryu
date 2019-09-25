import { useCallback } from 'react';
import { AuthenticationService } from '@src/domain/services';
import { useDiContainer } from './useDiContainer';
import { useBool } from './useBool';

type Deps = {
  authenticationService: AuthenticationService;
};

export const useSignOut = (
  { authenticationService }: Deps = useDiContainer()
) => {
  const [isProcessing, startProcess, finsihProcess] = useBool(false);

  const signOut = useCallback(async () => {
    startProcess();
    try {
      await authenticationService.signOut();
      finsihProcess();
    } catch (error) {
      // TODO
      console.error(error);
      finsihProcess();
    }
  }, []);

  return { isProcessing, signOut };
};
