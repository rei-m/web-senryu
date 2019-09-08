import React from 'react';
import Header from '@src/components/organisms/Header';
import Footer from '@src/components/organisms/Footer';
import Container from '@src/components/atoms/Container';
import SEO from '@src/components/atoms/SEO';

export type Props = {
  content: React.ReactElement;
  login?: boolean;
  title: string;
};

const NoIndexPageTemplate = ({ content, title, login }: Props) => (
  <>
    <SEO title={title} noIndex={true} />
    <Header title={title} login={login} />
    <Container>{content}</Container>
    <Footer />
  </>
);

export default NoIndexPageTemplate;
