import { useEffect, useState } from 'react';
import { Senryu, SenryuId } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { AppError } from '@src/types';
import { useAppError } from './useAppError';
import { useBool } from './useBool';
import { useDiContainer } from './useDiContainer';
import { useSafeResolve } from './useSafeResolve';

type Deps = {
  senryuRepository: SenryuRepository;
};

type State = {
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
  fetchNextPage: () => void;
  deleteSenryu: (senryuId: SenryuId) => void;
} & State;

export const useSenryuList = (
  { senryuRepository }: Deps = useDiContainer()
): Return => {
  const { safeResolve } = useSafeResolve();
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
    safeResolve(senryuRepository.findAllPerPage(1))(
      page => {
        setState({
          currentPage: page.currentPage,
          hasNextPage: page.hasNextPage,
          totalPages: page.totalPages,
          totalCount: page.totalCount,
          senryuList: page.itemList,
        });
        finishLoad();
      },
      error => {
        setError(error);
        finishLoad();
      }
    );
  }, []);

  const fetchNextPage = () => {
    if (!state.senryuList) {
      return;
    }

    startMoreLoad();

    safeResolve(
      senryuRepository.findAllPerPage(
        state.currentPage + 1,
        state.senryuList.slice(-1)[0]
      )
    )(
      result => {
        setState({
          currentPage: result.currentPage,
          hasNextPage: result.hasNextPage,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          senryuList: [...state.senryuList, ...result.itemList],
        });
        clearError();
        finsihMoreLoad();
      },
      error => {
        setError(error);
        finsihMoreLoad();
      }
    );
  };

  const deleteSenryu = (senryuId: SenryuId) => {
    safeResolve(senryuRepository.delete(senryuId))(
      () => {
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
      },
      error => {
        setError(error);
      }
    );
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
