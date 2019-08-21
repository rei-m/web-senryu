import React from 'react';
import { storiesOf } from '@storybook/react';
import EditButton from './index';

storiesOf('molecules/EditButton', module).add('default', () => (
  <EditButton>編集する</EditButton>
));
