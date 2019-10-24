import { useContext } from 'react';
import { AppAuthContext } from '@src/contexts/AppAuthProvider';
import { User } from '@src/domain';

export const useAuthUser: () => User | null | undefined = () =>
  useContext(AppAuthContext).user;
