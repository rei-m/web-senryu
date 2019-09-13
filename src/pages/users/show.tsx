import React from 'react';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import SenryuList from '@src/components/organisms/SenryuList';
import MoreButton from '@src/components/molecules/MoreButton';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import { useAppUser } from '@src/hooks/useAppUser';
import { useUserSenryuList } from '@src/hooks/useUserSenryuList';
import { SenryuId } from '@src/domain';
import { ROUTING } from '@src/constants/routing';

export type Props = {
  id: string;
} & RouteComponentProps;

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

const UsersShowPage = ({ id, navigate }: Props) => {
  const user = useAppUser();
  const {
    senryuList,
    totalCount,
    hasNextPage,
    error,
    fetchNextPage,
    isMoreLoading,
  } = useUserSenryuList(id);
  const classes = useStyles();

  const handleClickSenryu = (senryuId: SenryuId) => {
    // 現状、遷移すると取得分が吹き飛ぶのでnavigateやめるか歌の情報をGlabalで持つようにする
    if (navigate) {
      navigate(ROUTING.senryuShow.replace(`:id`, senryuId));
    }
  };

  // TODO: メタ情報見直す
  return (
    <SingleContentPageTemplate
      login={!!user}
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
