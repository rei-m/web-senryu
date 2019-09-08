import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './index';

storiesOf('atoms/Button', module)
  .add('normal', () => <Button>ぼたん</Button>)
  .add('primary', () => <Button color={`primary`}>ぼたん</Button>)
  .add('secondary', () => <Button color={`secondary`}>ぼたん</Button>);
