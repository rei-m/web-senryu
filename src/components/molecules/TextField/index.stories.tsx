import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextField, { Props } from './index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const baseProps: Props = {
  id: 'TextField',
  label: 'test',
  value: '',
  fullWidth: true,
  onChange: action('onChange'),
};

storiesOf('molecules/TextField', module)
  .add('default', () => <TextField {...baseProps} />)
  .add('inputted', () => <TextField {...baseProps} value={'牛肉'} />)
  .add('with helperText', () => (
    <TextField {...baseProps} helperText={'牛肉'} />
  ))
  .add('with startAdornment', () => (
    <TextField {...baseProps} startAdornment={<ArrowBackIcon />} />
  ))
  .add('with endAdornment', () => (
    <TextField {...baseProps} endAdornment={<ArrowBackIcon />} />
  ))
  .add('with error', () => (
    <TextField {...baseProps} error={'文字数オーバーです'} />
  ));
