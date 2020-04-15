import { Profile } from './profile';
import { Chat } from './chat';

export type State = {
  profile?: Profile;
  token?: string;
  chats?: Chat[];
};
