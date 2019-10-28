import React from 'react';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import { User } from '@src/domain';
import { useFirebaseUser } from '@src/hooks/useFirebaseUser';

export type AppAuthState = {
  user?: User | null;
};

export const AppAuthContext = React.createContext<AppAuthState>({});

const AppAuthProvider: React.FC<{}> = ({ children }) => {
  const { user, error, initializeUser } = useFirebaseUser();
  return (
    <AppAuthContext.Provider
      value={{
        user: user ? (user.ryugou === null ? null : user) : null,
      }}
    >
      {children}
      {user && (
        <UserSettingDialog
          open={user.ryugou === null}
          initialUser={user}
          authError={error}
          onClickPost={initializeUser}
        />
      )}
    </AppAuthContext.Provider>
  );
};

export default AppAuthProvider;
