import { useEffect, useState } from 'react';
import { Senryu, SenryuId } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';

type Deps = {
  senryuRepository: SenryuRepository;
};

type State = {
  senryu?: Senryu;
  error?: Error;
};

export const useSenryu = (
  senryuId: SenryuId,
  { senryuRepository }: Deps = useDiContainer()
) => {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    senryuRepository
      .findById(senryuId)
      .then(senryu => {
        setState({ senryu });
      })
      .catch(reason => {
        setState({ error: new Error(reason) });
      });
  }, []);

  return { ...state };
};
