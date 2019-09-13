import { SenryuDraft, SenryuId, Senryu, UserId } from '..';
import { Page } from '@src/types';

export interface SenryuRepository {
  findById(id: SenryuId): Promise<Senryu>;
  findByUserPerPage(
    userId: UserId,
    pageNo: number,
    base?: Senryu
  ): Promise<Page<Senryu>>;
  findAllPerPage(pageNo: number, base?: Senryu): Promise<Page<Senryu>>;
  add(senryu: SenryuDraft): Promise<SenryuId>;
}
