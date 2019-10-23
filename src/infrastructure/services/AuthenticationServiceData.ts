import firebase from 'firebase/app';
import axios from 'axios';
import { AuthenticationService } from '@src/domain/services';
import { User, UninitializedUser, UserId } from '@src/domain';
import { userCollection } from '../firestore';
import { userStorageRef } from '../storage';
import { AppError } from '@src/types';
import { reasonToAppError } from '../utils';

export class AuthenticationServiceData implements AuthenticationService {
  private errorCallback: ((error: AppError) => void) | null = null;

  onAuthStateChanged(
    callback: (user: User | UninitializedUser | null) => void
  ) {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      fbUser => {
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
      },
      reason => {
        if (this.errorCallback) {
          this.errorCallback(reasonToAppError(reason, 'ユーザー'));
        }
      }
    );

    return unsubscribe;
  }

  onProfileChanged(callback: (user: User) => void) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      try {
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
      } catch (reason) {
        if (this.errorCallback) {
          this.errorCallback(reasonToAppError(reason, 'ユーザー'));
        }
      }
    }

    return () => {};
  }

  onErrorOccurred(callback: (error: AppError) => void) {
    this.errorCallback = callback;
  }

  async initialize(user: User) {
    try {
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
    } catch (reason) {
      throw reasonToAppError(reason, 'ユーザー');
    }
  }

  async updateProfile(user: User) {
    try {
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
    } catch (reason) {
      throw reasonToAppError(reason, 'ユーザー');
    }
  }

  async signOut() {
    return firebase.auth().signOut();
  }

  async delete() {
    // @see https://firebase.google.com/docs/auth/web/manage-users?hl=ja#re-authenticate_a_user
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      try {
        await currentUser.delete();
      } catch (reason) {
        throw reasonToAppError(reason, 'ユーザー');
      }
    }
    return;
  }

  private async uploadProfileImage(userId: UserId, profileImageUrl: string) {
    const response = await axios.get(profileImageUrl, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const storageRef = userStorageRef(userId, `${userId}.jpg`);
    const fileSnapshot = await storageRef.put(blob);
    const imageUrl = await fileSnapshot.ref.getDownloadURL();
    return {
      profileImageUrl: imageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
    };
  }
}
