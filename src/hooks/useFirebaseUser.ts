import { useEffect, useState } from 'react';
import { User, UninitializedUser } from '@src/domain';
import { AuthenticationService } from '@src/domain/services';
import { useDiContainer } from './useDiContainer';

type Deps = {
  authenticationService: AuthenticationService;
};

type State = {
  user: User | UninitializedUser | null;
  isAuthorizing: boolean;
};

export const useFirebaseUser = (
  { authenticationService }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({
    user: null,
    isAuthorizing: true,
  });

  useEffect(() => {
    const callback = (user: User | UninitializedUser | null) => {
      const isAuthorizing = user && user.ryugou === null ? true : false;
      setState({ user, isAuthorizing });
    };
    const unsubscribe = authenticationService.onAuthStateChanged(callback);

    return () => {
      console.info(`firebase: unsubscribe onAuthStateChanged`);
      unsubscribe();
    };
  }, []);

  const initializeUser = (newUser: User) => {
    authenticationService
      .initialize(newUser)
      .then(() => {
        setState({ user: newUser, isAuthorizing: false });
      })
      .catch(reason => {
        console.error(reason);
      });
  };

  return { ...state, initializeUser };
};
