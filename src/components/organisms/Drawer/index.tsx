import React, { useMemo } from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import makeStyles from '@src/styles/makeStyles';
import UserProfile from '@src/components/organisms/UserProfile';
import { User } from '@src/domain';
import { ROUTING } from '@src/constants/routing';
import { APP_NAME } from '@src/constants';

import { Link } from 'gatsby';

export type Props = {
  isInitialDisplay: boolean;
  open: boolean;
  user: User | null;
  onClickSetting: () => void;
  onClickLink: (to: string) => void;
  onClose: () => void;
};

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4],
    display: 'flex',
    alignItems: 'center',
  },
  rootLink: {
    display: 'flex',
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'none',
    },
    '& img': {
      width: 32,
      marginRight: theme.spacing(1),
      marginBottom: 0,
    },
  },
  drawerPaper: {
    width: theme.drawerWidth,
  },
}));

const Drawer = ({
  isInitialDisplay,
  open,
  user,
  onClickSetting,
  onClickLink,
  onClose,
}: Props) => {
  const drawerProps = useMemo(() => {
    if (isInitialDisplay) {
      return {
        variant: 'permanent',
      } as const;
    } else {
      return {
        variant: 'temporary',
        anchor: 'left',
        onClose: onClose,
        ModalProps: {
          keepMounted: true,
        },
      } as const;
    }
  }, [isInitialDisplay]);

  const classes = useStyles();

  const handleClickLink = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onClickLink(e.currentTarget.pathname);
  };

  return (
    <MuiDrawer
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      {...drawerProps}
    >
      <List disablePadding>
        <div className={classes.toolbar}>
          <Link to={ROUTING.root} className={classes.rootLink}>
            {APP_NAME}
          </Link>
        </div>
        <Divider />
        {user && (
          <>
            <ListItem>
              <UserProfile user={user} />
            </ListItem>
            <Divider />
          </>
        )}
        <ListItem
          button
          component={`a`}
          href={ROUTING.senryuNew}
          onClick={handleClickLink}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="投稿" />
        </ListItem>
        {user && (
          <ListItem
            button
            component={`a`}
            href={ROUTING.usersShow.replace(`:id`, user.id)}
            onClick={handleClickLink}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="あなたの川柳" />
          </ListItem>
        )}
        <ListItem
          button
          component={`a`}
          href={ROUTING.senryu}
          onClick={handleClickLink}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="みんなの川柳" />
        </ListItem>
        <Divider />
        {user ? (
          <ListItem button onClick={onClickSetting}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="投稿者設定" />
          </ListItem>
        ) : (
          <ListItem
            button
            component={`a`}
            href={ROUTING.auth}
            onClick={handleClickLink}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="サインイン" />
          </ListItem>
        )}
        <ListItem
          button
          component={`a`}
          href={ROUTING.account}
          onClick={handleClickLink}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="管理・他" />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
