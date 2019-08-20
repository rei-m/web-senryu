import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CountableTextField from './index';

storiesOf('molecules/CountableTextField', module)
  .add('normal', () => (
    <CountableTextField
      id="test"
      label="test"
      value=""
      maxTextSize={10}
      onChange={action('onChange')}
    />
  ))
  .add('error', () => (
    <CountableTextField
      id="test"
      label="test"
      value=""
      maxTextSize={10}
      error="Error"
      onChange={action('onChange')}
    />
  ));
