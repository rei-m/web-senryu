import React from 'react';
import { navigate } from 'gatsby';
import { useMediaQuery } from '@material-ui/core';
import makeStyles from '@src/styles/makeStyles';
import Header from '@src/components/organisms/Header';
import Footer from '@src/components/organisms/Footer';
import Drawer from '@src/components/organisms/Drawer';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import Container from '@src/components/atoms/Container';
import { User } from '@src/domain';
import { useBool } from '@src/hooks/useBool';
import { useUpdateProfile } from '@src/hooks/useUpdateProfile';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  user?: User | null;
  title: string;
};

const useStyles = makeStyles(theme => ({
  width: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.drawerWidth,
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
}));

const Layout: React.FC<Props> = ({ user, title, children }) => {
  const { updateProfile } = useUpdateProfile();
  const [isOpenDrawer, openDrawer, closeDrawer] = useBool(false);
  const [isSettingDialogOpen, openSettingDialog, closeSettingDialog] = useBool(
    false
  );
  const isDisplayDrawer = useMediaQuery<ThemeInterface>(theme =>
    theme.breakpoints.up('sm')
  );
  const classes = useStyles();

  const handleClickPostProfile = (user: User) => {
    updateProfile(user);
    closeSettingDialog();
  };

  const handleClickLink = (to: string) => {
    navigate(to);
  };

  return (
    <>
      <Header
        title={title}
        user={user}
        onClickMenu={openDrawer}
        className={classes.width}
      />
      <nav>
        <Drawer
          isInitialDisplay={isDisplayDrawer}
          open={isOpenDrawer || isDisplayDrawer}
          user={user ? user : null}
          onClickSetting={openSettingDialog}
          onClickLink={handleClickLink}
          onClose={closeDrawer}
        />
      </nav>
      <Container className={classes.width}>{children}</Container>
      <Footer className={classes.width} />
      {user && (
        <UserSettingDialog
          open={isSettingDialogOpen}
          initialUser={user}
          onClickPost={handleClickPostProfile}
          onClose={closeSettingDialog}
        />
      )}
    </>
  );
};

export default Layout;
