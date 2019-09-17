import React from 'react';
import Header from '@src/components/organisms/Header';
import Footer from '@src/components/organisms/Footer';
import Container from '@src/components/atoms/Container';
import SEO from '@src/components/atoms/SEO';
import { User } from '@src/domain';

export type Props = {
  content: React.ReactElement;
  user?: User | null;
  title: string;
};

const NoIndexPageTemplate = ({ content, title, user }: Props) => (
  <>
    <SEO title={title} noIndex={true} />
    <Header title={title} user={user} />
    <Container>{content}</Container>
    <Footer />
  </>
);

export default NoIndexPageTemplate;
