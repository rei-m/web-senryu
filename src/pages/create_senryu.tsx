import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@src/styles/makeStyles';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
import SenryuForm from '@src/components/organisms/SenryuForm';
import SenryuConfirmDialog from '@src/components/organisms/SenryuConfirmDialog';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import { SenryuDraft, User } from '@src/domain';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useCreateSenryu } from '@src/hooks/useCreateSenryu';
import { ROUTING } from '@src/constants/routing';
import { NavMenu } from '@src/constants';
import { theme } from '@src/styles/theme';

export type Props = RouteComponentProps;

export type PresenterProps = {
  isLoading: boolean;
  user?: User | null;
  senryu?: SenryuDraft;
  openConfirmDialog: boolean;
  onSubmitForm: (value: SenryuDraft) => void;
  onClickPost: (value: SenryuDraft) => void;
  onCloseConfirmDialog: () => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

export type State = {
  senryu?: SenryuDraft;
  openConfirm: boolean;
};

const useStyles = makeStyles(() => ({
  cautionContainer: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
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
  isLoading,
  user,
  senryu,
  openConfirmDialog,
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
        user !== undefined && !isLoading ? (
          <>
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
            <SenryuForm
              user={user}
              onSubmit={onSubmitForm}
              className={classes.form}
            />
            <SenryuConfirmDialog
              open={openConfirmDialog}
              senryu={senryu}
              onClickPost={onClickPost}
              onClose={onCloseConfirmDialog}
            />
          </>
        ) : (
          <div className={classes.progressContainer}>
            <Progress />
          </div>
        )
      }
    />
  );
};

export const Container = ({ navigate, presenter }: ContainerProps) => {
  const user = useAuthUser();
  const { isProcessing, createSenryu } = useCreateSenryu();
  const [state, setState] = useState<State>({ openConfirm: false });

  const handleSubmitForm = (value: SenryuDraft) => {
    setState({ ...state, senryu: value, openConfirm: true });
  };

  const handleClickPost = async (value: SenryuDraft) => {
    // setState({ ...state, openConfirm: false });
    // TODO: エラーハンドリング
    await createSenryu(value);
    if (navigate) {
      navigate(ROUTING.senryu, { state: { message: '投稿に成功しました！' } });
    }
  };

  const handleClose = () => {
    setState({ ...state, openConfirm: false });
  };

  return presenter({
    isLoading: isProcessing,
    user,
    senryu: state.senryu,
    openConfirmDialog: state.openConfirm,
    onSubmitForm: handleSubmitForm,
    onClickPost: handleClickPost,
    onCloseConfirmDialog: handleClose,
  });
};

const CreateSenryuPage = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default CreateSenryuPage;
