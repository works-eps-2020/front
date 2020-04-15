import { User } from './user';

export type Message = {
  id: string;
  content: string;
  user: User;
  created_at: Date;
  status: string;
}