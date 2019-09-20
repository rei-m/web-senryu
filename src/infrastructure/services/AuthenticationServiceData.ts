import firebase from 'firebase/app';
import axios from 'axios';
import { AuthenticationService } from '@src/domain/services';
import { User, UninitializedUser, UserId } from '@src/domain';
import { userCollection } from '../firestore';
import { userStorageRef } from '../storage';

export class AuthenticationServiceData implements AuthenticationService {
  onAuthStateChanged(
    callback: (user: User | UninitializedUser | null) => void
  ) {
    const unsubscribe = firebase.auth().onAuthStateChanged(fbUser => {
      if (fbUser) {
        // プロフィールは公開情報なのでauthじゃなくてfirestoreに保存
        const userDocRef = userCollection().doc(fbUser.uid);
        userDocRef.get().then(userDoc => {
          const user = userDoc.data();
          callback({
            id: fbUser.uid,
            ryugou: user ? user.ryugou : null,
            description: user ? user.description : null,
            profileImageUrl: user ? user.profileImageUrl : null,
          });
        });
      } else {
        callback(null);
      }
    });

    return unsubscribe;
  }

  onProfileChanged(callback: (user: User) => void) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      // ちょっとだるい実装
      const userDocRef = userCollection().doc(currentUser.uid);
      const unsubscribe = userDocRef.onSnapshot(snapShot => {
        const data = snapShot.data();
        if (data) {
          const user = {
            id: currentUser.uid,
            ryugou: data.ryugou,
            description: data.description,
            profileImageUrl: data.profileImageUrl,
          };
          callback(user);
        }
      });
      return unsubscribe;
    }

    return () => {};
  }

  async initialize(user: User) {
    const userDocRef = userCollection().doc(user.id);
    await userDocRef.set({
      ryugou: user.ryugou,
      description: user.description,
      senryuCount: 0,
    });

    if (user.profileImageUrl) {
      const result = await this.uploadProfileImage(
        userDocRef.id,
        user.profileImageUrl
      );
      await userDocRef.update({
        profileImageUrl: result.profileImageUrl,
        storageUri: result.storageUri,
      });
    }
    return;
  }

  async updateProfile(user: User) {
    const userDocRef = userCollection().doc(user.id);
    await userDocRef.update({
      ryugou: user.ryugou,
      description: user.description,
    });

    if (user.profileImageUrl) {
      const result = await this.uploadProfileImage(
        userDocRef.id,
        user.profileImageUrl
      );
      await userDocRef.update({
        profileImageUrl: result.profileImageUrl,
        storageUri: result.storageUri,
      });
    }
    return;
  }

  async signOut() {
    return firebase.auth().signOut();
  }

  async delete() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      await currentUser.delete();
    }
    return;
  }

  private async uploadProfileImage(userId: UserId, profileImageUrl: string) {
    const response = await axios.get(profileImageUrl, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const storageRef = userStorageRef(`${userId}.jpg`);
    const fileSnapshot = await storageRef.put(blob);
    const imageUrl = await fileSnapshot.ref.getDownloadURL();
    return {
      profileImageUrl: imageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
    };
  }
}
