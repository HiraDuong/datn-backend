/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 02:38:53
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-15 02:08:22
 * @ Description:
 */

import { UserRole } from '../utils/constants.util';

export interface UserListDTO {
    id: number;
    username: string;
    email: string;
    role: UserRole;
}

export interface UserByIdDTO {
    id: number;
    username: string;
    email: string;
    role: UserRole;
}

export interface UserUpdatedDTO {
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    avatar?: string;
}
