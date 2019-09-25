import { useEffect, useState } from 'react';
import { Senryu, UserId, User, SenryuId } from '@src/domain';
import { SenryuRepository, UserRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';
import { useBool } from './useBool';

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

export const useUserSenryuList = (
  userId: UserId,
  { userRepository, senryuRepository }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({
    currentPage: 0,
    hasNextPage: false,
    totalPages: 0,
    totalCount: 0,
  });
  const [isMoreLoading, startMoreLoad, finsihMoreLoad] = useBool(false);
  const [error, setError] = useState<Error | null>(null);

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
        });
      })
      .catch(reason => {
        setError(new Error(reason));
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

      finsihMoreLoad();
    } catch (error) {
      setError(new Error(error));
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
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  return { ...state, isMoreLoading, error, fetchNextPage, deleteSenryu };
};
