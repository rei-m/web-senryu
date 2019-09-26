import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Header from './index';
import { USER_1 } from '@test/mock';

storiesOf('organisms/Header', module)
  .add('logout', () => (
    <Header title={`楽々川柳`} onClickMenu={action('onClickMenu')} />
  ))
  .add('login', () => (
    <Header
      title={`楽々川柳`}
      user={USER_1}
      onClickMenu={action('onClickMenu')}
    />
  ));
