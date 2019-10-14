import React, { useState, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Divider } from '@material-ui/core';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import UserProfile from '@src/components/organisms/UserProfile';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import SenryuList from '@src/components/organisms/SenryuList';
import SenryuListEmpty from '@src/components/organisms/SenryuListEmpty';
import SenryuModal from '@src/components/organisms/SenryuModal';
import EditFab from '@src/components/molecules/EditFab';
import AccountButton from '@src/components/molecules/AccountButton';
import MoreButton from '@src/components/molecules/MoreButton';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import { useBool } from '@src/hooks/useBool';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useUpdateProfile } from '@src/hooks/useUpdateProfile';
import { useUserSenryuList } from '@src/hooks/useUserSenryuList';
import { User, Senryu, UserId, SenryuId } from '@src/domain';
import { ROUTING } from '@src/constants/routing';
import { NavMenu } from '@src/constants';

export type Props = {
  id: string;
} & RouteComponentProps;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 248,
  },
  buttonBox: {
    textAlign: 'left',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    '& button:nth-child(n+2)': {
      marginLeft: theme.spacing(2),
    },
  },
  list: {
    marginTop: theme.spacing(2),
  },
  more: {
    marginTop: theme.spacing(2),
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

const UsersShowPage = ({ id, navigate }: Props) => {
  const authUser = useAuthUser();

  const isOwnPage = useMemo(() => {
    return !!authUser && authUser.id === id;
  }, [authUser]);

  const { updateProfile } = useUpdateProfile();

  const {
    user,
    senryuList,
    totalCount,
    hasNextPage,
    isMoreLoading,
    error,
    fetchNextPage,
    deleteSenryu,
  } = useUserSenryuList(id);

  const [currentSenryu, displaySenryu] = useState<null | Senryu>(null);

  const [isSenryuModalOpen, openSenryuModal, closeSenryuModal] = useBool(false);

  const [isSettingDialogOpen, openSettingDialog, closeSettingDialog] = useBool(
    false
  );

  const classes = useStyles();

  const handleClickSenryu = (senryu: Senryu) => {
    displaySenryu(senryu);
    openSenryuModal();
  };

  const handleClickPostProfile = (user: User) => {
    updateProfile(user);
    closeSettingDialog();
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

  return (
    <SingleContentPageTemplate
      user={authUser}
      title={user ? `${user.ryugou}の川柳` : `よみ人知らず`}
      description={``}
      navMenu={isOwnPage ? NavMenu.MySenryu : NavMenu.SenryuList}
      content={
        <div className={classes.root}>
          {error ? (
            <Txt className={classes.error}>{error.message}</Txt>
          ) : senryuList && user ? (
            <>
              <UserProfile user={user} />
              {isOwnPage && (
                <div className={classes.buttonBox}>
                  <AccountButton
                    size={`small`}
                    iconSize={`1.6rem`}
                    onClick={openSettingDialog}
                  >
                    投稿者設定
                  </AccountButton>
                </div>
              )}
              <Divider />
              {0 < senryuList.length ? (
                <>
                  <SenryuList
                    senryuList={senryuList}
                    totalCount={totalCount}
                    onClickSenryu={handleClickSenryu}
                    className={classes.list}
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
              {!!authUser && (
                <UserSettingDialog
                  open={isSettingDialogOpen}
                  initialUser={authUser}
                  onClickPost={handleClickPostProfile}
                  onClose={closeSettingDialog}
                />
              )}
            </>
          ) : (
            <Progress />
          )}
        </div>
      }
    />
  );
};

export default UsersShowPage;
