import React from 'react';
import { Link } from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Note from '@material-ui/icons/Note';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Favorite from '@material-ui/icons/Favorite';
import makeStyles from '@src/styles/makeStyles';
import Heading from '@src/components/atoms/Heading';

export type Props = {
  title: string;
  login?: boolean;
};

const useStyles = makeStyles(theme => ({
  root: {
    color: `#424242 !important`,
    backgroundColor: `${theme.palette.primary.main} !important`,
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

const Header = ({ title, login }: Props) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Heading level={6} visualLevel={1} className={classes.heading}>
            {title}
          </Heading>
          {login ? (
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
              <IconButton aria-label="Show personal" className={classes.button}>
                <AccountCircle />
              </IconButton>
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
    </>
  );
};

export default Header;
