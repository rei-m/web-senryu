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
import { Senryu, UserId, SenryuId } from '@src/domain';
import { ROUTING } from '@src/constants/routing';
import { NavMenu } from '@src/constants';

export type Props = RouteComponentProps;

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

const SenryuPage = ({ navigate, location }: Props) => {
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

  const classes = useStyles();

  // TODO: メタ情報見直す
  return (
    <SingleContentPageTemplate
      user={authUser}
      title={`みんなの川柳`}
      description={''}
      navMenu={NavMenu.SenryuList}
      content={
        <div className={classes.root}>
          {error ? (
            <Txt className={classes.error}>{error.message}</Txt>
          ) : senryuList ? (
            <>
              {location && location.state.message && (
                <div className={classes.flashMessage}>
                  <Txt>{location.state.message}</Txt>
                </div>
              )}
              {0 < senryuList.length ? (
                <>
                  <SenryuList
                    senryuList={senryuList}
                    totalCount={totalCount}
                    onClickSenryu={handleClickSenryu}
                  />
                  <EditFab
                    href={ROUTING.senryuNew}
                    onClick={handleClickFab}
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
                    <MoreButton onClick={fetchNextPage} />
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
                onClickUserName={handleClickUserName}
                onClickDelete={handleClickDeleteSenryu}
                onClose={closeSenryuModal}
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

export default SenryuPage;
