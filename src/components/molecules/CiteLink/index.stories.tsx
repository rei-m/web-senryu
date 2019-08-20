import React from 'react';
import { storiesOf } from '@storybook/react';
import CiteLink, { Props } from './index';

const baseProps: Props = {
  href: 'https://example.com',
};

storiesOf('molecules/CiteLink', module).add('default', () => (
  <div style={{ margin: 16 }}>
    <CiteLink {...baseProps}>外部リンク</CiteLink>
  </div>
));
