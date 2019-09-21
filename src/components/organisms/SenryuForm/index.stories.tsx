import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SenryuForm from './index';

storiesOf('organisms/SenryuForm', module).add('default', () => (
  <SenryuForm user={null} onSubmit={action('onSubmit')} />
));
