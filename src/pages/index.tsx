import React from 'react';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import { useAppUser } from '@src/hooks/useAppUser';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';

const IndexPage = () => {
  const user = useAppUser();
  const { site } = useSiteMetaData();
  return (
    <SingleContentPageTemplate
      login={!!user}
      title={site.siteMetadata.title}
      description={site.siteMetadata.description}
      keywords={[]}
      content={<div>test</div>}
    />
  );
};

export default IndexPage;
