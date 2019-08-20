import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconLabelButton from './index';

storiesOf('atoms/IconLabelButton', module)
  .add('with type normal', () => (
    <IconLabelButton Icon={ArrowBackIcon}>あいこんぼたん</IconLabelButton>
  ))
  .add('with type primary', () => (
    <IconLabelButton color={`primary`} Icon={ArrowBackIcon}>
      あいこんぼたん
    </IconLabelButton>
  ))
  .add('with type secondary', () => (
    <IconLabelButton color={`secondary`} Icon={ArrowBackIcon}>
      あいこんぼたん
    </IconLabelButton>
  ));
