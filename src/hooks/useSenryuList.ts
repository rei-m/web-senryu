import { useEffect, useState } from 'react';
import { Senryu, SenryuId } from '@src/domain';
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

export const useSenryuList = (
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
      .findAllPerPage(1)
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

  const fetchNextPage = async () => {
    if (!state.senryuList) {
      return;
    }
    setState({ ...state, isMoreLoading: true });

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
        });
      }
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  return { ...state, fetchNextPage, deleteSenryu };
};
