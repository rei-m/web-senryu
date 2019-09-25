import { useEffect, useState, useCallback } from 'react';
import { User, UninitializedUser } from '@src/domain';
import { AuthenticationService } from '@src/domain/services';
import { useDiContainer } from './useDiContainer';

type Deps = {
  authenticationService: AuthenticationService;
};

type State = {
  user: User | UninitializedUser | null;
};

export const useFirebaseUser = (
  { authenticationService }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({
    user: null,
  });

  useEffect(() => {
    const callback = (user: User | UninitializedUser | null) => {
      setState({ user });
    };
    const unsubscribe = authenticationService.onAuthStateChanged(callback);

    return () => {
      console.info(`firebase: unsubscribe onAuthStateChanged`);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const callback = (user: User) => {
      setState({ user });
    };
    const unsubscribe = authenticationService.onProfileChanged(callback);

    return () => {
      console.info(`firebase: unsubscribe onProfileChanged`);
      unsubscribe();
    };
  }, [state.user !== null]);

  const initializeUser = useCallback(async (newUser: User) => {
    try {
      authenticationService.initialize(newUser);
      setState({ user: newUser });
    } catch (error) {
      // TODO
      console.error(error);
    }
  }, []);

  return { ...state, initializeUser };
};
