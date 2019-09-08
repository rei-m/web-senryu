import React from 'react';
import { storiesOf } from '@storybook/react';
import SenryuForm from './index';
import { action } from '@storybook/addon-actions';

storiesOf('organisms/SenryuForm', module).add('default', () => (
  <SenryuForm onSubmit={action('onSubmit')} />
));
