import { useContext } from 'react';
import { AppAuthContext } from '@src/contexts/AppAuthProvider';

export const useAppUser = () => useContext(AppAuthContext).user;
