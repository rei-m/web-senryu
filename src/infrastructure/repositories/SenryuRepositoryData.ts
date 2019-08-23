import { SenryuDraft, SenryuId, Senryu } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { senryuCollection, aggregateCollection } from '../firestore';

export class SenryuRepositoryData implements SenryuRepository {
  async findById(id: SenryuId) {
    const snap = await senryuCollection()
      .doc(id)
      .get();
    const data = snap.data();
    if (data !== undefined) {
      return Promise.resolve({ ...data, id } as Senryu);
    } else {
      return Promise.reject('Not Found');
    }
  }

  async findAllPerPage(pageNo: number, base?: Senryu) {
    const countSnap = await aggregateCollection()
      .doc(`count`)
      .get();
    const countData = countSnap.data();
    const count = countData !== undefined ? countData.senryu : 0;
    const totalPages = Math.ceil(count / 25);
    if (base === undefined) {
      const senryuSnap = await senryuCollection()
        .limit(26)
        .get();
      const senryuData = senryuSnap.docs.map(
        doc => ({ ...doc.data(), id: doc.id } as Senryu)
      );
      const hasNextPage = senryuData.length === 26;
      return {
        currentPage: 1,
        totalPages,
        itemList: senryuData,
        totalCount: count,
        listPerPage: 25,
        hasNextPage,
      };
    }

    const senryuSnap = await senryuCollection()
      .startAfter(base)
      .limit(26)
      .get();

    const senryuData = senryuSnap.docs.map(doc => doc.data() as Senryu);

    const hasNextPage = senryuData.length === 26;

    return {
      currentPage: pageNo,
      totalPages,
      itemList: senryuData,
      totalCount: count,
      listPerPage: 25,
      hasNextPage,
    };
  }

  async add(senryu: SenryuDraft) {
    try {
      const data = Object.entries(senryu).reduce(
        (prev, current) => {
          const [key, value] = current;
          if (key !== 'id') {
            prev[key] = value;
          }
          return prev;
        },
        {} as { [key: string]: any }
      );
      const docRef = await senryuCollection().add(data);
      return docRef.id;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
