import firebase from 'firebase/app';
import { AuthenticationService } from '@src/domain/services';
import { User, UninitializedUser } from '@src/domain';
import { userCollection } from '../firestore';

export class AuthenticationServiceData implements AuthenticationService {
  onAuthStateChanged(
    callback: (user: User | UninitializedUser | null) => void
  ) {
    const unsubscribe = firebase.auth().onAuthStateChanged(fbUser => {
      if (fbUser) {
        const userDocRef = userCollection().doc(fbUser.uid);
        userDocRef.get().then(userDoc => {
          const user = userDoc.data();
          callback({
            id: fbUser.uid,
            ryugou: user ? user.ryugou : null,
          });
        });
      } else {
        callback(null);
      }
    });

    return unsubscribe;
  }

  async initialize(user: User) {
    const userDocRef = userCollection().doc(user.id);
    return await userDocRef.set({ ryugou: user.ryugou });
  }
}
