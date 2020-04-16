import { Profile } from "./profile";
import { Chat } from "./chat";
import { Level } from "./Level";

export type State = {
  profile?: Profile;
  token?: string;
  levels?: Level[];
  chats?: Chat[];
};
