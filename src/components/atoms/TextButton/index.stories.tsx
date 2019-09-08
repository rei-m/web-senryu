import React from 'react';
import { storiesOf } from '@storybook/react';
import TextButton from './index';

storiesOf('atoms/TextButton', module)
  .add('normal', () => <TextButton>ぼたん</TextButton>)
  .add('primary', () => <TextButton color={`primary`}>ぼたん</TextButton>)
  .add('secondary', () => <TextButton color={`secondary`}>ぼたん</TextButton>);
