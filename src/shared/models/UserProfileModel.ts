/**
 * @file UserProfileModel.ts
 * @author { Matěj Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of UserProfileModel interface
 */
export interface UserProfileModel {
  handle: string;
  name: string;
  icon?: string;
  role?: number;
}
