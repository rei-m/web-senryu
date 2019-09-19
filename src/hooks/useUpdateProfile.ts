import { useState } from 'react';
import { User } from '@src/domain';
import { AuthenticationService } from '@src/domain/services';
import { useDiContainer } from './useDiContainer';

type Deps = {
  authenticationService: AuthenticationService;
};

type State = {
  isUpdating: boolean;
};

export const useUpdateProfile = (
  { authenticationService }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({ isUpdating: false });
  const updateProfile = (user: User) => {
    setState({ isUpdating: true });
    authenticationService
      .updateProfile(user)
      .then(() => {
        setState({ isUpdating: false });
      })
      .catch(reason => {
        console.error(reason);
      });
  };

  return { ...state, updateProfile };
};
