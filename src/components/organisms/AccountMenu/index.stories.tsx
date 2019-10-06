import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AccountMenu from './index';
import { USER_1 } from '@test/mock';

storiesOf('organisms/AccountMenu', module)
  .add('sign in', () => (
    <AccountMenu
      user={USER_1}
      onClickSetting={action('onClickSetting')}
      onClickSignOut={action('onClickSignOut')}
      onClickDeleteAccount={action('onClickDeleteAccount')}
    />
  ))
  .add('sign out', () => (
    <AccountMenu
      user={null}
      onClickSetting={action('onClickSetting')}
      onClickSignOut={action('onClickSignOut')}
      onClickDeleteAccount={action('onClickDeleteAccount')}
    />
  ));
