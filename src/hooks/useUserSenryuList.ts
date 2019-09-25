import { useEffect, useState } from 'react';
import { Senryu, UserId, User, SenryuId } from '@src/domain';
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

  const fetchNextPage = async () => {
    if (!state.senryuList) {
      return;
    }
    setState({ ...state, isMoreLoading: true });

    try {
      const result = await senryuRepository.findByUserPerPage(
        userId,
        state.currentPage + 1,
        state.senryuList.slice(-1)[0]
      );

      setState({
        user: state.user,
        currentPage: result.currentPage,
        hasNextPage: result.hasNextPage,
        totalPages: result.totalPages,
        totalCount: result.totalCount,
        senryuList: [...state.senryuList, ...result.itemList],
        isMoreLoading: false,
      });
    } catch (error) {
      setState({ ...state, error: new Error(error) });
    }
  };

  const deleteSenryu = async (senryuId: SenryuId) => {
    try {
      await senryuRepository.delete(senryuId);
      if (state.senryuList) {
        const updated = state.senryuList.filter(
          senryu => senryu.id !== senryuId
        );
        setState({
          ...state,
          senryuList: updated,
          totalCount: state.totalCount - 1,
        });
      }
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  return { ...state, fetchNextPage, deleteSenryu };
};
