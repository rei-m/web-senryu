import { useState } from 'react';
import { AuthenticationService } from '@src/domain/services';
import { useDiContainer } from './useDiContainer';

type Deps = {
  authenticationService: AuthenticationService;
};

type State = {
  isSignOutProcessing: boolean;
};

export const useSignOut = (
  { authenticationService }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({ isSignOutProcessing: false });
  const signOut = () => {
    setState({ isSignOutProcessing: true });
    authenticationService
      .signOut()
      .then(() => {
        setState({ isSignOutProcessing: false });
      })
      .catch(reason => {
        console.error(reason);
      });
  };

  return { ...state, signOut };
};
