import React from 'react';
import { storiesOf } from '@storybook/react';
import { PagenationPresenter, PresenterProps } from './index';

const baseProps: PresenterProps = {
  pageCnt: 9,
  fromPageNo: 1,
  toPageNo: 9,
  currentPageNo: 4,
  canMovePrev: true,
  canMoveNext: true,
  pageUrl: () => '',
};

storiesOf('molecules/Pagenation', module).add('default', () => (
  <div style={{ margin: 16 }}>
    <PagenationPresenter {...baseProps} />
  </div>
));
