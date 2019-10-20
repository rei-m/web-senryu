import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseButton from './index';

storiesOf('molecules/CloseButton', module).add('default', () => (
  <CloseButton>削除する</CloseButton>
));
