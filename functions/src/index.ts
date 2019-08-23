import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onSenryuCreated = functions.firestore
  .document('senryu/{senryuId}')
  .onCreate(async (_snap, _context) => {
    const FieldValue = admin.firestore.FieldValue;
    const collection = admin.firestore().collection('aggregate');
    const docRef = collection.doc('count');
    return await docRef.update({
      senryu: FieldValue.increment(1),
    });
  });

export const onSenryuDeleted = functions.firestore
  .document('senryu/{senryuId}')
  .onDelete(async (_snap, _context) => {
    const FieldValue = admin.firestore.FieldValue;
    const collection = admin.firestore().collection('aggregate');
    const docRef = collection.doc('count');
    return await docRef.update({
      senryu: FieldValue.increment(-1),
    });
  });
