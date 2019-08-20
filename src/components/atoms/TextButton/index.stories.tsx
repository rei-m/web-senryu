import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@src/styles/styled';
import TextButton from './index';

const Enhanced = styled(TextButton)`
  font-weight: bold !important;
`;

storiesOf('atoms/TextButton', module)
  .add('normal', () => <TextButton>ぼたん</TextButton>)
  .add('primary', () => <TextButton color={`primary`}>ぼたん</TextButton>)
  .add('secondary', () => <TextButton color={`secondary`}>ぼたん</TextButton>)
  .add('custom class', () => <Enhanced>ぼたん</Enhanced>);
