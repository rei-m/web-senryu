import React from 'react';
import Layout from '@src/components/organisms/Layout';
import SEO from '@src/components/atoms/SEO';
import { User } from '@src/domain';

export type Props = {
  content: React.ReactElement;
  user?: User | null;
  title: string;
  description: string;
};

const SingleContentPageTemplate = ({
  content,
  user,
  title,
  description,
}: Props) => (
  <>
    <SEO title={title} description={description} />
    <Layout title={title} user={user}>
      {content}
    </Layout>
  </>
);

export default SingleContentPageTemplate;
