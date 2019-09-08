import React from 'react';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import { User } from '@src/domain';
import { useFirebaseUser } from '@src/hooks/useFirebaseUser';

export const AppAuthContext = React.createContext<{
  user?: User | null;
}>({});

const AppAuthProvider: React.FC<{}> = ({ children }) => {
  const { user, initializeUser } = useFirebaseUser();
  const initializedUser = user ? (user.ryugou === null ? null : user) : null;
  const handleClickPost = (user: User) => {
    initializeUser(user);
  };
  return (
    <AppAuthContext.Provider
      value={{
        user: initializedUser,
      }}
    >
      {children}
      {user && user.ryugou === null && (
        <UserSettingDialog
          open={initializedUser === null}
          userId={user.id}
          onClickPost={handleClickPost}
        />
      )}
    </AppAuthContext.Provider>
  );
};

export default AppAuthProvider;
