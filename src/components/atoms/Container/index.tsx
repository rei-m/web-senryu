import React from 'react';
import clsx from 'clsx';
import MuiContainer from '@material-ui/core/Container';
import makeStyles from '@src/styles/makeStyles';

export type Props = {
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Container: React.FC<Props> = ({ className, children }) => {
  const classes = useStyles();
  return (
    <MuiContainer component={`main`} className={clsx(classes.root, className)}>
      {children}
    </MuiContainer>
  );
};

export default Container;
