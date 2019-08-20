import { SiteMetaData } from '../src/types';
import { GatsbyPlugin } from './types';

export const siteMetadata: SiteMetaData = {
  title: `WORK IN PROGRESS`,
  description: `WORK IN PROGRESS`,
  author: `@rei-m`,
};

export const plugins: GatsbyPlugin[] = [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/../src/images`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `work in progress`,
      short_name: `wip`,
      start_url: `/`,
      background_color: `#663399`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.app/offline
  // 'gatsby-plugin-offline',
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/styles/typography.ts`,
    },
  },
  `gatsby-plugin-typescript`,
  {
    resolve: `gatsby-plugin-material-ui`,
    // If you want to use styled components, in conjunction to Material-UI, you should:
    // - Change the injection order
    // - Add the plugin
    options: {
      stylesProvider: {
        injectFirst: true,
      },
    },
  },
  {
    resolve: `gatsby-plugin-emotion`,
    options: {
      // Accepts all options defined by `babel-plugin-emotion` plugin.
    },
  },
  `gatsby-plugin-no-sourcemaps`,
];
