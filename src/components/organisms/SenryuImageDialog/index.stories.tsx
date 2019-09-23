import React from 'react';
import { storiesOf } from '@storybook/react';
import SenryuConfirmDialog from './index';
import { action } from '@storybook/addon-actions';

storiesOf('organisms/SenryuConfirmDialog', module).add('default', () => (
  <SenryuConfirmDialog
    open={true}
    onClickSet={action('onClickSet')}
    onClose={action('onClose')}
  />
));
