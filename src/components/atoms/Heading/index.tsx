import React, { FC, useMemo } from 'react';
import { CreateStyledComponentIntrinsic } from '@emotion/styled';
import styled from '@src/styles/styled';
import { ThemeInterface, FontSize } from '@src/styles/theme';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HEADINGS: Array<HeadingElements> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const FONT_SIZE: Array<FontSize> = ['ll', 'l', 'm', 's', 'ss', 'sss'];

export type Props = {
  level?: Level;
  visualLevel?: Level;
  className?: string;
};

export const Heading: FC<Props> = ({
  children,
  level = 2,
  visualLevel,
  className,
}) => {
  const Tag = useMemo(() => {
    const levelIndex = level - 1;
    const size = FONT_SIZE[visualLevel ? visualLevel - 1 : levelIndex];
    const creator: CreateStyledComponentIntrinsic<
      HeadingElements,
      {},
      ThemeInterface
    > = styled[HEADINGS[levelIndex]];
    return creator(props => ({
      fontWeight: 500,
      margin: 0,
      fontSize: props.theme.fontSize[size],
    }));
  }, []);
  return <Tag className={className}>{children}</Tag>;
};

export default Heading;
