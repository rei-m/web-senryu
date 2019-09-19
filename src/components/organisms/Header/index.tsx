import React from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Note from '@material-ui/icons/Note';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Favorite from '@material-ui/icons/Favorite';
import makeStyles from '@src/styles/makeStyles';
import Heading from '@src/components/atoms/Heading';
import MenuButton from '@src/components/molecules/MenuButton';
import { User } from '@src/domain';

export type Props = {
  title: string;
  user?: User | null;
  onClickMenu: () => void;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    color: `#424242 !important`,
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  heading: {
    flexGrow: 1,
    textAlign: 'left',
  },
  button: {
    width: 45,
    height: 45,
  },
  loginLink: {
    fontSize: theme.fontSize.l,
    color: theme.palette.text.secondary,
    padding: '5px 16px',
  },
}));

const Header = ({ title, user, onClickMenu, className }: Props) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={clsx(classes.root, className)}>
      <Toolbar>
        <MenuButton onClick={onClickMenu} className={classes.menuButton} />
        <Heading level={6} visualLevel={1} className={classes.heading}>
          {title}
        </Heading>
        {user ? (
          <div>
            <IconButton aria-label="Show favorite" className={classes.button}>
              <Favorite />
            </IconButton>
            <IconButton
              aria-label="Show list of menu"
              className={classes.button}
            >
              <Note />
            </IconButton>
            <Link to={`/users/${user.id}/`}>
              <IconButton aria-label="マイページ" className={classes.button}>
                <AccountCircle />
              </IconButton>
            </Link>
          </div>
        ) : (
          <div>
            <Link to={`/auth/`} className={classes.loginLink}>
              Login
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
