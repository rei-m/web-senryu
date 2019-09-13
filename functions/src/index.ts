import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onSenryuCreated = functions.firestore
  .document('senryu/{senryuId}')
  .onCreate(async (snap, _context) => {
    const FieldValue = admin.firestore.FieldValue;
    const aggregateCollection = admin.firestore().collection('aggregate');
    const countRef = aggregateCollection.doc('count');
    await countRef.update({
      senryu: FieldValue.increment(1),
    });

    const snapRef = snap.data();
    if (snapRef && snapRef.userId) {
      const userRef = admin
        .firestore()
        .collection('users')
        .doc(snapRef.userId);
      await userRef.update({
        senryuCount: FieldValue.increment(1),
      });
    }

    return;
  });

export const onSenryuDeleted = functions.firestore
  .document('senryu/{senryuId}')
  .onDelete(async (snap, _context) => {
    const FieldValue = admin.firestore.FieldValue;
    const aggregateCollection = admin.firestore().collection('aggregate');
    const countRef = aggregateCollection.doc('count');
    await countRef.update({
      senryu: FieldValue.increment(-1),
    });

    const snapRef = snap.data();
    if (snapRef && snapRef.userId) {
      const userRef = admin
        .firestore()
        .collection('users')
        .doc(snapRef.userId);
      await userRef.update({
        senryuCount: FieldValue.increment(-1),
      });
    }

    return;
  });
