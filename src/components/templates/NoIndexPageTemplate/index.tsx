import React, { ReactElement } from 'react';
import Header from '@src/components/organisms/Header';
import Footer from '@src/components/organisms/Footer';
import Container from '@src/components/atoms/Container';

export type Props = {
  content: ReactElement;
  login?: boolean;
  title: string;
};

const NoIndexPageTemplate = ({ content, title, login }: Props) => (
  <>
    <Header title={title} login={login} />
    <Container>{content}</Container>
    <Footer />
  </>
);

export default NoIndexPageTemplate;
