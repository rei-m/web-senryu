import { useEffect, useState } from 'react';
import { Senryu, SenryuId } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { AppError } from '@src/types';
import { useAppError } from './useAppError';
import { useBool } from './useBool';
import { useDiContainer } from './useDiContainer';

type Deps = {
  senryuRepository: SenryuRepository;
};

type Return = {
  isLoading: boolean;
  error: AppError | null;
  senryu?: Senryu;
};

export const useSenryu = (
  senryuId: SenryuId,
  { senryuRepository }: Deps = useDiContainer()
): Return => {
  const [senryu, setSenryu] = useState<Senryu>();
  const [isLoading, startLoading, finishLoading] = useBool(true);
  const [error, setError] = useAppError();

  useEffect(() => {
    startLoading();
    senryuRepository
      .findById(senryuId)
      .then(result => {
        setSenryu(result);
        finishLoading();
      })
      .catch(error => {
        setError(error);
        finishLoading();
      });
  }, []);

  return { senryu, isLoading, error };
};
