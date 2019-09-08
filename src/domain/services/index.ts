import { User, UninitializedUser } from '..';

export interface AuthenticationService {
  onAuthStateChanged: (
    callback: (user: User | UninitializedUser | null) => void
  ) => () => void;
  initialize: (user: User) => Promise<void>;
}
