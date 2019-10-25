import { useEffect, useState, useCallback } from 'react';
import { User, UninitializedUser } from '@src/domain';
import { AuthenticationService } from '@src/domain/services';
import { AppError } from '@src/types';
import { useAppError } from './useAppError';
import { useDiContainer } from './useDiContainer';

type Deps = {
  authenticationService: AuthenticationService;
};

type Return = {
  user: User | UninitializedUser | null;
  error: AppError | null;
  initializeUser: (newUser: User) => Promise<void>;
};

export const useFirebaseUser = (
  { authenticationService }: Deps = useDiContainer()
): Return => {
  const [user, setUser] = useState<User | UninitializedUser | null>(null);
  const [error, setError, cleanError] = useAppError();

  useEffect(() => {
    const callback = (received: User | UninitializedUser | null) => {
      cleanError();
      setUser(received);
    };
    const unsubscribe = authenticationService.onAuthStateChanged(callback);

    authenticationService.onErrorOccurred(setError);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const callback = (received: User) => {
      cleanError();
      setUser(received);
    };
    const unsubscribe = authenticationService.onProfileChanged(callback);

    return () => {
      unsubscribe();
    };
  }, [user !== null]);

  const initializeUser = useCallback(async (newUser: User) => {
    try {
      await authenticationService.initialize(newUser);
      setUser(newUser);
      cleanError();
    } catch (error) {
      setError(error);
    }
  }, []);

  return { user, error, initializeUser };
};
