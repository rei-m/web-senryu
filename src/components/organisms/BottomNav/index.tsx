import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import makeStyles from '@src/styles/makeStyles';
import { User } from '@src/domain';
import { ROUTING } from '@src/constants/routing';
import { NavMenu } from '@src/constants';

export type Props = {
  user?: User | null;
  navMenu?: NavMenu;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  action: {
    color: `${theme.palette.text.secondary} !important`, // 手抜きでごめんちょ
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  selected: {
    color: `${theme.palette.text.primary} !important`, // 手抜きでごめんちょ
  },
}));

const NavMenuToValue = {
  [NavMenu.Top]: undefined,
  [NavMenu.CreateSenryu]: 0,
  [NavMenu.MySenryu]: 1,
  [NavMenu.SenryuList]: 2,
  [NavMenu.SignIn]: 1,
  [NavMenu.About]: 3,
  [NavMenu.Settings]: 3,
};

const BottomNav = ({ user, navMenu, className }: Props) => {
  const value = useMemo(() => (navMenu ? NavMenuToValue[navMenu] : undefined), [
    navMenu,
  ]);

  const classes = useStyles();

  return (
    <BottomNavigation
      showLabels
      component="nav"
      value={value}
      className={clsx(classes.root, className)}
    >
      <BottomNavigationAction
        label="投稿"
        icon={<EditIcon />}
        component={Link}
        to={ROUTING.senryuNew}
        className={classes.action}
        classes={{ selected: classes.selected }}
      />
      {user ? (
        <BottomNavigationAction
          label="川柳"
          icon={<PersonIcon />}
          component={Link}
          to={ROUTING.usersShow.replace(`:id`, user.id)}
          className={classes.action}
          classes={{ selected: classes.selected }}
        />
      ) : (
        <BottomNavigationAction
          label="サインイン"
          icon={<AccountCircleIcon />}
          component={Link}
          to={ROUTING.auth}
          className={classes.action}
          classes={{ selected: classes.selected }}
        />
      )}
      <BottomNavigationAction
        label="川柳一覧"
        icon={<PeopleIcon />}
        component={Link}
        to={ROUTING.senryu}
        className={classes.action}
        classes={{ selected: classes.selected }}
      />
      <BottomNavigationAction
        label="管理・他"
        icon={<SettingsIcon />}
        component={Link}
        to={ROUTING.account}
        className={classes.action}
        classes={{ selected: classes.selected }}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
