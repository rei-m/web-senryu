import React from 'react';
import Header from '@src/components/organisms/Header';
import Footer from '@src/components/organisms/Footer';
import Container from '@src/components/atoms/Container';
import SEO from '@src/components/atoms/SEO';
import { User } from '@src/domain';

export interface Props {
  content: React.ReactElement;
  user?: User | null;
  title: string;
  description: string;
}

const SingleContentPageTemplate = ({
  content,
  user,
  title,
  description,
}: Props) => (
  <>
    <SEO title={title} description={description} />
    <Header title={title} user={user} />
    <Container>{content}</Container>
    <Footer />
  </>
);

export default SingleContentPageTemplate;
