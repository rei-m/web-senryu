import { useEffect, useState } from 'react';
import { Senryu, SenryuId } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';
import { useBool } from './useBool';

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

export const useSenryuList = (
  { senryuRepository }: Deps = useDiContainer()
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
    senryuRepository
      .findAllPerPage(1)
      .then(page => {
        setState({
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
      const result = await senryuRepository.findAllPerPage(
        state.currentPage + 1,
        state.senryuList.slice(-1)[0]
      );

      setState({
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
        });
      }
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  return { ...state, isMoreLoading, error, fetchNextPage, deleteSenryu };
};
