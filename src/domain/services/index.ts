import { User, UninitializedUser } from '..';
import { AppError } from '@src/types';

// これは中途半端なIFになってしまったのでよくない・・・
export interface AuthenticationService {
  onAuthStateChanged: (
    callback: (user: User | UninitializedUser | null) => void
  ) => () => void;
  onProfileChanged: (callback: (user: User) => void) => () => void;
  onErrorOccurred: (callback: (error: AppError) => void) => void;

  initialize: (user: User) => Promise<void>;
  updateProfile: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
  delete: () => Promise<void>;
}
