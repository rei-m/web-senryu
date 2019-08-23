import React from 'react';
import { storiesOf } from '@storybook/react';
import SenryuFuda from './index';
import { SENRYU_1 } from '@test/mock';

storiesOf('organisms/SenryuFuda', module)
  .add('size = s', () => <SenryuFuda senryu={SENRYU_1} size={`s`} />)
  .add('size = m', () => <SenryuFuda senryu={SENRYU_1} size={`m`} />)
  .add('size = l', () => <SenryuFuda senryu={SENRYU_1} size={`l`} />);
