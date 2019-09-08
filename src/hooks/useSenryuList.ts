import { useEffect, useState } from 'react';
import { Senryu } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';

type Deps = {
  senryuRepository: SenryuRepository;
};

type State = {
  currentPage: number;
  hasNextPage: boolean;
  senryuList: Array<Senryu>;
  totalPages: number;
  totalCount: number;
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
    senryuList: [],
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
        });
      })
      .catch(reason => {
        setState({ ...state, error: new Error(reason) });
      });
  }, []);

  return { ...state };
};
