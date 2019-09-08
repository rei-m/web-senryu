import { SenryuDraft, SenryuId, Senryu } from '..';
import { Page } from '@src/types';

export interface SenryuRepository {
  findById(id: SenryuId): Promise<Senryu>;
  findAllPerPage(pageNo: number, base?: Senryu): Promise<Page<Senryu>>;
  add(senryu: SenryuDraft): Promise<SenryuId>;
}
