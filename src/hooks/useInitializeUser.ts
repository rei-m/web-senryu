import { useCallback } from 'react';
import { User } from '@src/domain';
import { AuthenticationService } from '@src/domain/services';
import { AppError } from '@src/types';
import { useAppError } from './useAppError';
import { useDiContainer } from './useDiContainer';

type Deps = {
  authenticationService: AuthenticationService;
};

type Return = {
  error: AppError | null;
  initializeUser: (newUser: User) => Promise<void>;
};

export const useInitializeUser = (
  { authenticationService }: Deps = useDiContainer()
): Return => {
  const [error, setError, cleanError] = useAppError();

  const initializeUser = useCallback(async (newUser: User) => {
    try {
      await authenticationService.initialize(newUser);
      cleanError();
    } catch (error) {
      setError(error);
    }
  }, []);

  return { error, initializeUser };
};
