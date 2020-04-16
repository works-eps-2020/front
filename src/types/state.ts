import { Level } from "./Level";
import { Profile } from './profile';
import { Chat } from './chat';
import { Organization } from './organization'

export type State = {
  profile?: Profile;
  token?: string;
  levels?: Level[];
  chats?: Chat[];
  organizations?: Organization[];
  currentOrganization?: Organization;
  showFormOrganization: boolean;
};
