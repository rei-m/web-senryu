import { useContext } from 'react';
import { DiContainerContext } from '@src/contexts/DiContainerContextProvider';

export const useDiContainer = () => useContext(DiContainerContext);
