/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import wrapWithProvider from './wrap-with-provider';
export const wrapRootElement = wrapWithProvider;

import firebase from 'firebase/app';

// TODO: devとprodで使い分けられるようにする
export const onClientEntry = () => {
  const config = {
    apiKey: "AIzaSyBFUvQquN00DvqJr4_PwtnVgKdgx3jBPvA",
    authDomain: "senryudev.firebaseapp.com",
    databaseURL: "https://senryudev.firebaseio.com",
    projectId: "senryudev",
    storageBucket: "",
    messagingSenderId: "316157055848",
    appId: "1:316157055848:web:a46d6e248b9f3c24"
  };
  firebase.initializeApp(config);
};
