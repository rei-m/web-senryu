import React from 'react';
import { AuthenticationService } from '@src/domain/services';
import { SenryuRepository, UserRepository } from '@src/domain/repositories';
import { AuthenticationServiceData } from '@src/infrastructure/services/AuthenticationServiceData';
import { SenryuRepositoryData } from '@src/infrastructure/repositories/SenryuRepositoryData';
import { UserRepositoryData } from '@src/infrastructure/repositories/UserRepositoryData';

export const defalutValue = {
  authenticationService: new AuthenticationServiceData(),
  senryuRepository: new SenryuRepositoryData(),
  userRepository: new UserRepositoryData(),
};

export const DiContainerContext = React.createContext<{
  authenticationService: AuthenticationService;
  senryuRepository: SenryuRepository;
  userRepository: UserRepository;
}>(defalutValue);

const DiContainerContextProvider: React.FC<{}> = ({ children }) => (
  <DiContainerContext.Provider value={defalutValue}>
    {children}
  </DiContainerContext.Provider>
);

export default DiContainerContextProvider;
