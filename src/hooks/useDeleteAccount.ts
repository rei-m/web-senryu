import { useState } from 'react';
import { AuthenticationService } from '@src/domain/services';
import { useDiContainer } from './useDiContainer';

type Deps = {
  authenticationService: AuthenticationService;
};

type State = {
  isDeleteAccountProcessing: boolean;
};

export const useDeleteAccount = (
  { authenticationService }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({
    isDeleteAccountProcessing: false,
  });
  const deleteAccount = () => {
    setState({ isDeleteAccountProcessing: true });
    authenticationService
      .delete()
      .then(() => {
        setState({ isDeleteAccountProcessing: false });
      })
      .catch(reason => {
        console.error(reason);
      });
  };

  return { ...state, deleteAccount };
};
