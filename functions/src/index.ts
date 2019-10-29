import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onSenryuDeleted = functions.firestore
  .document('senryu/{senryuId}')
  .onDelete(async (snap, _context) => {
    const snapData = snap.data();
    if (snapData && snapData.storageUri) {
      await admin
        .storage()
        .bucket()
        .file(snapData.storageUri)
        .delete();
    }

    return;
  });

export const onUserCreated = functions.auth
  .user()
  .onCreate(async (user, _context) => {
    await admin
      .firestore()
      .collection('aggregate/count/users')
      .doc(user.uid)
      .set({
        senryu: 0,
      });
    return;
  });

export const onUserDeleted = functions.auth
  .user()
  .onDelete(async (user, _context) => {
    const aggregateDoc = await admin
      .firestore()
      .collection('aggregate/count/users')
      .doc(user.uid)
      .get();
    if (aggregateDoc.exists) {
      await aggregateDoc.ref.delete();
    }

    const userDoc = await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get();
    if (userDoc.exists) {
      await userDoc.ref.delete();
    }

    return;
  });
