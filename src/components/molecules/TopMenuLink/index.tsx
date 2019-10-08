import React from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import makeStyles from '@src/styles/makeStyles';
import Txt from '@src/components/atoms/Txt';

export type Props = {
  to: string;
  icon: React.ReactElement<SvgIconProps>;
  label: string;
  description: string;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    minWidth: 208,
    [theme.breakpoints.up('md')]: {
      maxWidth: 208,
    },
    '&:hover': {
      cursor: 'pointer',
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.action.hover,
    },
    '& :hover': {
      textDecoration: 'none',
    },
  },
  iconWrapper: {
    width: 32,
    height: 32,
    border: '2px solid #f1b400',
    borderRadius: '50%',
    color: '#f1b400',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    '& svg': {
      fontSize: 'inherit',
    },
    [theme.breakpoints.up('md')]: {
      width: 108,
      height: 108,
      borderWidth: 4,
      position: 'initial',
      fontSize: '4rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(1),
    },
  },
  label: {
    margin: theme.spacing(1),
    color: theme.palette.action.active,
    position: 'relative',
    '&:after': {
      content: '""',
      width: '100%',
      borderBottom: `4px double ${theme.palette.grey[900]}`,
      position: 'absolute',
      bottom: theme.spacing(-1),
      left: 0,
    },
  },
  description: {
    marginTop: theme.spacing(2),
    color: theme.palette.action.active,
  },
}));

// 名前が思いつかなかったので手抜き
const TopMenuLink = ({
  to,
  icon,
  label,
  description,
  className = '',
}: Props) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Link to={to}>
        <span className={classes.iconWrapper}>{icon}</span>
        <Txt size={`ll`} className={classes.label}>
          {label}
        </Txt>
        <Txt tag={`p`} size={`s`} className={classes.description}>
          {description}
        </Txt>
      </Link>
    </div>
  );
};

export default TopMenuLink;
