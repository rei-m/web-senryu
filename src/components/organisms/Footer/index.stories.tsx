import React from 'react';
import { storiesOf } from '@storybook/react';
import { FooterPresenter } from './index';

storiesOf('organisms/Footer', module).add('default', () => (
  <FooterPresenter siteName={`Recipe Catalog`} />
));
