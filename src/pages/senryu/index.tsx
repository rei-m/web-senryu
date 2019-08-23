import React from 'react';
import { RouteComponentProps } from '@reach/router';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import SenryuList from '@src/components/organisms/SenryuList';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import { useAppUser } from '@src/hooks/useAppUser';
import { useSenryuList } from '@src/hooks/useSenryuList';
import { SenryuId } from '@src/domain';
import { ROUTING } from '@src/constants/routing';

export type Props = RouteComponentProps;

const useStyles = makeStyles(theme => ({
  root: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    minHeight: 248,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const SenryuPage = ({ navigate }: Props) => {
  const user = useAppUser();
  const { senryuList, totalCount, error } = useSenryuList();
  const classes = useStyles();

  const handleClickSenryu = (senryuId: SenryuId) => {
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
      keywords={[]}
      content={
        <div className={classes.root}>
          {error ? (
            <Txt className={classes.error}>{error.message}</Txt>
          ) : senryuList ? (
            <SenryuList
              senryuList={senryuList}
              totalCount={totalCount}
              onClickSenryu={handleClickSenryu}
            />
          ) : (
            <Progress />
          )}
        </div>
      }
    />
  );
};

export default SenryuPage;
