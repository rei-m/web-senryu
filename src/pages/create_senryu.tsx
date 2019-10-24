import React, { useState } from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

import makeStyles from '@src/styles/makeStyles';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import SenryuForm from '@src/components/organisms/SenryuForm';
import SenryuConfirmDialog from '@src/components/organisms/SenryuConfirmDialog';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';

import { useAuthUser } from '@src/hooks/useAuthUser';
import { useCreateSenryu } from '@src/hooks/useCreateSenryu';

import { SenryuDraft, User } from '@src/domain';
import { ProcessingState, AppError } from '@src/types';
import { NavMenu } from '@src/constants';
import { ROUTING } from '@src/constants/routing';

export type Props = RouteComponentProps;

export type PresenterProps = {
  processingState: ProcessingState;
  user?: User | null;
  senryu?: SenryuDraft;
  confirmDialogOpen: boolean;
  error: AppError | null;
  onSubmitForm: (value: SenryuDraft) => void;
  onClickPost: (value: SenryuDraft) => void;
  onCloseConfirmDialog: () => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

export type State = {
  senryu?: SenryuDraft;
  confirmOpen: boolean;
};

const useStyles = makeStyles(theme => ({
  cautionContainer: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  errorContainer: {
    textAlign: 'left',
    color: theme.palette.error.main,
    paddingBottom: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(2),
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
  senryu,
  confirmDialogOpen,
  error,
  onSubmitForm,
  onClickPost,
  onCloseConfirmDialog,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <NoIndexPageTemplate
      user={user}
      title={`投稿`}
      navMenu={NavMenu.CreateSenryu}
      content={
        <>
          {processingState === 'waiting' ? (
            <>
              {error && (
                <div className={classes.errorContainer}>
                  <Txt size="s">{error.message}</Txt>
                </div>
              )}
              <div className={classes.cautionContainer}>
                <Txt size="ss">
                  ※
                  <a
                    href={ROUTING.guideline}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ガイドライン
                  </a>
                  を守って投稿してください
                </Txt>
              </div>
              {user && (
                <SenryuForm
                  user={user}
                  onSubmit={onSubmitForm}
                  className={classes.form}
                />
              )}
            </>
          ) : processingState === 'complete' ? (
            <Redirect
              from={ROUTING.senryuNew}
              to={ROUTING.senryu}
              state={{ message: '投稿に成功しました！' }}
              noThrow
            />
          ) : (
            <div className={classes.progressContainer}>
              <Progress />
            </div>
          )}
          <SenryuConfirmDialog
            open={confirmDialogOpen}
            senryu={senryu}
            onClickPost={onClickPost}
            onClose={onCloseConfirmDialog}
          />
        </>
      }
    />
  );
};

export const Container = ({ presenter }: ContainerProps) => {
  const user = useAuthUser();
  const { processingState, error, createSenryu } = useCreateSenryu();
  const [state, setState] = useState<State>({ confirmOpen: false });

  const handleSubmitForm = (value: SenryuDraft) => {
    setState({ ...state, senryu: value, confirmOpen: true });
  };

  const handleClickPost = async (value: SenryuDraft) => {
    await createSenryu(value);
  };

  const handleClose = () => {
    setState({ ...state, confirmOpen: false });
  };

  return presenter({
    processingState,
    user,
    senryu: state.senryu,
    confirmDialogOpen: state.confirmOpen,
    error,
    onSubmitForm: handleSubmitForm,
    onClickPost: handleClickPost,
    onCloseConfirmDialog: handleClose,
  });
};

const CreateSenryuPage = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default CreateSenryuPage;
