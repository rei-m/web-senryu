import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@src/styles/styled';
import Button from './index';

const Enhanced = styled(Button)`
  font-weight: bold !important;
`;

storiesOf('atoms/Button', module)
  .add('normal', () => <Button>ぼたん</Button>)
  .add('primary', () => <Button color={`primary`}>ぼたん</Button>)
  .add('secondary', () => <Button color={`secondary`}>ぼたん</Button>)
  .add('custom class', () => <Enhanced>ぼたん</Enhanced>);
