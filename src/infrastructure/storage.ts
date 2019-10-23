import firebase from 'firebase/app';
import { UserId } from '@src/domain';

export const userStorageRef = (userId: UserId, fileName: string) =>
  firebase.storage().ref(`users/${userId}/${fileName}`);

export const senryuStorageRef = (userId: UserId, fileName: string) =>
  firebase.storage().ref(`senryu/${userId}/${fileName}`);
