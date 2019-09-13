import React from 'react';
import { storiesOf } from '@storybook/react';
import SenryuList from './index';
import { SENRYU_1 } from '@test/mock';
import { action } from '@storybook/addon-actions';
import { Senryu } from '@src/domain';

const data: Array<Senryu> = Array.from({ length: 20 }).map((_, i) => ({
  ...SENRYU_1,
  id: `${SENRYU_1.id} _${i}`,
}));

storiesOf('organisms/SenryuList', module)
  .add('default', () => (
    <SenryuList
      senryuList={data}
      totalCount={20}
      onClickSenryu={action('onClickSenryu')}
    />
  ))
  .add('multi page', () => (
    <SenryuList
      senryuList={data}
      totalCount={31}
      onClickSenryu={action('onClickSenryu')}
    />
  ))
  .add('empty', () => (
    <SenryuList
      senryuList={[]}
      totalCount={0}
      onClickSenryu={action('onClickSenryu')}
    />
  ));
