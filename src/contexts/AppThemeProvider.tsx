import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@src/styles/theme';

const AppThemeProvider: React.FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default AppThemeProvider;
