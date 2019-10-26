import React, { useCallback } from 'react';
import { useMediaQuery } from '@material-ui/core';
import makeStyles from '@src/styles/makeStyles';
import Header from '@src/components/organisms/Header';
import Footer from '@src/components/organisms/Footer';
import Drawer from '@src/components/organisms/Drawer';
import BottomNav from '@src/components/organisms/BottomNav';
import UserSettingDialog from '@src/components/organisms/UserSettingDialog';
import Container from '@src/components/atoms/Container';
import { User } from '@src/domain';
import { useBool } from '@src/hooks/useBool';
import { useUpdateProfile } from '@src/hooks/useUpdateProfile';
import { ThemeInterface } from '@src/styles/theme';
import { NavMenu } from '@src/constants';

export type Props = {
  user?: User | null;
  title: string;
  navMenu?: NavMenu;
};

const useStyles = makeStyles(theme => ({
  width: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.drawerWidth,
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
  container: {
    paddingTop: 88,
    paddingBottom: 88,
    minHeight: '100vh',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 96,
      paddingBottom: 32,
      minHeight: 'calc(100vh - 130px)',
    },
  },
  bottomNav: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    boxShadow: theme.shadows['4'],
    zIndex: 1,
  },
}));

const Layout: React.FC<Props> = ({ user, title, navMenu, children }) => {
  const { updateProfile } = useUpdateProfile();
  // 途中でハンバーガーメニューからBottomNavへ切り替えた変更の名残
  const [isOpenDrawer, openDrawer, closeDrawer] = useBool(false);
  const [isSettingDialogOpen, openSettingDialog, closeSettingDialog] = useBool(
    false
  );
  const isDisplayDrawer = useMediaQuery<ThemeInterface>(theme =>
    theme.breakpoints.up('sm')
  );

  const handleClickPostProfile = useCallback((user: User) => {
    updateProfile(user);
    closeSettingDialog();
  }, []);

  const classes = useStyles();

  return (
    <>
      <Header
        title={title}
        user={user}
        onClickMenu={openDrawer}
        className={classes.width}
      />
      {isDisplayDrawer && (
        <nav>
          <Drawer
            isInitialDisplay={isDisplayDrawer}
            open={isOpenDrawer}
            user={user ? user : null}
            onClickSetting={openSettingDialog}
            onClose={closeDrawer}
          />
        </nav>
      )}
      <Container className={`${classes.container} ${classes.width}`}>
        {children}
      </Container>
      {isDisplayDrawer ? (
        <Footer className={classes.width} />
      ) : (
        <BottomNav
          user={user}
          navMenu={navMenu}
          className={classes.bottomNav}
        />
      )}

      {user && (
        <UserSettingDialog
          open={isSettingDialogOpen}
          initialUser={user}
          authError={null}
          onClickPost={handleClickPostProfile}
          onClose={closeSettingDialog}
        />
      )}
    </>
  );
};

export default Layout;
