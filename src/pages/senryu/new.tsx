import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@src/styles/makeStyles';
import NoIndexPageTemplate from '@src/components/templates/NoIndexPageTemplate';
import SenryuForm from '@src/components/organisms/SenryuForm';
import SenryuConfirmDialog from '@src/components/organisms/SenryuConfirmDialog';
import Progress from '@src/components/atoms/Progress';
import { SenryuDraft, User } from '@src/domain';
import { useAppUser } from '@src/hooks/useAppUser';
import { useCreateSenryu } from '@src/hooks/useCreateSenryu';
import { ROUTING } from '@src/constants/routing';

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
      login={!!user}
      title={`投稿`}
      content={
        user !== undefined && !isLoading ? (
          <>
            <SenryuForm user={user} onSubmit={onSubmitForm} />
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
  const user = useAppUser();
  const { isCreating, createSenryu } = useCreateSenryu();
  const [state, setState] = useState<State>({ openConfirm: false });

  const handleSubmitForm = (value: SenryuDraft) => {
    setState({ ...state, senryu: value, openConfirm: true });
  };

  const handleClickPost = async (value: SenryuDraft) => {
    setState({ ...state, openConfirm: false });
    // TODO: エラーハンドリング
    const id = await createSenryu(value);
    if (navigate) {
      navigate(ROUTING.senryuShow.replace(':id', id));
    }
  };

  const handleClose = () => {
    setState({ ...state, openConfirm: false });
  };

  return presenter({
    isLoading: isCreating,
    user,
    senryu: state.senryu,
    openConfirmDialog: state.openConfirm,
    onSubmitForm: handleSubmitForm,
    onClickPost: handleClickPost,
    onCloseConfirmDialog: handleClose,
  });
};

const SenryuNewPage = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default SenryuNewPage;
