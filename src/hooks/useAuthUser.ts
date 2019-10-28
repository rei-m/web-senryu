import { useContext } from 'react';
import { AppAuthContext, AppAuthState } from '@src/contexts/AppAuthProvider';
import { User } from '@src/domain';

export const useAuthUser: (context: AppAuthState) => User | null | undefined = (
  context = useContext(AppAuthContext)
) => context.user;
