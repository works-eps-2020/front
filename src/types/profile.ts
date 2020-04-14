import {Role} from './role';

export type Profile = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: Role[];
}