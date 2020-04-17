import { Level } from "./Level";
import { Profile } from "./profile";
import { Chat } from "./chat";
import { Organization } from "./organization";
import { Topic } from "./topic";

export type State = {
  profile?: Profile;
  token?: string;
  levels?: Level[];
  chats?: Chat[];
  organizations?: Organization[];
  currentOrganization?: Organization;
  showFormOrganization: boolean;
  topics?: Topic[];
};
