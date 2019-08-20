import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetaData } from '@src/types';

export interface QueryData {
  site: {
    siteMetadata: SiteMetaData;
  };
}

export const useSiteMetaData = (): QueryData =>
  useStaticQuery(
    graphql`
      query SiteMetaDataQuery {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );
