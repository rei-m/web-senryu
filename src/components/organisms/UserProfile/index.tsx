import React from 'react';
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
    padding: theme.spacing(2),
  },
  label: {
    color: theme.palette.text.secondary,
  },
  description: {
    marginTop: theme.spacing(0.5),
  },
}));

const UserProfile = ({ user }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <Txt size={`sss`}>詠み人</Txt>
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
