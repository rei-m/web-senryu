import { Senryu, User } from '@src/domain';
import { SenryuRepository, UserRepository } from '@src/domain/repositories';
import { AuthenticationService } from '@src/domain/services';

export const SENRYU_1: Senryu = {
  id: 'abcdefg',
  jouku: '本降りに',
  chuuku: 'なって出ていく',
  geku: '雨宿り',
  ryugou: '柄井川柳',
  imageUrl: null,
  comment: null,
  userId: 'mRE11qpK9KVCoNdxOj4JNZrPyvd2',
  createdAt: 1568818696489,
};

export const USER_1: User = {
  id: 'mRE11qpK9KVCoNdxOj4JNZrPyvd2',
  ryugou: '柄井川柳',
  description: '川柳を始めた人',
  profileImageUrl: null,
};

export const genMockSenryuRepository = () =>
  jest.genMockFromModule<SenryuRepository>('@src/domain/repositories');

export const genMockAuthenticationService = () =>
  jest.genMockFromModule<AuthenticationService>('@src/domain/services');

export const genMockUserRepository = () =>
  jest.genMockFromModule<UserRepository>('@src/domain/repositories');
