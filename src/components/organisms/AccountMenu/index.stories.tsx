import React from 'react';
import { storiesOf } from '@storybook/react';
import AccountMenu from './index';
import { USER_1 } from '@test/mock';

storiesOf('organisms/AccountMenu', module)
  .add('sign in', () => <AccountMenu user={USER_1} />)
  .add('sign out', () => <AccountMenu user={null} />);
