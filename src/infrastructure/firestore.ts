import firebase from 'firebase/app';

export const userCollection = () => firebase.firestore().collection(`users`);

export const senryuCollection = () => firebase.firestore().collection(`senryu`);

export const aggregateCollection = () =>
  firebase.firestore().collection(`aggregate`);
