import React from 'react';
import AppAuthProvider from '@src/contexts/AppAuthProvider';
import AppThemeProvider from '@src/contexts/AppThemeProvider';

const App = ({ element }) => (
  <AppAuthProvider>
    <AppThemeProvider>
      {element}
    </AppThemeProvider>
  </AppAuthProvider>
);

export default App;
