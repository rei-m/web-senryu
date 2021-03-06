import React from 'react';
import AppAuthProvider from '@src/contexts/AppAuthProvider';
import AppThemeProvider from '@src/contexts/AppThemeProvider';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const App = ({ element }) => (
  <AppThemeProvider>
    <AppAuthProvider>
      {element}
    </AppAuthProvider>
  </AppThemeProvider>
);

export default App;
