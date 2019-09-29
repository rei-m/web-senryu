import React from 'react';
import { storiesOf } from '@storybook/react';
import TopMenuLink from './index';
import CreateIcon from '@material-ui/icons/Create';

storiesOf('molecules/TopMenuLink', module).add('default', () => (
  <TopMenuLink
    to={`/`}
    icon={<CreateIcon />}
    label={`投稿`}
    description={`投稿できるよ`}
  />
));
