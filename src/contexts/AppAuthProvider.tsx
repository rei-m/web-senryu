import React, { FC, createContext } from 'react';
import { User } from '@src/types';
import { useFirebaseUser } from '@src/hooks/useFirebaseUser';

export const AppAuthContext = createContext<{
  user?: User | null;
}>({});

const AppAuthProvider: FC<{}> = ({ children }) => (
  <AppAuthContext.Provider value={{ user: useFirebaseUser() }}>
    {children}
  </AppAuthContext.Provider>
);

export default AppAuthProvider;
