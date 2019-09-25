import React from 'react';
import Txt, { Props as TxtProps } from '@src/components/atoms/Txt';

export type Props = TxtProps & {
  current?: number;
  maximum: number;
};

const Counter = ({
  current = 0,
  maximum,
  tag = 'span',
  size,
  className,
}: Props) => (
  <Txt
    tag={tag}
    size={size}
    className={className}
  >{`${current} / ${maximum}`}</Txt>
);

export default Counter;
