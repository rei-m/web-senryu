import React from 'react';
import { Link } from 'gatsby';
import SingleContentPageTemplate from '@src/components/templates/SingleContentPageTemplate';
import { useAuthUser } from '@src/hooks/useAuthUser';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';
import { ROUTING } from '@src/constants/routing';

const IndexPage = () => {
  const user = useAuthUser();
  const { site } = useSiteMetaData();
  return (
    <SingleContentPageTemplate
      user={user}
      title={site.siteMetadata.title}
      description={site.siteMetadata.description}
      content={
        <div>
          <div>川柳を投稿するサイトだよ</div>
          <Link to={ROUTING.senryuNew}>投稿する</Link>
          <Link to={ROUTING.senryu}>一覧を見る</Link>
        </div>
      }
    />
  );
};

export default IndexPage;
