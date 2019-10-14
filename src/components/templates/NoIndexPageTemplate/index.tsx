import React from 'react';
import Layout from '@src/components/organisms/Layout';
import SEO from '@src/components/atoms/SEO';
import { User } from '@src/domain';
import { NavMenu } from '@src/constants';

export type Props = {
  content: React.ReactElement;
  user?: User | null;
  navMenu?: NavMenu;
  title: string;
};

const NoIndexPageTemplate = ({ content, title, user, navMenu }: Props) => (
  <>
    <SEO title={title} noIndex={true} />
    <Layout title={title} user={user} navMenu={navMenu}>
      {content}
    </Layout>
  </>
);

export default NoIndexPageTemplate;
