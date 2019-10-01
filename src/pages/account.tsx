import React, { useState, useMemo, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
import AccountMenu from '@src/components/organisms/AccountMenu';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import ConfirmDeleteAccountDialog from '@src/components/organisms/ConfirmDeleteAccountDialog';
import AlertDialog, {
  Props as AlertDialogProps,
} from '@src/components/molecules/AlertDialog';
import { useBool } from '@src/hooks/useBool';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useUpdateProfile } from '@src/hooks/useUpdateProfile';
import { User } from '@src/domain';
import { useSignOut } from '@src/hooks/useSignOut';
import { useDeleteAccount } from '@src/hooks/useDeleteAccount';
import { ROUTING } from '@src/constants/routing';

export type Props = RouteComponentProps;

export type PresenterProps = {
  user: User | null;
  isSettingDialogOpen: boolean;
  alertDialog: React.ReactElement<AlertDialogProps> | null;
  onClickSetting: () => void;
  onClickPostProfile: (user: User) => void;
  onCloseSettingDialog: () => void;
  onClickSignIn: () => void;
  onClickSignOut: () => void;
  onClickDelete: () => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

export const AccountPagePresenter = ({
  user,
  isSettingDialogOpen,
  alertDialog,
  onClickSetting,
  onClickPostProfile,
  onCloseSettingDialog,
  onClickSignIn,
  onClickSignOut,
  onClickDelete,
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
          onClickDeleteAccount={onClickDelete}
        />
        {!!user && (
          <UserSettingDialog
            open={isSettingDialogOpen}
            initialUser={user}
            onClickPost={onClickPostProfile}
            onClose={onCloseSettingDialog}
          />
        )}
        {alertDialog}
      </>
    }
  />
);

export const AccountPageContainer = ({
  presenter,
  navigate,
}: ContainerProps) => {
  const authUser = useAuthUser();
  const [isSettingDialogOpen, openSettingDialog, closeSettingDialog] = useBool(
    false
  );
  const [isAlertDialogOpen, openAlertDialog, closeAlertDialog] = useBool(false);
  const [alertDialogType, setAlertDialogType] = useState<
    null | 'signOut' | 'delete'
  >(null);
  const { updateProfile } = useUpdateProfile();

  const { signOut } = useSignOut();

  const { deleteAccount } = useDeleteAccount();

  const handleClickSignIn = useCallback(() => {
    if (navigate) {
      navigate(ROUTING.auth, { state: { refferer: ROUTING.account } });
    }
  }, []);

  const handleClickSignOut = useCallback(() => {
    setAlertDialogType('signOut');
    openAlertDialog();
  }, []);

  const handleClickDelete = useCallback(() => {
    setAlertDialogType('delete');
    openAlertDialog();
  }, []);

  const handleClickPostProfile = useCallback((user: User) => {
    updateProfile(user);
    closeSettingDialog();
  }, []);

  const alertDialog = useMemo(() => {
    if (alertDialogType === 'signOut') {
      const handleClickPositive = () => {
        signOut();
        setAlertDialogType(null);
      };
      return (
        <AlertDialog
          open={isAlertDialogOpen}
          dialogTitle={`サインアウト`}
          contentText={`サインアウトします。よろしければ「サインアウトする」を押してください`}
          positiveButtonLabel={`サインアウトする`}
          negativeButtonLabel={`戻る`}
          onClickPositive={handleClickPositive}
          onClose={closeAlertDialog}
        />
      );
    } else if (alertDialogType === 'delete') {
      const handleClickPositive = () => {
        deleteAccount();
        setAlertDialogType(null);
      };
      return (
        <ConfirmDeleteAccountDialog
          open={isAlertDialogOpen}
          onClickPositive={handleClickPositive}
          onClose={closeAlertDialog}
        />
      );
    } else {
      return null;
    }
  }, [alertDialogType, isAlertDialogOpen]);

  return presenter({
    user: authUser ? authUser : null,
    isSettingDialogOpen,
    alertDialog,
    onClickSetting: openSettingDialog,
    onClickPostProfile: handleClickPostProfile,
    onCloseSettingDialog: closeSettingDialog,
    onClickSignIn: handleClickSignIn,
    onClickSignOut: handleClickSignOut,
    onClickDelete: handleClickDelete,
  });
};

const AccountPage = (props: Props) => (
  <AccountPageContainer {...props} presenter={AccountPagePresenter} />
);

export default AccountPage;
