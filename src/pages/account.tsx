import React from 'react';
import { RouteComponentProps } from '@reach/router';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
import AccountMenu from '@src/components/organisms/AccountMenu';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import { useBool } from '@src/hooks/useBool';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useUpdateProfile } from '@src/hooks/useUpdateProfile';
import { User } from '@src/domain';
import { useSignOut } from '@src/hooks/useSignOut';
import { ROUTING } from '@src/constants/routing';

export type Props = RouteComponentProps;

export type PresenterProps = {
  user: User | null;
  isSettingDialogOpen: boolean;
  onClickSetting: () => void;
  onClickPostProfile: (user: User) => void;
  onCloseSettingDialog: () => void;
  onClickSignIn: () => void;
  onClickSignOut: () => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

export const AccountPagePresenter = ({
  user,
  isSettingDialogOpen,
  onClickSetting,
  onClickPostProfile,
  onCloseSettingDialog,
  onClickSignIn,
  onClickSignOut,
}: PresenterProps) => (
  <NoIndexPageTemplate
    title={`管理`}
    user={user}
    content={
      <>
        <AccountMenu
          user={user ? user : null}
          onClickSetting={onClickSetting}
          onClickSignIn={onClickSignIn}
          onClickSignOut={onClickSignOut}
          onClickDeleteAccount={() => {}}
        />
        {!!user && (
          <UserSettingDialog
            open={isSettingDialogOpen}
            initialUser={user}
            onClickPost={onClickPostProfile}
            onClose={onCloseSettingDialog}
          />
        )}
      </>
    }
  />
);

export const AccountPageContainer = ({
  presenter,
  navigate,
}: ContainerProps) => {
  const authUser = useAuthUser();
  const [isDialogOpen, openDialog, closeDialog] = useBool(false);
  const { updateProfile } = useUpdateProfile();

  const { signOut } = useSignOut();

  const handleClickSignIn = () => {
    if (navigate) {
      navigate(ROUTING.auth, { state: { refferer: ROUTING.account } });
    }
  };

  const handleClickPostProfile = (user: User) => {
    updateProfile(user);
    closeDialog();
  };

  return presenter({
    user: authUser ? authUser : null,
    isSettingDialogOpen: isDialogOpen,
    onClickSetting: openDialog,
    onClickPostProfile: handleClickPostProfile,
    onCloseSettingDialog: closeDialog,
    onClickSignIn: handleClickSignIn,
    onClickSignOut: signOut,
  });
};

const AccountPage = (props: Props) => (
  <AccountPageContainer {...props} presenter={AccountPagePresenter} />
);

export default AccountPage;
