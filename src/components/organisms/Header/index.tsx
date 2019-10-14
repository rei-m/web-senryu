import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import makeStyles from '@src/styles/makeStyles';
import Logo from '@src/components/atoms/Logo';
import Heading from '@src/components/atoms/Heading';
import { User } from '@src/domain';
import { ROUTING } from '@src/constants/routing';

export type Props = {
  title: string;
  user?: User | null;
  onClickMenu?: () => void;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    color: `${theme.palette.text.primary} !important`,
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logoLink: {
    marginRight: theme.spacing(1),
    '&:hover': {
      textDecoration: 'none',
    },
  },
  logo: {
    verticalAlign: 'middle',
    '& img': {
      width: 32,
      marginBottom: 0,
    },
  },
  heading: {
    flexGrow: 1,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

const Header = ({ title, user, className }: Props) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={clsx(classes.root, className)}>
      <Toolbar>
        <Link to={ROUTING.root} className={classes.logoLink}>
          <Logo className={classes.logo} />
        </Link>
        <Heading level={6} visualLevel={2} className={classes.heading}>
          {title}
        </Heading>
        {!user && (
          <Link to={`/auth/`}>
            <IconButton aria-label="サインイン">
              <AccountCircle />
            </IconButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
