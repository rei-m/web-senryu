import { useCallback } from 'react';
import { SenryuDraft } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { AppError, ProcessingState } from '@src/types';
import { useAppError } from './useAppError';
import { useDiContainer } from './useDiContainer';
import { useProcessingState } from './useProcessingState';

type Deps = {
  senryuRepository: SenryuRepository;
};

type Return = {
  processingState: ProcessingState;
  error: AppError | null;
  createSenryu: (senryu: SenryuDraft) => Promise<void>;
};

export const useCreateSenryu = (
  { senryuRepository }: Deps = useDiContainer()
): Return => {
  const [
    processingState,
    waitProcess,
    startProcess,
    completeProcess,
  ] = useProcessingState();
  const [error, setError, cleanError] = useAppError();

  const createSenryu = useCallback(async (senryu: SenryuDraft) => {
    startProcess();
    try {
      await senryuRepository.add(senryu);
      cleanError();
      completeProcess();
    } catch (error) {
      setError(error);
      waitProcess();
    }
  }, []);

  return { processingState, error, createSenryu };
};
