import firebase from 'firebase/app';
import axios from 'axios';
import { SenryuDraft, SenryuId, Senryu, UserId } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import {
  senryuCollection,
  aggregateCollection,
  aggregateCountUsersCollection,
  userCollection,
} from '../firestore';
import { senryuStorageRef } from '../storage';
import { reasonToAppError } from '../utils';

const dataToModel: (
  id: string,
  data: firebase.firestore.DocumentData
) => Senryu = (id, data) => {
  const createdAt = data.createdAt.toDate().getTime();
  return {
    id,
    jouku: data.jouku,
    chuuku: data.chuuku,
    geku: data.geku,
    comment: data.comment ? data.comment : null,
    userId: data.user.ref ? data.user.ref.id : null,
    ryugou: data.user.ryugou,
    imageUrl: data.imageUrl ? data.imageUrl : null,
    createdAt,
  };
};

const COUNT_MAX = 20;

// TODO: firebaseにからむところのテストは別途調べる（エミュレーター起動する？firebase自体DIする？）
export class SenryuRepositoryData implements SenryuRepository {
  async findById(id: SenryuId) {
    try {
      const snap = await senryuCollection()
        .doc(id)
        .get();
      const data = snap.data();
      if (data !== undefined) {
        return dataToModel(id, data);
      } else {
        throw reasonToAppError({ code: 'not-found' }, '川柳');
      }
    } catch (reason) {
      throw reasonToAppError(reason, '川柳');
    }
  }

  async findByUserPerPage(userId: UserId, pageNo: number, base?: Senryu) {
    try {
      const aggregateSnap = await aggregateCountUsersCollection()
        .doc(userId)
        .get();
      const aggregateData = aggregateSnap.data();
      const totalCount = aggregateData !== undefined ? aggregateData.senryu : 0;
      const totalPages = Math.ceil(totalCount / COUNT_MAX);
      const query =
        base === undefined
          ? senryuCollection()
              .where('user.ref', '==', userCollection().doc(userId))
              .orderBy('createdAt', 'desc')
              .limit(COUNT_MAX)
          : senryuCollection()
              .where('user.ref', '==', userCollection().doc(userId))
              .orderBy('createdAt', 'desc')
              .startAfter(new Date(base.createdAt))
              .limit(COUNT_MAX);
      const senryuSnap = await query.get();
      const senryuData = senryuSnap.docs.map(doc =>
        dataToModel(doc.id, doc.data())
      );
      const hasNextPage = COUNT_MAX * pageNo < totalCount;
      return {
        currentPage: pageNo,
        totalPages,
        itemList: senryuData,
        totalCount,
        listPerPage: COUNT_MAX,
        hasNextPage,
      };
    } catch (reason) {
      throw reasonToAppError(reason, '川柳');
    }
  }

  async findAllPerPage(pageNo: number, base?: Senryu) {
    try {
      const aggregateSnap = await aggregateCollection()
        .doc(`count`)
        .get();
      const aggregateData = aggregateSnap.data();
      const totalCount = aggregateData !== undefined ? aggregateData.senryu : 0;
      const totalPages = Math.ceil(totalCount / COUNT_MAX);
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
      const hasNextPage = COUNT_MAX * pageNo < totalCount;
      return {
        currentPage: pageNo,
        totalPages,
        itemList: senryuData,
        totalCount,
        listPerPage: COUNT_MAX,
        hasNextPage,
      };
    } catch (reason) {
      throw reasonToAppError(reason, '川柳');
    }
  }

  async add(senryu: SenryuDraft) {
    // Transactionでまとめようと思ったけどDocId自前で生成する必要がる + そこまで厳密に整合性求めなくてもいいとこ（と思うことにした）なのでそのまま
    const data = {
      jouku: senryu.jouku,
      chuuku: senryu.chuuku,
      geku: senryu.geku,
      comment: senryu.comment,
      user: {
        ref: senryu.userId ? userCollection().doc(senryu.userId) : null,
        ryugou: senryu.ryugou,
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      const senryuRef = await senryuCollection().add(data);

      await aggregateCollection()
        .doc('count')
        .update({
          senryu: firebase.firestore.FieldValue.increment(1),
        });

      if (senryu.userId) {
        await aggregateCountUsersCollection()
          .doc(senryu.userId)
          .update({
            senryu: firebase.firestore.FieldValue.increment(1),
          });
      }

      if (senryu.imageUrl && senryu.userId) {
        const response = await axios.get(senryu.imageUrl, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const storageRef = senryuStorageRef(
          senryu.userId,
          `${senryuRef.id}.jpg`
        );
        const fileSnapshot = await storageRef.put(blob);
        const imageUrl = await fileSnapshot.ref.getDownloadURL();

        await senryuRef.update({
          imageUrl,
          storageUri: fileSnapshot.metadata.fullPath,
        });
      }

      return senryuRef.id;
    } catch (reason) {
      throw reasonToAppError(reason, '川柳');
    }
  }

  async delete(senryuId: SenryuId) {
    try {
      const senryu = await senryuCollection()
        .doc(senryuId)
        .get();

      const senryuData = senryu.data();

      if (senryuData) {
        await aggregateCountUsersCollection()
          .doc(senryuData.user.ref.id)
          .update({
            senryu: firebase.firestore.FieldValue.increment(-1),
          });
      }

      await aggregateCollection()
        .doc('count')
        .update({
          senryu: firebase.firestore.FieldValue.increment(-1),
        });

      await senryu.ref.delete();
    } catch (reason) {
      throw reasonToAppError(reason, '川柳');
    }
  }
}
