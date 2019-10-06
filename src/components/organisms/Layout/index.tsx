import React, { useCallback } from 'react';
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
  container: {
    marginTop: 56,
    minHeight: 'calc(100vh - 216px)',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      minHeight: 'calc(100vh - 224px)',
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
      <nav>
        <Drawer
          isInitialDisplay={isDisplayDrawer}
          open={isOpenDrawer || isDisplayDrawer}
          user={user ? user : null}
          onClickSetting={openSettingDialog}
          onClose={closeDrawer}
        />
      </nav>
      <Container className={`${classes.container} ${classes.width}`}>
        {children}
      </Container>
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
