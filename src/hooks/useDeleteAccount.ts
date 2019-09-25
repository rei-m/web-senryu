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

  const deleteAccount = useCallback(async () => {
    startProcess();
    try {
      await authenticationService.delete();
      finsihProcess();
    } catch (error) {
      // TODO
      console.error(error);
    }
  }, []);

  return { isProcessing, deleteAccount };
};
