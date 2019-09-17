import firebase from 'firebase/app';

export const userStorageRef = (fileName: string) =>
  firebase.storage().ref(`users/${fileName}`);

export const senryuStorageRef = (fileName: string) =>
  firebase.storage().ref(`senryu/${fileName}`);
