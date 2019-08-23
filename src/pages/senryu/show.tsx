import React from 'react';
import makeStyles from '@src/styles/makeStyles';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import SenryuFuda from '@src/components/organisms/SenryuFuda';
import Progress from '@src/components/atoms/Progress';
import Txt from '@src/components/atoms/Txt';
import { useAppUser } from '@src/hooks/useAppUser';
import { useSenryu } from '@src/hooks/useSenryu';

export type Props = {
  id: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    minHeight: 248,
  },
  senryu: {
    boxShadow: theme.shadows[1],
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const SenryuShowPage = ({ id }: Props) => {
  const user = useAppUser();
  const { senryu, error } = useSenryu(id);
  const classes = useStyles();

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
          ) : senryu ? (
            <SenryuFuda
              senryu={senryu}
              size={`ll`}
              className={classes.senryu}
            />
          ) : (
            <Progress />
          )}
        </div>
      }
    />
  );
};

export default SenryuShowPage;
