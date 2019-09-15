import { UserRepository } from '@src/domain/repositories';
import { UserId } from '@src/domain';
import { userCollection } from '../firestore';

export class UserRepositoryData implements UserRepository {
  async findById(id: UserId) {
    const snap = await userCollection()
      .doc(id)
      .get();
    const data = snap.data();
    if (data !== undefined) {
      return Promise.resolve({
        id,
        ryugou: data.ryugou,
        description: data.description,
        profileImageUrl: data.profileImageUrl,
      });
    } else {
      return Promise.reject('Not Found');
    }
  }
}
