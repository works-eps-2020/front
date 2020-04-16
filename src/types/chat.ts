import { User } from './user';
import { Message } from './message';

export type Chat = {
  id: string;
  name: string;
  picture: string;
  users: User[];
  lastMessage: Message;
  message: Message[];
}