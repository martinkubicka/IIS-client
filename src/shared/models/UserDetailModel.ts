/**
 * @file UserDetailModel.ts
 * @author { Matěj Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of UserDetailModel interface
 */

export interface UserDetailModel {
    handle?: string,
    name?: string,
    icon?: string,
    role?: number,
    email?: string,
    password?: string
}
