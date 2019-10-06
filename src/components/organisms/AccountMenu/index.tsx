import React from 'react';
import { Link } from 'gatsby';
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
  onClickSignOut: () => void;
  onClickDeleteAccount: () => void;
};

const AccountMenu = ({
  user,
  onClickSetting,
  onClickSignOut,
  onClickDeleteAccount,
}: Props) => {
  return (
    <List>
      <ListItem button component={Link} to={ROUTING.about}>
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
            <ListItemText primary="投稿者設定" />
          </ListItem>
          <ListItem button onClick={onClickSignOut}>
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="サインアウト" />
          </ListItem>
        </>
      ) : (
        <ListItem button component={Link} to={ROUTING.auth}>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText primary="サインイン" />
        </ListItem>
      )}
      <Divider />
      <ListItem button component={Link} to={ROUTING.termsOfService}>
        <ListItemText primary="利用規約" />
      </ListItem>
      <ListItem button component={Link} to={ROUTING.privacyPolicy}>
        <ListItemText primary="プライバシーポリシー" />
      </ListItem>
      {user && (
        <>
          <Divider />
          <ListItem button onClick={onClickDeleteAccount}>
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
