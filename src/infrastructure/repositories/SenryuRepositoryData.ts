import firebase from 'firebase/app';
import axios from 'axios';
import { SenryuDraft, SenryuId, Senryu, UserId } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import {
  senryuCollection,
  aggregateCollection,
  userCollection,
} from '../firestore';
import { senryuStorageRef } from '../storage';

const dataToModel: (
  id: string,
  data: firebase.firestore.DocumentData
) => Senryu = (id, data) => {
  const createdAt = data.createdAt.toDate().getTime();
  return {
    ...data,
    comment: data.comment ? data.comment : null,
    id,
    createdAt,
  } as Senryu;
};

const COUNT_MAX = 20;

const POST_KEY_LIST: Array<keyof Senryu> = [
  'jouku',
  'chuuku',
  'geku',
  'comment',
  'ryugou',
  'userId',
];

export class SenryuRepositoryData implements SenryuRepository {
  async findById(id: SenryuId) {
    const snap = await senryuCollection()
      .doc(id)
      .get();
    const data = snap.data();
    if (data !== undefined) {
      return Promise.resolve(dataToModel(id, data));
    } else {
      return Promise.reject('Not Found');
    }
  }

  async findByUserPerPage(userId: UserId, pageNo: number, base?: Senryu) {
    const userSnap = await userCollection()
      .doc(userId)
      .get();
    const userData = userSnap.data();
    const count = userData !== undefined ? userData.senryuCount : 0;
    const totalPages = Math.ceil(count / COUNT_MAX);
    const query =
      base === undefined
        ? senryuCollection()
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .limit(COUNT_MAX)
        : senryuCollection()
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .startAfter(new Date(base.createdAt))
            .limit(COUNT_MAX);
    const senryuSnap = await query.get();
    const senryuData = senryuSnap.docs.map(doc =>
      dataToModel(doc.id, doc.data())
    );
    const hasNextPage = COUNT_MAX * pageNo < count;
    return {
      currentPage: pageNo,
      totalPages,
      itemList: senryuData,
      totalCount: count,
      listPerPage: COUNT_MAX,
      hasNextPage,
    };
  }

  async findAllPerPage(pageNo: number, base?: Senryu) {
    const countSnap = await aggregateCollection()
      .doc(`count`)
      .get();
    const countData = countSnap.data();
    const count = countData !== undefined ? countData.senryu : 0;
    const totalPages = Math.ceil(count / COUNT_MAX);
    const query =
      base === undefined
        ? senryuCollection()
            .orderBy('createdAt', 'desc')
            .limit(COUNT_MAX)
        : senryuCollection()
            .orderBy('createdAt', 'desc')
            .startAfter(new Date(base.createdAt))
            .limit(COUNT_MAX);
    const senryuSnap = await query.get();
    const senryuData = senryuSnap.docs.map(doc =>
      dataToModel(doc.id, doc.data())
    );
    const hasNextPage = COUNT_MAX * pageNo < count;
    return {
      currentPage: pageNo,
      totalPages,
      itemList: senryuData,
      totalCount: count,
      listPerPage: COUNT_MAX,
      hasNextPage,
    };
  }

  async add(senryu: SenryuDraft) {
    try {
      const data = Object.entries(senryu).reduce(
        (prev, current) => {
          const [key, value] = current;
          if (POST_KEY_LIST.includes(key as keyof Senryu)) {
            prev[key] = value;
          }
          return prev;
        },
        {} as { [key: string]: unknown }
      );
      const docRef = await senryuCollection().add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      if (senryu.imageUrl) {
        const response = await axios.get(senryu.imageUrl, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const storageRef = senryuStorageRef(`${docRef.id}.jpg`);
        const fileSnapshot = await storageRef.put(blob);
        const imageUrl = await fileSnapshot.ref.getDownloadURL();

        await docRef.update({
          imageUrl,
          storageUri: fileSnapshot.metadata.fullPath,
        });
      }

      return docRef.id;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
