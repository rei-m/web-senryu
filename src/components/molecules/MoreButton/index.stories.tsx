import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MoreButton from './index';

storiesOf('molecules/MoreButton', module).add('default', () => (
  <MoreButton onClick={action(`onClick`)} />
));
