import React, { useState, useMemo, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';

import makeStyles from '@src/styles/makeStyles';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import AlertDialog, {
  Props as AlertDialogProps,
} from '@src/components/molecules/AlertDialog';
import AccountMenu from '@src/components/organisms/AccountMenu';
import ConfirmDeleteAccountDialog from '@src/components/organisms/ConfirmDeleteAccountDialog';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import UserReAuthDialog from '@src/components/organisms/UserReAuthDialog';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';

import { useAuthUser } from '@src/hooks/useAuthUser';
import { useBool } from '@src/hooks/useBool';
import { useDeleteAccount } from '@src/hooks/useDeleteAccount';
import { useSignOut } from '@src/hooks/useSignOut';
import { useUpdateProfile } from '@src/hooks/useUpdateProfile';

import { User } from '@src/domain';
import { ProcessingState, AppError } from '@src/types';
import { NavMenu } from '@src/constants';

export type Props = RouteComponentProps;

export type PresenterProps = {
  processingState: ProcessingState;
  user: User | null;
  isSettingDialogOpen: boolean;
  alertDialog: React.ReactElement<AlertDialogProps> | null;
  error: AppError | null;
  onClickSetting: () => void;
  onClickPostProfile: (user: User) => void;
  onCloseSettingDialog: () => void;
  onClickSignOut: () => void;
  onClickDelete: () => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

const useStyles = makeStyles(theme => ({
  errorContainer: {
    textAlign: 'left',
    color: theme.palette.error.main,
    paddingBottom: theme.spacing(2),
  },
  progressContainer: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    minHeight: 248,
  },
}));

export const Presenter = ({
  processingState,
  user,
  isSettingDialogOpen,
  alertDialog,
  error,
  onClickSetting,
  onClickPostProfile,
  onCloseSettingDialog,
  onClickSignOut,
  onClickDelete,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <NoIndexPageTemplate
      title={`管理`}
      user={user}
      navMenu={NavMenu.Settings}
      content={
        <>
          {processingState !== 'processing' ? (
            <>
              {error && (
                <div className={classes.errorContainer}>
                  <Txt size="s">{error.message}</Txt>
                </div>
              )}
              <AccountMenu
                user={user ? user : null}
                onClickSetting={onClickSetting}
                onClickSignOut={onClickSignOut}
                onClickDeleteAccount={onClickDelete}
              />
            </>
          ) : (
            <div className={classes.progressContainer}>
              <Progress />
            </div>
          )}
          {!!user && (
            <UserSettingDialog
              open={isSettingDialogOpen}
              initialUser={user}
              authError={null}
              onClickPost={onClickPostProfile}
              onClose={onCloseSettingDialog}
            />
          )}
          {alertDialog}
        </>
      }
    />
  );
};

export const Container = ({ presenter }: ContainerProps) => {
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

  const {
    processingState,
    isRequireRecentLogin,
    error,
    deleteAccount,
    cancelDelationAccount,
  } = useDeleteAccount();

  const [reAuthError, setReAuthError] = useState<AppError | null>(null);

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
        setAlertDialogType(null);
        deleteAccount();
      };
      return (
        <ConfirmDeleteAccountDialog
          open={isAlertDialogOpen}
          onClickPositive={handleClickPositive}
          onClose={closeAlertDialog}
        />
      );
    } else if (isRequireRecentLogin) {
      return (
        <UserReAuthDialog
          open={isRequireRecentLogin}
          contentText="アカウント削除前に認証をお願いいたします。認証完了後に削除処理を行います。"
          onAuthSuccess={deleteAccount}
          onAuthFailure={setReAuthError}
          onClose={cancelDelationAccount}
        />
      );
    } else {
      return null;
    }
  }, [alertDialogType, isAlertDialogOpen, isRequireRecentLogin]);

  return presenter({
    processingState,
    user: authUser ? authUser : null,
    isSettingDialogOpen,
    alertDialog,
    error: error ? error : reAuthError ? reAuthError : null,
    onClickSetting: openSettingDialog,
    onClickPostProfile: handleClickPostProfile,
    onCloseSettingDialog: closeSettingDialog,
    onClickSignOut: handleClickSignOut,
    onClickDelete: handleClickDelete,
  });
};

const AccountPage = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default AccountPage;
