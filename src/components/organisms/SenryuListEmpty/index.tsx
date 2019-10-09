import React from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';
import makeStyles from '@src/styles/makeStyles';
import Txt from '@src/components/atoms/Txt';
import { ROUTING } from '@src/constants/routing';

export type Props = {
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
  },
}));

const SenryuListEmpty = ({ className }: Props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      <div>
        <Txt size={`s`}>
          まだ川柳が投稿されていません。はじめての川柳を投稿してみませんか。
        </Txt>
      </div>
      <div className={classes.buttonContainer}>
        <Link to={ROUTING.senryuNew}>
          <Txt size={`m`}>投稿してみる</Txt>
        </Link>
      </div>
    </div>
  );
};

export default SenryuListEmpty;
