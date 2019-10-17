import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import SenryuList from '@src/components/organisms/SenryuList';
import SenryuListEmpty from '@src/components/organisms/SenryuListEmpty';
import SenryuModal from '@src/components/organisms/SenryuModal';
import EditFab from '@src/components/molecules/EditFab';
import MoreButton from '@src/components/molecules/MoreButton';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import { useBool } from '@src/hooks/useBool';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useSenryuList } from '@src/hooks/useSenryuList';
import { Senryu, UserId, SenryuId, User } from '@src/domain';
import { ROUTING } from '@src/constants/routing';
import { NavMenu } from '@src/constants';

export type Props = RouteComponentProps;

export type PresenterProps = {
  authUser?: User | null;
  senryuList?: Array<Senryu>;
  totalCount: number;
  hasNextPage: boolean;
  isMoreLoading: boolean;
  isSenryuModalOpen: boolean;
  currentSenryu: Senryu | null;
  flashMessage?: string;
  error: Error | null;
  onClickSenryu: (senryu: Senryu) => void;
  onClickMore: () => void;
  onClickUserName: (userId: UserId) => void;
  onClickDeleteSenryu: (senryuId: SenryuId) => void;
  onCloseSenryuModal: () => void;
  onClickFab: (e: React.MouseEvent<{}>) => void;
};

export type ContainerProps = Props & {
  presenter: (props: PresenterProps) => React.ReactElement;
};

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 248,
  },
  more: {
    marginTop: theme.spacing(2),
  },
  flashMessage: {
    padding: theme.spacing(4, 2),
    color: theme.palette.primary.dark,
  },
  emptyMessage: {
    marginTop: theme.spacing(4),
  },
  fab: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(9),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export const Presenter = ({
  authUser,
  senryuList,
  totalCount,
  hasNextPage,
  isMoreLoading,
  isSenryuModalOpen,
  currentSenryu,
  flashMessage,
  error,
  onClickSenryu,
  onClickMore,
  onClickUserName,
  onClickDeleteSenryu,
  onCloseSenryuModal,
  onClickFab,
}: PresenterProps) => {
  const classes = useStyles();
  return (
    <SingleContentPageTemplate
      user={authUser}
      title={`みんなの川柳`}
      description={`こちらでは楽々川柳に投稿された川柳を見ることができます。楽々川柳は誰でも簡単に川柳を投稿することができるサイトです。`}
      navMenu={NavMenu.SenryuList}
      content={
        <div className={classes.root}>
          {error ? (
            <Txt className={classes.error}>{error.message}</Txt>
          ) : senryuList ? (
            <>
              {flashMessage && (
                <div className={classes.flashMessage}>
                  <Txt>{flashMessage}</Txt>
                </div>
              )}
              {0 < senryuList.length ? (
                <>
                  <SenryuList
                    senryuList={senryuList}
                    totalCount={totalCount}
                    onClickSenryu={onClickSenryu}
                  />
                  <EditFab
                    href={ROUTING.senryuNew}
                    onClick={onClickFab}
                    className={classes.fab}
                  />
                </>
              ) : (
                <SenryuListEmpty className={classes.emptyMessage} />
              )}
              {hasNextPage && (
                <div className={classes.more}>
                  {isMoreLoading ? (
                    <Progress />
                  ) : (
                    <MoreButton onClick={onClickMore} />
                  )}
                </div>
              )}
              <SenryuModal
                open={isSenryuModalOpen}
                senryu={currentSenryu}
                canDelete={
                  currentSenryu && authUser
                    ? currentSenryu.userId === authUser.id
                    : false
                }
                onClickUserName={onClickUserName}
                onClickDelete={onClickDeleteSenryu}
                onClose={onCloseSenryuModal}
              />
            </>
          ) : (
            <Progress />
          )}
        </div>
      }
    />
  );
};

export const Container = ({
  navigate,
  location,
  presenter,
}: ContainerProps) => {
  const authUser = useAuthUser();
  const {
    senryuList,
    totalCount,
    hasNextPage,
    error,
    isMoreLoading,
    fetchNextPage,
    deleteSenryu,
  } = useSenryuList();
  const [currentSenryu, displaySenryu] = useState<null | Senryu>(null);
  const [isSenryuModalOpen, openSenryuModal, closeSenryuModal] = useBool(
    currentSenryu !== null
  );
  const handleClickSenryu = (senryu: Senryu) => {
    displaySenryu(senryu);
    openSenryuModal();
  };

  const handleClickUserName = (userId: UserId) => {
    if (navigate) {
      navigate(ROUTING.usersShow.replace(`:id`, userId));
    }
  };

  const handleClickDeleteSenryu = (senryuId: SenryuId) => {
    closeSenryuModal();
    deleteSenryu(senryuId);
  };

  const handleClickFab = (e: React.MouseEvent<{}>) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigate) {
      navigate(ROUTING.senryuNew);
    }
  };

  return presenter({
    authUser,
    senryuList,
    totalCount,
    hasNextPage,
    isMoreLoading,
    isSenryuModalOpen,
    currentSenryu,
    flashMessage:
      location && location.state.message ? location.state.message : undefined,
    error,
    onClickSenryu: handleClickSenryu,
    onClickMore: fetchNextPage,
    onClickUserName: handleClickUserName,
    onClickDeleteSenryu: handleClickDeleteSenryu,
    onCloseSenryuModal: closeSenryuModal,
    onClickFab: handleClickFab,
  });
};

const SenryuPage = (props: Props) => (
  <Container {...props} presenter={Presenter} />
);

export default SenryuPage;
