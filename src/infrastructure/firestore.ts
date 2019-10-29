import firebase from 'firebase/app';

export const userCollection = () => firebase.firestore().collection(`users`);

export const senryuCollection = () => firebase.firestore().collection(`senryu`);

export const aggregateCollection = () =>
  firebase.firestore().collection(`aggregate`);

export const aggregateCountUsersCollection = () =>
  firebase.firestore().collection(`aggregate/count/users`);

// https://firebase.google.com/docs/reference/js/firebase.firestore.html#firestoreerrorcode
// not-found
// unavailable
// unauthenticated
