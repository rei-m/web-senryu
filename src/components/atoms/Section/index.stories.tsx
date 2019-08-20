import React from 'react';
import { storiesOf } from '@storybook/react';
import Heading from '@src/components/atoms/Heading';
import Section from './index';

storiesOf('atoms/Section', module).add('default', () => (
  <Section heading={<Heading level={1}>たいとる</Heading>}>ぼでぃ</Section>
));
