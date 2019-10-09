import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EditableSenryuImage from './index';
import appIcon from '@src/images/app-icon.png';

storiesOf('molecules/EditableSenryuImage', module)
  .add('no image', () => (
    <EditableSenryuImage
      src={null}
      alt="test"
      size={150}
      onClickNoImage={action('onClickNoImage')}
      onClickRemoveImage={action('onClickRemoveImage')}
    />
  ))
  .add('exist image', () => (
    <EditableSenryuImage
      src={appIcon}
      alt="test"
      size={150}
      onClickNoImage={action('onClickNoImage')}
      onClickRemoveImage={action('onClickRemoveImage')}
    />
  ));
