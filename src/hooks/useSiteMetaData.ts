import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetaData } from '@src/types';

export type QueryData = {
  site: {
    siteMetadata: SiteMetaData;
  };
};

export const useSiteMetaData = (): QueryData =>
  useStaticQuery(
    graphql`
      query SiteMetaDataQuery {
        site {
          siteMetadata {
            title
            siteUrl
            description
            author
          }
        }
      }
    `
  );
