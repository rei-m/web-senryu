import { renderHook, act } from '@testing-library/react-hooks';
import { Senryu } from '@src/domain';
import { AppError } from '@src/types';
import { useUserSenryuList } from './useUserSenryuList';
import {
  USER_1,
  SENRYU_1,
  genMockSenryuRepository,
  genMockUserRepository,
} from '@test/mock';
import { SenryuRepository, UserRepository } from '@src/domain/repositories';

describe('hooks', () => {
  describe('useUserSenryuList', () => {
    let senryuRepository: SenryuRepository;
    let userRepository: UserRepository;

    const firstList = Array.from<Senryu>({ length: 20 })
      .fill(SENRYU_1)
      .map((s, i) => ({ ...s, id: `${s.id}${i}` }));

    const secondList = Array.from<Senryu>({ length: 10 })
      .fill(SENRYU_1)
      .map((s, i) => ({ ...s, id: `${s.id}${20 + i}` }));

    beforeEach(() => {
      senryuRepository = genMockSenryuRepository();
      userRepository = genMockUserRepository();

      senryuRepository.findByUserPerPage = jest.fn((_userId, pageNo) => {
        if (pageNo === 1) {
          return Promise.resolve({
            currentPage: 1,
            totalPages: 2,
            totalCount: 30,
            hasNextPage: true,
            listPerPage: 20,
            itemList: firstList,
          });
        } else {
          return Promise.resolve({
            currentPage: 2,
            totalPages: 2,
            totalCount: 30,
            hasNextPage: false,
            listPerPage: 20,
            itemList: secondList,
          });
        }
      });
      senryuRepository.delete = jest.fn(_senryuId => Promise.resolve());

      userRepository.findById = jest.fn(_userId => Promise.resolve(USER_1));
    });

    it('should return senryu list', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useUserSenryuList(USER_1.id, { senryuRepository, userRepository })
      );

      await waitForNextUpdate();

      const {
        currentPage,
        hasNextPage,
        senryuList,
        totalPages,
        totalCount,
        isLoading,
        isMoreLoading,
        error,
      } = result.current;
      expect(currentPage).toEqual(1);
      expect(hasNextPage).toEqual(true);
      expect(senryuList).toEqual(firstList);
      expect(totalPages).toEqual(2);
      expect(totalCount).toEqual(30);
      expect(isLoading).toEqual(false);
      expect(isMoreLoading).toEqual(false);
      expect(error).toBeNull();
      expect(senryuRepository.findByUserPerPage).toHaveBeenCalledWith(
        USER_1.id,
        1
      );
      expect(userRepository.findById).toHaveBeenCalledWith(USER_1.id);
    });

    it('can catch error when fetch failed', async () => {
      const fetchError: AppError = { code: 'unhandled', message: 'error' };
      senryuRepository.findByUserPerPage = jest.fn((_userId, _pageNo) =>
        Promise.reject(fetchError)
      );

      const { result, waitForNextUpdate } = renderHook(() =>
        useUserSenryuList(USER_1.id, { senryuRepository, userRepository })
      );

      await waitForNextUpdate();

      const { isLoading, error } = result.current;
      expect(isLoading).toEqual(false);
      expect(error).toEqual(fetchError);
      expect(senryuRepository.findByUserPerPage).toHaveBeenCalledWith(
        USER_1.id,
        1
      );
      expect(userRepository.findById).toHaveBeenCalledWith(USER_1.id);
    });

    it('should return next page ', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useUserSenryuList(USER_1.id, { senryuRepository, userRepository })
      );

      await waitForNextUpdate();

      act(() => {
        result.current.fetchNextPage();
      });

      expect(result.current.isMoreLoading).toEqual(true);

      await waitForNextUpdate();

      expect(result.current.currentPage).toEqual(2);
      expect(result.current.hasNextPage).toEqual(false);
      expect(result.current.senryuList).toEqual([...firstList, ...secondList]);
      expect(result.current.totalPages).toEqual(2);
      expect(result.current.totalCount).toEqual(30);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.isMoreLoading).toEqual(false);
      expect(senryuRepository.findByUserPerPage).toHaveBeenCalledWith(
        USER_1.id,
        2,
        firstList.slice(-1)[0]
      );
    });

    it('can catch error when fetch next page failed', async () => {
      const fetchError: AppError = { code: 'unhandled', message: 'error' };

      senryuRepository.findByUserPerPage = jest.fn((_userId, pageNo) => {
        if (pageNo === 1) {
          return Promise.resolve({
            currentPage: 1,
            totalPages: 2,
            totalCount: 30,
            hasNextPage: true,
            listPerPage: 20,
            itemList: firstList,
          });
        } else {
          return Promise.reject(fetchError);
        }
      });

      const { result, waitForNextUpdate } = renderHook(() =>
        useUserSenryuList(USER_1.id, { senryuRepository, userRepository })
      );

      await waitForNextUpdate();

      act(() => {
        result.current.fetchNextPage();
      });

      expect(result.current.isMoreLoading).toEqual(true);

      await waitForNextUpdate();

      expect(result.current.currentPage).toEqual(1);
      expect(result.current.hasNextPage).toEqual(true);
      expect(result.current.senryuList).toEqual(firstList);
      expect(result.current.totalPages).toEqual(2);
      expect(result.current.totalCount).toEqual(30);
      expect(result.current.isMoreLoading).toEqual(false);
      expect(result.current.error).toEqual(fetchError);
      expect(senryuRepository.findByUserPerPage).toHaveBeenCalledWith(
        USER_1.id,
        2,
        firstList.slice(-1)[0]
      );
    });

    it('can delete senryu', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useUserSenryuList(USER_1.id, { senryuRepository, userRepository })
      );

      await waitForNextUpdate();

      act(() => {
        result.current.deleteSenryu(firstList[1].id);
      });

      await waitForNextUpdate();

      const { senryuList, totalCount } = result.current;
      expect(senryuList).toEqual([firstList[0], ...firstList.slice(2)]);
      expect(totalCount).toEqual(29);
      expect(senryuRepository.delete).toHaveBeenCalledWith(firstList[1].id);
    });

    it('can catch error when delete senryu failed', async () => {
      const deleteError: AppError = { code: 'unhandled', message: 'error' };

      senryuRepository.delete = jest.fn(_senryuId =>
        Promise.reject(deleteError)
      );

      const { result, waitForNextUpdate } = renderHook(() =>
        useUserSenryuList(USER_1.id, { senryuRepository, userRepository })
      );

      await waitForNextUpdate();

      act(() => {
        result.current.deleteSenryu(firstList[1].id);
      });

      await waitForNextUpdate();

      const { senryuList, totalCount, error } = result.current;
      expect(senryuList).toEqual(firstList);
      expect(totalCount).toEqual(30);
      expect(error).toEqual(deleteError);
      expect(senryuRepository.delete).toHaveBeenCalledWith(firstList[1].id);
    });
  });
});
