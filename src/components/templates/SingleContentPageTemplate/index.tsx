import React from 'react';
import Layout from '@src/components/organisms/Layout';
import SEO from '@src/components/atoms/SEO';
import { User } from '@src/domain';
import { NavMenu } from '@src/constants';

export type Props = {
  content: React.ReactElement;
  user?: User | null;
  title: string;
  description: string;
  navMenu?: NavMenu;
};

const SingleContentPageTemplate = ({
  content,
  user,
  title,
  description,
  navMenu,
}: Props) => (
  <>
    <SEO title={title} description={description} />
    <Layout title={title} user={user} navMenu={navMenu}>
      {content}
    </Layout>
  </>
);

export default SingleContentPageTemplate;
