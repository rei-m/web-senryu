import React from 'react';
import makeStyles from '@src/styles/makeStyles';
import SenryuFuda from '@src/components/organisms/SenryuFuda';
import Txt from '@src/components/atoms/Txt';
import JpDate from '@src/components/atoms/JpDate';
import { Senryu, SenryuId } from '@src/domain';

export type Props = {
  senryuList: Array<Senryu>;
  totalCount: number;
  onClickSenryu?: (senryuId: SenryuId) => void;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  listContainer: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    [theme.breakpoints.up('sm')]: {
      flexDirection: `row`,
      alignItems: `flex-start`,
      flexWrap: `wrap`,
    },
  },
  senryuContainer: {
    margin: theme.spacing(1),
  },
  senryu: {
    boxShadow: theme.shadows[1],
  },
  counter: {
    textAlign: `right`,
  },
  datetime: {
    fontSize: theme.fontSize.sss,
    textAlign: 'right',
    marginBottom: theme.spacing(0.5),
  },
}));

const SenryuList = ({
  senryuList,
  totalCount,
  onClickSenryu,
  className,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <div className={classes.counter}>
        <Txt size={`s`}>{`全${totalCount}件`}</Txt>
      </div>
      <div className={classes.listContainer}>
        {senryuList.map(senryu => (
          <div key={senryu.id} className={classes.senryuContainer}>
            <div className={classes.datetime}>
              <JpDate date={senryu.createdAt} />
            </div>
            <SenryuFuda
              senryu={senryu}
              size={`l`}
              onClick={onClickSenryu}
              className={classes.senryu}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SenryuList;
