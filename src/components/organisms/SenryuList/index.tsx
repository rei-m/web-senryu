import React from 'react';
import makeStyles from '@src/styles/makeStyles';
import SenryuFuda from '@src/components/organisms/SenryuFuda';
import Txt from '@src/components/atoms/Txt';
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
    [theme.breakpoints.up('sm')]: {
      flexDirection: `row`,
      flexWrap: `wrap`,
    },
  },
  senryu: {
    margin: theme.spacing(1),
    boxShadow: theme.shadows[1],
  },
  counter: {
    textAlign: `right`,
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
          <SenryuFuda
            key={senryu.id}
            senryu={senryu}
            size={`l`}
            onClick={onClickSenryu}
            className={classes.senryu}
          />
        ))}
      </div>
    </div>
  );
};

export default SenryuList;
