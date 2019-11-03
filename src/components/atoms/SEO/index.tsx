import React from 'react';
import Helmet from 'react-helmet';
import { useSiteMetaData } from '@src/hooks/useSiteMetaData';

export type Props = {
  title?: string;
  description?: string;
  lang?: string;
  meta?: Array<{
    name: string;
    content: string;
  }>;
  noIndex?: boolean;
};

const SEO = ({
  title,
  description,
  lang = 'ja',
  meta = [],
  noIndex = false,
}: Props) => {
  const { site } = useSiteMetaData();

  const metaDescription = description || site.siteMetadata.description;

  const metaData = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ].concat(meta);

  if (noIndex) {
    metaData.push({ name: `robots`, content: `noindex` });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={
        title !== site.siteMetadata.title
          ? `%s / ${site.siteMetadata.title}`
          : undefined
      }
      meta={metaData}
    />
  );
};

export default SEO;
