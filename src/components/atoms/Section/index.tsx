import React from 'react';
import { Props as HeadingProps } from '@src/components/atoms/Heading';

export type Props = {
  heading: React.ReactElement<HeadingProps>;
  className?: string;
};

const Section: React.FC<Props> = ({ children, heading, className }) => (
  <section className={className}>
    {heading}
    {children}
  </section>
);

export default Section;
