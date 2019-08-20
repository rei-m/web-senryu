import React, { ReactElement } from 'react';
import Header from '@src/components/organisms/Header';
import Footer from '@src/components/organisms/Footer';
import Container from '@src/components/atoms/Container';
import SEO from '@src/components/atoms/SEO';

export interface Props {
  content: ReactElement;
  login?: boolean;
  title: string;
  description: string;
  keywords: string[];
}

const SingleContentPageTemplate = ({
  content,
  login,
  title,
  description,
  keywords,
}: Props) => (
  <>
    <SEO title={title} description={description} keywords={keywords} />
    <Header title={title} login={login} />
    <Container>{content}</Container>
    <Footer />
  </>
);

export default SingleContentPageTemplate;
