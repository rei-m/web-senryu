import React, { ReactElement, FC } from 'react';
import styled from '@src/styles/styled';
import { Props as HeadingProps } from '@src/components/atoms/Heading';

export type Props = {
  heading: ReactElement<HeadingProps>;
  className?: string;
};

const Container = styled.section``;

const Section: FC<Props> = ({ children, heading, className }) => (
  <Container className={className}>
    {heading}
    {children}
  </Container>
);

export default Section;
