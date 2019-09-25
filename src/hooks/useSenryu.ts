import { useEffect, useState } from 'react';
import { Senryu, SenryuId } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';

type Deps = {
  senryuRepository: SenryuRepository;
};

export const useSenryu = (
  senryuId: SenryuId,
  { senryuRepository }: Deps = useDiContainer()
) => {
  const [senryu, setSenryu] = useState<Senryu>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    senryuRepository
      .findById(senryuId)
      .then(result => {
        setSenryu(result);
      })
      .catch(reason => {
        setError(new Error(reason));
      });
  }, []);

  return { senryu, error };
};
