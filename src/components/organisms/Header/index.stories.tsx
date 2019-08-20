import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './index';

storiesOf('organisms/Header', module)
  .add('logout', () => <Header title={`Recipe Catalog`} />)
  .add('login', () => <Header title={`Recipe Catalog`} login={true} />);
