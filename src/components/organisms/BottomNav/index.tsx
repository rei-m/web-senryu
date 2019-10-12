import React from 'react';
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

export type Props = {
  user?: User | null;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  action: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  selected: {
    color: `${theme.palette.getContrastText(
      theme.palette.primary.main
    )} !important`, // 手抜きでごめんちょ
  },
}));

const BottomNav = ({ user, className }: Props) => {
  const classes = useStyles();

  return (
    <BottomNavigation
      showLabels
      component="nav"
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
        />
      ) : (
        <BottomNavigationAction
          label="サインイン"
          icon={<AccountCircleIcon />}
          component={Link}
          to={ROUTING.auth}
          className={classes.action}
        />
      )}
      <BottomNavigationAction
        label="川柳一覧"
        icon={<PeopleIcon />}
        component={Link}
        to={ROUTING.senryu}
        className={classes.action}
      />
      <BottomNavigationAction
        label="管理・他"
        icon={<SettingsIcon />}
        component={Link}
        to={ROUTING.account}
        className={classes.action}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
