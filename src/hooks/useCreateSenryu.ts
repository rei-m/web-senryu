import { useState } from 'react';
import { SenryuRepository } from '@src/domain/repositories';
import { useDiContainer } from './useDiContainer';
import { SenryuDraft } from '@src/domain';

type Deps = {
  senryuRepository: SenryuRepository;
};

export const useCreateSenryu = (
  { senryuRepository }: Deps = useDiContainer()
) => {
  const [isCreating, setState] = useState(false);

  const createSenryu = async (senryu: SenryuDraft) => {
    setState(true);
    const id = await senryuRepository.add(senryu);
    setState(false);
    return id;
  };

  return { isCreating, createSenryu };
};
