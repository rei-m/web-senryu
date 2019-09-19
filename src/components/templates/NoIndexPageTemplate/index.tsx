import React from 'react';
import Layout from '@src/components/organisms/Layout';
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
    <Layout title={title} user={user}>
      {content}
    </Layout>
  </>
);

export default NoIndexPageTemplate;
