import React, { ComponentType, FC } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Button, { Props as ButtonProps } from '@src/components/atoms/Button';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  Icon: ComponentType<SvgIconProps>;
  iconSize?: string;
} & ButtonProps;

const useStyles = makeStyles<ThemeInterface>(theme => ({
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

const IconLabelButton: FC<Props> = ({
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
