import React from 'react';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';
import Txt from '@src/components/atoms/Txt';
import { User } from '@src/domain';

export type Props = {
  user: User;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
  },
  label: {
    color: theme.palette.text.secondary,
  },
  description: {
    marginTop: theme.spacing(0.5),
  },
}));

const UserProfile = ({ user, className }: Props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.label}>
        <Txt size={`sss`}>投稿者</Txt>
      </div>
      <div>
        <Txt size={`l`}>{user.ryugou}</Txt>
      </div>
      <div className={classes.description}>
        <Txt size={`s`}>{user.description}</Txt>
      </div>
    </div>
  );
};

export default UserProfile;
