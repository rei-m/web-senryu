import { useCallback } from 'react';
import { SenryuDraft } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';
import { useBool } from './useBool';

type Deps = {
  senryuRepository: SenryuRepository;
};

export const useCreateSenryu = (
  { senryuRepository }: Deps = useDiContainer()
) => {
  const [isProcessing, startProcess, finsihProcess] = useBool(false);

  const createSenryu = useCallback(async (senryu: SenryuDraft) => {
    startProcess();
    try {
      const id = await senryuRepository.add(senryu);
      finsihProcess();
      return id;
    } catch (error) {
      // TODO
      finsihProcess();
      throw error;
    }
  }, []);

  return { isProcessing, createSenryu };
};
