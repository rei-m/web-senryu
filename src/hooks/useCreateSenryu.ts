import { useCallback } from 'react';
import { SenryuDraft } from '@src/domain';
import { SenryuRepository } from '@src/domain/repositories';
import { AppError, ProcessingState } from '@src/types';
import { useAppError } from './useAppError';
import { useDiContainer } from './useDiContainer';
import { useProcessingState } from './useProcessingState';
import { useSafeResolve } from './useSafeResolve';

type Deps = {
  senryuRepository: SenryuRepository;
};

type Return = {
  processingState: ProcessingState;
  error: AppError | null;
  createSenryu: (senryu: SenryuDraft) => void;
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
  const { safeResolve } = useSafeResolve();

  const createSenryu = useCallback((senryu: SenryuDraft) => {
    startProcess();
    safeResolve(senryuRepository.add(senryu))(
      () => {
        cleanError();
        completeProcess();
      },
      reason => {
        setError(reason);
        waitProcess();
      }
    );
  }, []);

  return { processingState, error, createSenryu };
};
