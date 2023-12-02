/**
 * @file GroupModel.ts
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of GroupModel interface
 */

export interface GroupModel {
  handle: string;
  name?: string;
  description?: string;
  icon?: string;
  visibilityMember?: boolean;
  visibilityGuest?: boolean;
  email?: string;
}
