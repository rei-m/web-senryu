import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import WarningIcon from '@material-ui/icons/Warning';
import { User } from '@src/domain';
import { ROUTING } from '@src/constants/routing';

export type Props = {
  user: User | null;
  onClickSetting: () => void;
  onClickSignIn: () => void;
  onClickSignOut: () => void;
  onClickDeleteAccount: () => void;
};

const AccountMenu = ({
  user,
  onClickSetting,
  onClickSignIn,
  onClickSignOut,
}: Props) => {
  const handleClickSignIn = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onClickSignIn();
  };

  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="このサイトについて" />
      </ListItem>
      <Divider />
      {user ? (
        <>
          <ListItem button onClick={onClickSetting}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="詠み人設定" />
          </ListItem>
          <ListItem button onClick={onClickSignOut}>
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="ログアウト" />
          </ListItem>
        </>
      ) : (
        <ListItem
          button
          component={`a`}
          href={ROUTING.auth}
          onClick={handleClickSignIn}
        >
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText primary="ログイン" />
        </ListItem>
      )}
      <Divider />
      <ListItem button>
        <ListItemText primary="利用規約" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="プライバシーポリシー" />
      </ListItem>
      {user && (
        <>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <WarningIcon />
            </ListItemIcon>
            <ListItemText primary="アカウント削除" />
          </ListItem>
        </>
      )}
    </List>
  );
};

export default AccountMenu;
