import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SearchField, { Props } from './index';

const baseProps: Props = {
  id: 'TextField',
  label: '検索',
  value: '',
  fullWidth: true,
  onChange: action('onChange'),
};

storiesOf('molecules/SearchField', module).add('default', () => (
  <div style={{ margin: 16 }}>
    <SearchField {...baseProps} />
  </div>
));
