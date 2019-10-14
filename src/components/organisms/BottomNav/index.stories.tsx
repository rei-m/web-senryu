import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import BottomNav from './index';
import { USER_1 } from '@test/mock';

storiesOf('organisms/BottomNav', module)
  .add('not sign in', () => <BottomNav user={null} />)
  .add('sign in', () => <BottomNav user={USER_1} />);
