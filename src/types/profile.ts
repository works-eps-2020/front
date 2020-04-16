import { Role } from './role';
import { User } from './user';

export type Profile = {
  user: User;
  roles: Role[];
}
