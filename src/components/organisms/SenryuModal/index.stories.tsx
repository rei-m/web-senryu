import React from 'react';
import { storiesOf } from '@storybook/react';
import SenryuModal from './index';
import { action } from '@storybook/addon-actions';
import { SENRYU_1 } from '@test/mock';

storiesOf('organisms/SenryuModal', module).add('default', () => (
  <SenryuModal
    open={true}
    senryu={SENRYU_1}
    canDelete={true}
    onClickUserName={action('onClickUserName')}
    onClickDelete={action('onClickDelete')}
    onClose={action('onClose')}
  />
));
