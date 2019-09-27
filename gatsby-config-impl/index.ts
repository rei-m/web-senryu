import { SiteMetaData } from '../src/types';
import { GatsbyPlugin } from './types';
import { APP_NAME } from '@src/constants';

export const siteMetadata: SiteMetaData = {
  title: APP_NAME,
  description: `${APP_NAME}は誰でも気軽に川柳を投稿できるサイトです。暮らしの中でのふと感じたことや、思ったこと、感動したことなどを川柳で詠んでみませんか。`,
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
      name: APP_NAME,
      short_name: APP_NAME,
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
  `gatsby-plugin-no-sourcemaps`,
];
