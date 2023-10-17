import { Dictionary } from "./../types";
export interface PostModel extends Dictionary<any> {
  id?: string;
  text?: string;
  threadId?: string;
  handle?: string;
  date?: Date;
}
