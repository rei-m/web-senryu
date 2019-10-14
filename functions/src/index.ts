import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// export const onSenryuCreated = functions.firestore
//   .document('senryu/{senryuId}')
//   .onCreate(async (snap, _context) => {
//     const FieldValue = admin.firestore.FieldValue;
//     const aggregateCollection = admin.firestore().collection('aggregate');
//     const countRef = aggregateCollection.doc('count');
//     await countRef.update({
//       senryu: FieldValue.increment(1),
//     });

//     const snapRef = snap.data();
//     if (snapRef && snapRef.user.ref) {
//       const userDoc = await snapRef.user.ref.get();
//       if (userDoc.exists) {
//         await userDoc.ref.update({
//           senryuCount: FieldValue.increment(1),
//         });
//       }
//     }

//     return;
//   });

// export const onSenryuDeleted = functions.firestore
//   .document('senryu/{senryuId}')
//   .onDelete(async (snap, _context) => {
//     const FieldValue = admin.firestore.FieldValue;
//     const aggregateCollection = admin.firestore().collection('aggregate');
//     const countRef = aggregateCollection.doc('count');
//     await countRef.update({
//       senryu: FieldValue.increment(-1),
//     });

//     const snapRef = snap.data();
//     if (snapRef && snapRef.user.ref) {
//       const userDoc = await snapRef.user.ref.get();
//       if (userDoc.exists) {
//         await userDoc.ref.update({
//           senryuCount: FieldValue.increment(-1),
//         });
//       }
//     }

//     return;
//   });

export const onUserDeleted = functions.auth
  .user()
  .onDelete(async (user, _context) => {
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
