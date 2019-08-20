import React, { FC, useMemo } from 'react';
import { CreateStyledComponentIntrinsic } from '@emotion/styled';
import styled from '@src/styles/styled';
import { ThemeInterface, FontSize } from '@src/styles/theme';

type TextElements =
  | 'em'
  | 'strong'
  | 'small'
  | 'cite'
  | 'q'
  | 'dfn'
  | 'abbr'
  | 'time'
  | 'i'
  | 'b'
  | 'mark'
  | 'ruby'
  | 'rt'
  | 'rp'
  | 'span';

export type Props = {
  tag?: TextElements;
  size?: FontSize;
  className?: string;
};

export const Txt: FC<Props> = ({
  tag = 'span',
  size = 'm',
  className,
  children,
}) => {
  const Tag = useMemo(() => {
    const creator: CreateStyledComponentIntrinsic<
      TextElements,
      {},
      ThemeInterface
    > = styled(tag);
    return creator(props => ({
      fontSize: props.theme.fontSize[size],
    }));
  }, []);
  return <Tag className={className}>{children}</Tag>;
};

export default Txt;
