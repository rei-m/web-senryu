import React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import makeStyles from '@src/styles/makeStyles';
import Button, { Props as ButtonProps } from '@src/components/atoms/Button';

export type Props = {
  Icon: React.ComponentType<SvgIconProps>;
  iconSize?: string;
} & ButtonProps;

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chidren: {
    flexGrow: 1,
  },
}));

const IconLabelButton: React.FC<Props> = ({
  children,
  color,
  iconSize = '2rem',
  Icon,
  elevation,
  className,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Button
      color={color}
      className={className}
      elevation={elevation}
      classes={{ label: classes.label }}
      onClick={onClick}
    >
      <Icon
        className={classes.icon}
        style={{
          fontSize: iconSize,
        }}
      />
      <span className={classes.chidren}>{children}</span>
    </Button>
  );
};

export default IconLabelButton;
