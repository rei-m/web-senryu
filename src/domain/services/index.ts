import { User, UninitializedUser } from '..';

export interface AuthenticationService {
  onAuthStateChanged: (
    callback: (user: User | UninitializedUser | null) => void
  ) => () => void;
  onProfileChanged: (callback: (user: User) => void) => () => void;

  initialize: (user: User) => Promise<void>;
  updateProfile: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
  delete: () => Promise<void>;
}
