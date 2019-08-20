import React, { FC } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { theme } from '@src/styles/theme';

const AppThemeProvider: FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </ThemeProvider>
);

export default AppThemeProvider;
