import { Profile } from "./profile";
import { Level } from "./Level";

export type State = {
  profile?: Profile;
  token?: string;
  levels?: Level[];
};
