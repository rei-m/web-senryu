import { useContext } from 'react';
import { AppAuthContext } from '@src/contexts/AppAuthProvider';

export const useAuthUser = () => useContext(AppAuthContext).user;
