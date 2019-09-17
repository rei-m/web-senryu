import React from 'react';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import UserProfile from '@src/components/organisms/UserProfile';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import SenryuList from '@src/components/organisms/SenryuList';
import AccountButton from '@src/components/molecules/AccountButton';
import MoreButton from '@src/components/molecules/MoreButton';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import { useBool } from '@src/hooks/useBool';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useUpdateProfile } from '@src/hooks/useUpdateProfile';
import { useUserSenryuList } from '@src/hooks/useUserSenryuList';
import { SenryuId, User } from '@src/domain';
import { ROUTING } from '@src/constants/routing';

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
  more: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const UsersShowPage = ({ id, navigate }: Props) => {
  const authUser = useAuthUser();
  const { updateProfile } = useUpdateProfile();

  const {
    user,
    senryuList,
    totalCount,
    hasNextPage,
    error,
    fetchNextPage,
    isMoreLoading,
  } = useUserSenryuList(id);

  const [isDialogOpen, openDialog, closeDialog] = useBool(false);

  const classes = useStyles();

  const handleClickSenryu = (senryuId: SenryuId) => {
    // 現状、遷移すると取得分が吹き飛ぶのでnavigateやめる
    if (navigate) {
      navigate(ROUTING.senryuShow.replace(`:id`, senryuId));
    }
  };

  const handleClickPostProfile = (user: User) => {
    updateProfile(user);
    closeDialog();
  };

  // TODO: メタ情報見直す
  return (
    <SingleContentPageTemplate
      user={authUser}
      title={user ? `${user.ryugou}さんの川柳` : `詠み人知らず`}
      description={``}
      content={
        <div className={classes.root}>
          {error ? (
            <Txt className={classes.error}>{error.message}</Txt>
          ) : senryuList && user ? (
            <>
              {!!authUser && authUser.id === user.id ? (
                <>
                  <UserProfile user={authUser} />
                  <div className={classes.buttonBox}>
                    <AccountButton
                      size={`small`}
                      iconSize={`1.6rem`}
                      onClick={openDialog}
                    >
                      詠み人設定
                    </AccountButton>
                  </div>
                </>
              ) : (
                <UserProfile user={user} />
              )}
              <SenryuList
                senryuList={senryuList}
                totalCount={totalCount}
                onClickSenryu={handleClickSenryu}
              />
              {hasNextPage && (
                <div className={classes.more}>
                  {isMoreLoading ? (
                    <Progress />
                  ) : (
                    <MoreButton onClick={fetchNextPage} />
                  )}
                </div>
              )}
              {!!authUser && (
                <UserSettingDialog
                  open={isDialogOpen}
                  initialUser={authUser}
                  onClickPost={handleClickPostProfile}
                  onClose={closeDialog}
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
