import { useEffect, useState } from 'react';
import { Senryu, UserId, User } from '@src/domain';
import { SenryuRepository, UserRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';

type Deps = {
  userRepository: UserRepository;
  senryuRepository: SenryuRepository;
};

type State = {
  user?: User;
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
  { userRepository, senryuRepository }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({
    currentPage: 0,
    hasNextPage: false,
    totalPages: 0,
    totalCount: 0,
    isMoreLoading: false,
  });

  useEffect(() => {
    Promise.all([
      userRepository.findById(userId),
      senryuRepository.findByUserPerPage(userId, 1),
    ])
      .then(([user, page]) => {
        setState({
          user,
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
          user: state.user,
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
