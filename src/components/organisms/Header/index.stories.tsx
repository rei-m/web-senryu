import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Header from './index';
import { USER_1 } from '@test/mock';

storiesOf('organisms/Header', module)
  .add('logout', () => (
    <Header title={`Recipe Catalog`} onClickMenu={action('onClickMenu')} />
  ))
  .add('login', () => (
    <Header
      title={`Recipe Catalog`}
      user={USER_1}
      onClickMenu={action('onClickMenu')}
    />
  ));
