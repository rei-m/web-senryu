import React from 'react';
import { AuthenticationService } from '@src/domain/services';
import { SenryuRepository } from '@src/domain/repositories';
import { AuthenticationServiceData } from '@src/infrastructure/services/AuthenticationServiceData';
import { SenryuRepositoryData } from '@src/infrastructure/repositories/SenryuRepositoryData';

export const defalutValue = {
  authenticationService: new AuthenticationServiceData(),
  senryuRepository: new SenryuRepositoryData(),
};

export const DiContainerContext = React.createContext<{
  authenticationService: AuthenticationService;
  senryuRepository: SenryuRepository;
}>(defalutValue);

const DiContainerContextProvider: React.FC<{}> = ({ children }) => (
  <DiContainerContext.Provider value={defalutValue}>
    {children}
  </DiContainerContext.Provider>
);

export default DiContainerContextProvider;
