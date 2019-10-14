import React, { useMemo } from 'react';
import { Link } from 'gatsby';
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
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import makeStyles from '@src/styles/makeStyles';
import Logo from '@src/components/atoms/Logo';
import UserProfile from '@src/components/organisms/UserProfile';
import { User } from '@src/domain';
import { ROUTING } from '@src/constants/routing';
import { APP_NAME } from '@src/constants';

export type Props = {
  isInitialDisplay: boolean;
  open: boolean;
  user: User | null;
  onClickSetting: () => void;
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
  logo: {
    marginRight: theme.spacing(1),
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
  active: {
    backgroundColor: theme.palette.grey['100'],
  },
}));

const Drawer = ({
  isInitialDisplay,
  open,
  user,
  onClickSetting,
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
          <Logo className={classes.logo} />
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
          component={Link}
          to={ROUTING.senryuNew}
          activeClassName={classes.active}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="投稿" />
        </ListItem>
        {user && (
          <ListItem
            button
            component={Link}
            to={ROUTING.usersShow.replace(`:id`, user.id)}
            activeClassName={classes.active}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="あなたの川柳" />
          </ListItem>
        )}
        <ListItem
          button
          component={Link}
          to={ROUTING.senryu}
          activeClassName={classes.active}
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
            component={Link}
            to={ROUTING.auth}
            activeClassName={classes.active}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="サインイン" />
          </ListItem>
        )}
        <ListItem
          button
          component={Link}
          to={ROUTING.about}
          activeClassName={classes.active}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="このサイトについて" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={ROUTING.account}
          activeClassName={classes.active}
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
