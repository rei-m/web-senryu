import { useEffect, useState } from 'react';
import { Senryu, SenryuId, User, UserId } from '@src/domain';
import { SenryuRepository, UserRepository } from '@src/domain/repositories';
import { AppError } from '@src/types';
import { useAppError } from './useAppError';
import { useBool } from './useBool';
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
};

type Return = {
  isLoading: boolean;
  isMoreLoading: boolean;
  error: AppError | null;
  fetchNextPage: () => Promise<void>;
  deleteSenryu: (senryuId: SenryuId) => Promise<void>;
} & State;

export const useUserSenryuList = (
  userId: UserId,
  { userRepository, senryuRepository }: Deps = useDiContainer()
): Return => {
  const [state, setState] = useState<State>({
    currentPage: 0,
    hasNextPage: false,
    totalPages: 0,
    totalCount: 0,
  });
  const [isLoading, startLoad, finishLoad] = useBool(true);
  const [isMoreLoading, startMoreLoad, finsihMoreLoad] = useBool(false);
  const [error, setError, clearError] = useAppError();

  useEffect(() => {
    startLoad();
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
        });
        finishLoad();
      })
      .catch(error => {
        setError(error);
        finishLoad();
      });
  }, []);

  const fetchNextPage = async () => {
    if (!state.senryuList) {
      return;
    }

    startMoreLoad();

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
      });
      clearError();
      finsihMoreLoad();
    } catch (error) {
      setError(error);
      finsihMoreLoad();
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
      clearError();
    } catch (error) {
      setError(error);
    }
  };

  return {
    ...state,
    isLoading,
    isMoreLoading,
    error,
    fetchNextPage,
    deleteSenryu,
  };
};
