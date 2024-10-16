/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 01:49:20
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-15 01:36:15
 * @ Description:
 */

import { UserRole } from '../utils/constants.util';

export interface UserModel {
    id: number;
    username: string;
    email: string;
    password: string;
    salt: string;
    role: UserRole;
    avatar: string;
}
export interface UserSearchTerm {
    username: string | null;
    email: string | null;
}
