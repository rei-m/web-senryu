import { SenryuDraft, SenryuId, Senryu, UserId, User } from '..';
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
  delete(senryuId: SenryuId): Promise<void>;
}

export interface UserRepository {
  findById(id: UserId): Promise<User>;
}
