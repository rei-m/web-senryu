import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import SenryuList from '@src/components/organisms/SenryuList';
import SenryuModal from '@src/components/organisms/SenryuModal';
import MoreButton from '@src/components/molecules/MoreButton';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import { useBool } from '@src/hooks/useBool';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useSenryuList } from '@src/hooks/useSenryuList';
import { Senryu, UserId, SenryuId } from '@src/domain';
import { ROUTING } from '@src/constants/routing';

export type Props = RouteComponentProps;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 248,
  },
  more: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const SenryuPage = ({ navigate }: Props) => {
  const authUser = useAuthUser();
  const {
    senryuList,
    totalCount,
    hasNextPage,
    error,
    fetchNextPage,
    deleteSenryu,
    isMoreLoading,
  } = useSenryuList();
  const [currentSenryu, displaySenryu] = useState<null | Senryu>(null);
  const [isSenryuModalOpen, openSenryuModal, closeSenryuModal] = useBool(false);
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

  const classes = useStyles();

  // TODO: メタ情報見直す
  return (
    <SingleContentPageTemplate
      user={authUser}
      title={`川柳`}
      description={''}
      content={
        <div className={classes.root}>
          {error ? (
            <Txt className={classes.error}>{error.message}</Txt>
          ) : senryuList ? (
            <>
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
