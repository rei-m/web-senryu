import React from 'react';
import { storiesOf } from '@storybook/react';
import JpDate from './index';

storiesOf('atoms/JpDate', module)
  .add('epoc seconds', () => <JpDate date={1568391310540} />)
  .add('string', () => <JpDate date={`2019-09-12`} />);
