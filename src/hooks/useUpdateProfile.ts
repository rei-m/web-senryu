import { useCallback } from 'react';
import { User } from '@src/domain';
import { AuthenticationService } from '@src/domain/services';
import { useDiContainer } from './useDiContainer';
import { useBool } from './useBool';

type Deps = {
  authenticationService: AuthenticationService;
};

export const useUpdateProfile = (
  { authenticationService }: Deps = useDiContainer()
) => {
  const [isProcessing, startProcess, finsihProcess] = useBool(false);

  const updateProfile = useCallback(async (user: User) => {
    startProcess();
    try {
      await authenticationService.updateProfile(user);
      finsihProcess();
    } catch (error) {
      // TODO
      console.error(error);
    }
  }, []);

  return { isProcessing, updateProfile };
};
