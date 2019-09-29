import React from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
    color: `${theme.palette.text.primary} !important`,
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
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

const Header = ({ title, user, onClickMenu, className }: Props) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={clsx(classes.root, className)}>
      <Toolbar>
        <MenuButton onClick={onClickMenu} className={classes.menuButton} />
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
