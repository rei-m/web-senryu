import React from 'react';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import { User } from '@src/domain';
import { useAuthenticationSubscriber } from '@src/hooks/useAuthenticationSubscriber';
import { useInitializeUser } from '@src/hooks/useInitializeUser';

export type AppAuthState = {
  user?: User | null;
};

export const AppAuthContext = React.createContext<AppAuthState>({});

const AppAuthProvider: React.FC<{}> = ({ children }) => {
  const { user } = useAuthenticationSubscriber();
  const { error: initializeError, initializeUser } = useInitializeUser();
  return (
    <AppAuthContext.Provider
      value={{
        user: user ? (user.ryugou === null ? null : user) : user,
      }}
    >
      {children}
      {user && (
        <UserSettingDialog
          open={user.ryugou === null}
          initialUser={user}
          authError={initializeError}
          onClickPost={initializeUser}
        />
      )}
    </AppAuthContext.Provider>
  );
};

export default AppAuthProvider;
