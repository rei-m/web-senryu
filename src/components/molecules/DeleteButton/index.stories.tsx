import React from 'react';
import { storiesOf } from '@storybook/react';
import DeleteButton from './index';

storiesOf('molecules/DeleteButton', module).add('default', () => (
  <DeleteButton>削除する</DeleteButton>
));
