import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EditableSenryuImage from './index';
import gatsbyIcon from '@src/images/gatsby-icon.png';

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
      src={gatsbyIcon}
      alt="test"
      size={150}
      onClickNoImage={action('onClickNoImage')}
      onClickRemoveImage={action('onClickRemoveImage')}
    />
  ));
