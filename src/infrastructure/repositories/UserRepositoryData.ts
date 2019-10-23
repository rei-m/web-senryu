import { UserRepository } from '@src/domain/repositories';
import { UserId } from '@src/domain';
import { userCollection } from '../firestore';
import { reasonToAppError } from '../utils';

export class UserRepositoryData implements UserRepository {
  async findById(id: UserId) {
    const snap = await userCollection()
      .doc(id)
      .get();
    const data = snap.data();
    if (data !== undefined) {
      return {
        id,
        ryugou: data.ryugou,
        description: data.description,
        profileImageUrl: data.profileImageUrl,
      };
    } else {
      throw reasonToAppError({ code: 'not-found' }, 'ユーザー');
    }
  }
}
