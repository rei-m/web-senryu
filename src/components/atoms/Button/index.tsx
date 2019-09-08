import React from 'react';
import clsx from 'clsx';
import MuiButton from '@material-ui/core/Button';
import makeStyles from '@src/styles/makeStyles';

export type Props = {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  elevation?: number;
  disabled?: boolean;
  className?: string;
  classes?: { root?: string; label?: string };
  onClick?: () => void;
};

const useStyles = makeStyles<{ elevation: number }>(theme => ({
  root: {
    boxShadow: props => theme.shadows[props.elevation],
  },
}));

const Button: React.FC<Props> = ({
  children,
  color,
  size = `medium`,
  elevation = 1,
  disabled,
  className,
  classes,
  onClick,
}) => (
  <MuiButton
    type={onClick ? `button` : `submit`}
    color={color}
    size={size}
    disabled={disabled}
    onClick={onClick}
    className={clsx([useStyles({ elevation }).root, className])}
    classes={classes}
  >
    {children}
  </MuiButton>
);

export default Button;
