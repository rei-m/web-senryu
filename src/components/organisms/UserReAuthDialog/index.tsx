import React from 'react';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@src/styles/makeStyles';
import FirebaseAuthUI from '@src/components/organisms/FirebaseAuthUI';
import Heading from '@src/components/atoms/Heading';
import { AppError } from '@src/types';

export type Props = {
  open: boolean;
  contentText: string | React.ReactElement;
  onAuthSuccess: () => void;
  onAuthFailure: (error: AppError) => void;
  onClose: () => void;
};

export type PresenterProps = {
  open: boolean;
  contentText: string | React.ReactElement;
  providerIdList: Array<string>;
  onAuthSuccess: () => void;
  onAuthFailure: (error: AppError) => void;
  onClose: () => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(4),
  },
}));

export const Presenter = ({
  open,
  contentText,
  providerIdList,
  onAuthSuccess,
  onAuthFailure,
  onClose,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <Dialog open={open} aria-labelledby="user-reauth-dialog-title">
      <DialogTitle id="user-reauth-dialog-title" disableTypography>
        <Heading level={6} visualLevel={3}>
          アカウント再認証
        </Heading>
      </DialogTitle>
      <DialogContent>
        {0 < providerIdList.length ? (
          <>
            <DialogContentText>{contentText}</DialogContentText>
            <FirebaseAuthUI
              callbacks={{
                signInSuccessWithAuthResult: function(_authResult: any) {
                  onClose();
                  onAuthSuccess();
                  return false;
                },
                signInFailure: function(error: firebaseui.auth.AuthUIError) {
                  onClose();
                  onAuthFailure({
                    code: 'unauthenticated',
                    message: error.message,
                  });
                  return Promise.resolve();
                },
              }}
              providerIdList={providerIdList}
              className={classes.form}
            />
          </>
        ) : (
          <DialogContentText>認証情報が見つかりませんでした</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const Container = ({
  open,
  contentText,
  onAuthSuccess,
  onAuthFailure,
  onClose,
  presenter,
}: ContainerProps) => {
  const currentUser = firebase.auth().currentUser;
  const providerIdList = currentUser
    ? currentUser.providerData
        .filter((d: firebase.UserInfo | null): d is firebase.UserInfo => !!d)
        .map(d => d.providerId)
    : [];

  return presenter({
    open,
    contentText,
    providerIdList,
    onAuthSuccess,
    onAuthFailure,
    onClose,
  });
};

/**
 * firebaseUI使ってるところは密結合が避けられないので綺麗に書くのは諦めた
 *
 * @param props Props
 */
const UserReAuthDialog = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default UserReAuthDialog;
