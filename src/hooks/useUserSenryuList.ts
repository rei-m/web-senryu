import { useEffect, useState } from 'react';
import { Senryu, UserId } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';

type Deps = {
  senryuRepository: SenryuRepository;
};

type State = {
  currentPage: number;
  hasNextPage: boolean;
  senryuList?: Array<Senryu>;
  totalPages: number;
  totalCount: number;
  isMoreLoading: boolean;
  error?: Error;
};

export const useUserSenryuList = (
  userId: UserId,
  { senryuRepository }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({
    currentPage: 0,
    hasNextPage: false,
    totalPages: 0,
    totalCount: 0,
    isMoreLoading: false,
  });

  useEffect(() => {
    senryuRepository
      .findByUserPerPage(userId, 1)
      .then(page => {
        setState({
          currentPage: page.currentPage,
          hasNextPage: page.hasNextPage,
          totalPages: page.totalPages,
          totalCount: page.totalCount,
          senryuList: page.itemList,
          isMoreLoading: false,
        });
      })
      .catch(reason => {
        setState({ ...state, error: new Error(reason) });
      });
  }, []);

  const fetchNextPage = () => {
    if (!state.senryuList) {
      return;
    }
    setState({ ...state, isMoreLoading: true });

    senryuRepository
      .findByUserPerPage(
        userId,
        state.currentPage + 1,
        state.senryuList.slice(-1)[0]
      )
      .then(page => {
        setState({
          currentPage: page.currentPage,
          hasNextPage: page.hasNextPage,
          totalPages: page.totalPages,
          totalCount: page.totalCount,
          senryuList: [...state.senryuList, ...page.itemList],
          isMoreLoading: false,
        });
      })
      .catch(reason => {
        setState({ ...state, error: new Error(reason) });
      });
  };

  return { ...state, fetchNextPage };
};
