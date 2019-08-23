import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import makeStyles from '@src/styles/makeStyles';
import { useReactPortal } from '@src/hooks/useReactPortal';

export type Props = {
  onClick?: () => void;
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));

const Overlay: React.FC<Props> = ({ children, onClick }) => {
  const classes = useStyles();
  const el = useReactPortal();

  const handleOnClick = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (onClick) {
        onClick();
      }
    },
    []
  );

  return ReactDOM.createPortal(
    <div onClick={handleOnClick} className={classes.root}>
      {children}
    </div>,
    el
  );
};

export default Overlay;
