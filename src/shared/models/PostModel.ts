/**
 * @file PostModel.ts
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of PostModel interface
 */

import { Dictionary } from "./../types";
export interface PostModel extends Dictionary<any> {
  id?: string;
  text?: string;
  threadId?: string;
  handle?: string;
  date?: Date;
}
