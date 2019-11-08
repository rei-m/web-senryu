/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import wrapWithProvider from './wrap-with-provider';
export const wrapRootElement = wrapWithProvider;

import firebase from 'firebase/app';
import 'firebase/analytics';

export const onClientEntry = () => {
  const config = {
    apiKey: process.env.GATSBY_FB_API_KEY,
    authDomain: process.env.GATSBY_FB_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_FB_DB_URL,
    projectId: process.env.GATSBY_FB_PROJECT_ID,
    storageBucket: process.env.GATSBY_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FB_MESSAGING_SENDER_ID,
    appId: process.env.GATSBY_FB_APP_ID,
    measurementId: process.env.GATSBY_FB_MEASUREMENT_ID,
  };
  firebase.initializeApp(config);
  firebase.analytics();
};
